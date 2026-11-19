import * as THREE from "three";
import { fragmentShader, vertexShader } from "./shaders";
import { getShapeBuffer, type ShapeBuffer, type ShapeName } from "./shapes";

type Options = {
  canvas: HTMLCanvasElement;
  /** Called once the first frame is on screen. */
  onReady?: () => void;
};

/**
 * One fixed full-screen particle cloud that follows the page:
 * every `[data-particle-slot]` element is a stop, and as you scroll the cloud
 * travels between stops, morphing from one Figma shape into the next.
 * Returns a cleanup function.
 */
export async function createParticleScene({ canvas, onReady }: Options): Promise<() => void> {
  const slots = Array.from(document.querySelectorAll<HTMLElement>("[data-particle-slot]"));
  if (!slots.length) return () => {};

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // About as many dots as the Figma particle artwork (~5k per shape), so each reads as its own dot.
  const N = window.innerWidth < 820 ? 5000 : 7000;
  const R = Math.random;

  const buffers: ShapeBuffer[] = await Promise.all(
    slots.map((s) => getShapeBuffer(s.dataset.shape as ShapeName, N)),
  );
  const last = slots.length - 1;

  /* ---------- renderer ---------- */
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
  } catch {
    return () => {}; // No WebGL: the static Figma images in each slot stay visible.
  }
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 8;
  const VIS_H = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));

  /* ---------- morphing particles ---------- */
  const geo = new THREE.BufferGeometry();
  const aFrom = new THREE.BufferAttribute(new Float32Array(N * 3), 3);
  const aTo = new THREE.BufferAttribute(new Float32Array(N * 3), 3);
  const cFrom = new THREE.BufferAttribute(new Float32Array(N * 3), 3);
  const cTo = new THREE.BufferAttribute(new Float32Array(N * 3), 3);
  geo.setAttribute("position", aFrom);
  geo.setAttribute("aTo", aTo);
  geo.setAttribute("cFrom", cFrom);
  geo.setAttribute("cTo", cTo);

  const rnd = new Float32Array(N * 3);
  const seed = new Float32Array(N);
  const size = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    let x = 0, y = 0, z = 0, l = 0;
    while (l < 1e-6) {
      x = R() * 2 - 1; y = R() * 2 - 1; z = R() * 2 - 1; l = Math.hypot(x, y, z);
    }
    const m = (0.8 + R() * 1.8) / l;
    rnd.set([x * m, y * m, z * m], i * 3);
    seed[i] = R();
    // Dot diameter ≈ 2.5 × aSize CSS px at the shape's depth: mostly 2.4–4px, a few up to ~5.5px.
    size[i] = R() < 0.92 ? 0.96 + R() * 0.64 : 1.6 + R() * 0.6;
  }
  geo.setAttribute("aRand", new THREE.BufferAttribute(rnd, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
  geo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));

  const uniforms = {
    uT: { value: 0 },
    uPR: { value: pixelRatio },
    uScatter: { value: reduceMotion ? 0 : 0.9 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uHover: { value: 0 },
    uRadius: { value: 1 },
    uPush: { value: 0 },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    // Normal (not additive) blending: overlapping dots stay distinct dots instead of
    // summing into a glowing blur.
    blending: THREE.NormalBlending,
  });

  const group = new THREE.Group();
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  group.add(points);
  scene.add(group);

  /* ---------- soft halos behind each shape (Figma: gold top-left, blue bottom-right) ---------- */
  const glowTexture = (() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d")!;
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(255,255,255,0.35)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  })();
  const makeGlow = (color: number, x: number, y: number) => {
    const material = new THREE.SpriteMaterial({
      map: glowTexture,
      color,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const sprite = new THREE.Sprite(material);
    sprite.position.set(x, y, -1);
    sprite.scale.set(3.6, 3.6, 1);
    group.add(sprite);
    return sprite;
  };
  const goldGlow = makeGlow(0xffa31a, -0.7, 0.6);
  const blueGlow = makeGlow(0x1f5fff, 0.8, -0.7);

  /* ---------- starfield (Figma "Starfield tile") ---------- */
  const SN = 1800;
  const sp = new Float32Array(SN * 3);
  const sc = new Float32Array(SN * 3);
  const tints: [number, number, number][] = [[1, 1, 1], [1, 1, 1], [0.7, 0.8, 1], [1, 0.75, 0.85], [1, 0.9, 0.6]];
  for (let i = 0; i < SN; i++) {
    sp.set([(R() - 0.5) * 40, (R() - 0.5) * 60, -3 - R() * 12], i * 3);
    const t = tints[(R() * tints.length) | 0];
    const b = 0.5 + R() * 0.5;
    sc.set([t[0] * b, t[1] * b, t[2] * b], i * 3);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(sp, 3));
  starGeo.setAttribute("color", new THREE.BufferAttribute(sc, 3));
  // Round star dots (plain points render as squares).
  const dotTexture = (() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();
    return new THREE.CanvasTexture(c);
  })();
  const starMat = new THREE.PointsMaterial({
    size: 0.03,
    map: dotTexture,
    alphaTest: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
  });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  /* ---------- sizing ---------- */
  // Measure the canvas, not the window: window.innerWidth includes the scrollbar, the
  // fixed canvas (and every slot rect) doesn't, so using it squeezes the cloud and
  // shifts it sideways away from the static image it replaces.
  const viewW = () => canvas.clientWidth || window.innerWidth;
  const viewH = () => canvas.clientHeight || window.innerHeight;
  const resize = () => {
    renderer.setSize(viewW(), viewH(), false);
    camera.aspect = viewW() / viewH();
    camera.updateProjectionMatrix();
  };
  resize();
  // A ResizeObserver also catches the scrollbar appearing after load, which fires no window resize.
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  /* ---------- scroll → morph progress ---------- */
  const rects = () => slots.map((s) => s.getBoundingClientRect());

  function targetProgress(rs: DOMRect[]) {
    // Scroll position at which each slot sits centred on screen, clamped to what the
    // page can actually scroll to (so the hero shape is "home" at scroll 0 and the
    // last shape is reached at the very bottom).
    const vh = viewH();
    const sy = window.scrollY;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
    const stops = rs.map((r) => Math.min(maxScroll, Math.max(0, r.top + sy + r.height / 2 - vh / 2)));
    if (sy <= stops[0]) return 0;
    if (sy >= stops[last]) return last;
    for (let i = 0; i < last; i++) {
      if (sy < stops[i + 1]) {
        const span = stops[i + 1] - stops[i];
        return i + (span > 0 ? (sy - stops[i]) / span : 1);
      }
    }
    return last;
  }

  const smoothstep = (e0: number, e1: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
    return t * t * (3 - 2 * t);
  };

  /** Slot centre + fitted scale in world units. */
  function slotWorld(r: DOMRect, b: ShapeBuffer): [number, number, number] {
    const vw = viewW();
    const vh = viewH();
    const x = ((r.left + r.width / 2) / vw - 0.5) * VIS_H * (vw / vh);
    const y = (0.5 - (r.top + r.height / 2) / vh) * VIS_H;
    const w = (r.width / vh) * VIS_H;
    const h = (r.height / vh) * VIS_H;
    return [x, y, Math.min(w / b.width, h / b.height) * b.fill];
  }

  let loaded = -1;
  function loadSegment(seg: number) {
    const nxt = Math.min(seg + 1, last);
    aFrom.array.set(buffers[seg].positions);
    cFrom.array.set(buffers[seg].colors);
    aTo.array.set(buffers[nxt].positions);
    cTo.array.set(buffers[nxt].colors);
    aFrom.needsUpdate = aTo.needsUpdate = cFrom.needsUpdate = cTo.needsUpdate = true;
    loaded = seg;
  }

  /* ---------- pointer parallax + hover repulsion ---------- */
  // Repulsion, after the Framer "dot SVG" hover: particles within 2 × SEPARATION px of the
  // cursor are pushed away by up to SEPARATION px; the cursor is followed by a spring.
  const SEPARATION = 90; // px
  const SPRING = { stiffness: 150, damping: 20 };
  let mx = 0, my = 0, rx = 0, ry = 0;
  let px = 0, py = 0; // cursor target, CSS px
  let sx = 0, sy = 0, vx = 0, vy = 0; // sprung cursor, CSS px
  let hoverTarget = 0;
  let hover = 0;
  const onPointer = (e: PointerEvent) => {
    mx = (e.clientX / viewW()) * 2 - 1;
    my = (e.clientY / viewH()) * 2 - 1;
    if (e.pointerType !== "mouse" || reduceMotion) return;
    px = e.clientX;
    py = e.clientY;
    // Coming back in: start the spring at the cursor instead of sweeping across the shape.
    if (hover < 0.01) {
      sx = px; sy = py; vx = vy = 0;
    }
    hoverTarget = 1;
  };
  const onLeave = () => {
    hoverTarget = 0;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.documentElement.addEventListener("mouseleave", onLeave);
  window.addEventListener("blur", onLeave);

  /* ---------- loop ---------- */
  let current = targetProgress(rects());
  let raf = 0;
  let readyFired = false;
  const clock = new THREE.Clock();

  let lastTime = 0;
  const tick = () => {
    const time = clock.getElapsedTime();
    const dt = Math.min(0.05, time - lastTime);
    lastTime = time;

    const rs = rects();
    const target = targetProgress(rs);
    current += (target - current) * (reduceMotion ? 1 : 0.2);
    if (Math.abs(target - current) < 0.0005) current = target;

    const seg = Math.min(Math.floor(current), last);
    // f: how far we have scrolled from this slot to the next (0 → 1).
    const f = seg >= last ? 0 : current - seg;
    if (seg !== loaded) loadSegment(seg);

    // Position follows scroll linearly, which keeps the cloud on screen and carries it
    // down the page towards the next section as soon as you start scrolling.
    // The shape itself changes in the middle of the trip.
    const morph = smoothstep(0.12, 0.88, f);
    uniforms.uT.value = morph;

    const nxt = Math.min(seg + 1, last);
    const a = slotWorld(rs[seg], buffers[seg]);
    const b = slotWorld(rs[nxt], buffers[nxt]);
    group.position.set(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, 0);
    group.scale.setScalar(a[2] + (b[2] - a[2]) * morph);

    // Halos follow the shape, dimming while the particles are scattered mid-morph.
    const glow =
      (buffers[seg].glow * (1 - morph) + buffers[nxt].glow * morph) * (1 - Math.sin(morph * Math.PI) * 0.7);
    goldGlow.material.opacity = 0.3 * glow;
    blueGlow.material.opacity = 0.26 * glow;

    if (!reduceMotion) {
      rx += (my * 0.2 - rx) * 0.05;
      ry += (mx * 0.3 - ry) * 0.05;
      // Tilt follows the mouse only; no idle sway, so the cloud is still when you are.
      group.rotation.x = rx;
      group.rotation.y = ry;
      stars.position.y = (window.scrollY * 0.002) % 20;

      // Hover repulsion: spring the cursor, ease the effect in/out, hand both to the shader.
      vx += (SPRING.stiffness * (px - sx) - SPRING.damping * vx) * dt;
      vy += (SPRING.stiffness * (py - sy) - SPRING.damping * vy) * dt;
      sx += vx * dt;
      sy += vy * dt;
      hover += (hoverTarget - hover) * 0.1;
      const vw = viewW();
      const vh = viewH();
      const pxToWorld = VIS_H / vh;
      uniforms.uMouse.value.set((sx / vw - 0.5) * VIS_H * (vw / vh), (0.5 - sy / vh) * VIS_H);
      uniforms.uHover.value = hover;
      uniforms.uRadius.value = SEPARATION * 2 * pxToWorld;
      uniforms.uPush.value = SEPARATION * pxToWorld;
    }

    renderer.render(scene, camera);
    if (!readyFired) {
      readyFired = true;
      onReady?.();
    }
    raf = requestAnimationFrame(tick);
  };
  tick();

  return () => {
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    window.removeEventListener("pointermove", onPointer);
    document.documentElement.removeEventListener("mouseleave", onLeave);
    window.removeEventListener("blur", onLeave);
    geo.dispose();
    mat.dispose();
    starGeo.dispose();
    starMat.dispose();
    goldGlow.material.dispose();
    blueGlow.material.dispose();
    glowTexture.dispose();
    dotTexture.dispose();
    renderer.dispose();
  };
}
