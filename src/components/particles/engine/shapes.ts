/**
 * Particle shape registry.
 *
 * Image shapes are sampled from the particle illustrations in Figma (public/particles/*.png):
 * every particle takes the position and colour of a bright pixel in the artwork, so the 3D cloud
 * looks like the design. Replace a PNG with a fresh Figma export and the shape updates by itself.
 * Procedural shapes cover places where Figma has no single illustration (the haze behind the
 * capability cards, the dust behind the closing CTA) or where the export isn't available yet
 * (the About page atom, Figma "Particle / Atom (thick)").
 */

export type ShapeName =
  | "rocket"
  | "atom"
  | "cloud"
  | "sphere"
  | "code"
  | "plane"
  | "cube"
  | "globe"
  | "magnifier"
  | "like"
  | "dust";

type Vec3 = [number, number, number];

type ImageShape = {
  kind: "image";
  src: string;
  /** World width before the shape is fitted into its slot. */
  size?: number;
  /** Random z thickness, in world units. */
  depth?: number;
  /** Wrap the artwork onto a sphere (round shapes like the globe). */
  bulge?: boolean;
  /** How much of its slot the shape fills (1 = edge to edge). */
  fill?: number;
  /** Strength of the soft gold/blue halo behind the shape (Figma glow), 0–1. */
  glow?: number;
  /**
   * Ignore pixels more transparent than this (0–1). Use it for exports that carry a blurred
   * glow or a translucent body fill: otherwise particles land on that haze and the shape
   * reads as a blurry blob instead of crisp dots.
   */
  minAlpha?: number;
};

type ProceduralShape = {
  kind: "procedural";
  generate: () => [Vec3, Vec3];
  width: number;
  height: number;
  fill?: number;
  glow?: number;
};

/**
 * Line art drawn with the 2D canvas API, then sampled exactly like an image shape. Used where
 * the Figma particle export isn't available yet (e.g. the Lyks "like" bubble).
 */
type CanvasShape = {
  kind: "canvas";
  /** Canvas size in px (keep the longer side ≤ 512, like sampled images). */
  width: number;
  height: number;
  /** Draw in white on the transparent canvas; brighter/opaquer strokes attract more dots. */
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
  depth?: number;
  fill?: number;
  glow?: number;
};

export type ShapeDef = ImageShape | ProceduralShape | CanvasShape;

export type ShapeBuffer = {
  positions: Float32Array;
  colors: Float32Array;
  width: number;
  height: number;
  fill: number;
  glow: number;
};

/* ---------- helpers ---------- */
const R = Math.random;
const TAU = Math.PI * 2;
const gauss = () => {
  let u = 0;
  let v = 0;
  while (!u) u = R();
  while (!v) v = R();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
};
const mix = (a: Vec3, b: Vec3, t: number): Vec3 => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
const scale = (c: Vec3, s: number): Vec3 => [c[0] * s, c[1] * s, c[2] * s];

// Figma particle palette
const WHITE: Vec3 = [1, 1, 1];
const GOLD: Vec3 = [1, 0.74, 0.1];
const GOLD_LIGHT: Vec3 = [1, 0.85, 0.45];
const BLUE: Vec3 = [0.3, 0.6, 1];
const BLUE_LIGHT: Vec3 = [0.6, 0.8, 1];

/* ---------- procedural shapes ---------- */
function cloud(): [Vec3, Vec3] {
  const p: Vec3 = [gauss() * 1.5, gauss() * 0.75, gauss() * 0.6];
  if (R() < 0.5) {
    p[0] *= 1.35;
    p[1] *= 1.3;
  }
  const k = R();
  const c = k < 0.72 ? scale(WHITE, 0.35 + R() * 0.4) : k < 0.88 ? mix(GOLD, GOLD_LIGHT, R()) : mix(BLUE, BLUE_LIGHT, R());
  return [p, c];
}

function dust(): [Vec3, Vec3] {
  const a = R() * TAU;
  const rr = 2.6 + Math.abs(gauss()) * 1.4;
  const p: Vec3 = [Math.cos(a) * rr * 1.5, Math.sin(a) * rr * 0.6, gauss() * 0.8];
  const c = R() < 0.6 ? WHITE : R() < 0.5 ? GOLD_LIGHT : BLUE_LIGHT;
  return [p, scale(c, 0.3 + R() * 0.4)];
}

/**
 * Atom: a dense nucleus, three elliptical orbits 60° apart (each tipped back in 3D, so the
 * mouse tilt shows depth) and an electron blob riding each orbit. Gold and blue like Figma.
 */
const ORBIT_A = 2;
const ORBIT_B = 0.78;
const ORBIT_TILT = 0.55;
function atom(): [Vec3, Vec3] {
  const k = R();
  const gold = () => mix(GOLD, GOLD_LIGHT, R() * 0.6);
  const blue = () => mix(BLUE, BLUE_LIGHT, R() * 0.6);

  // Point on orbit `o` at angle t, plus a little tube thickness.
  const onOrbit = (o: number, t: number, spread: number): Vec3 => {
    const x0 = Math.cos(t) * ORBIT_A;
    const y0 = Math.sin(t) * ORBIT_B;
    const z0 = y0 * Math.sin(ORBIT_TILT); // tip the orbit back
    const y1 = y0 * Math.cos(ORBIT_TILT);
    const rot = (o * Math.PI) / 3;
    const c = Math.cos(rot);
    const s = Math.sin(rot);
    return [x0 * c - y1 * s + gauss() * spread, x0 * s + y1 * c + gauss() * spread, z0 + gauss() * spread];
  };

  if (k < 0.16) {
    // Nucleus: filled ball, brighter towards the centre.
    let x = 0, y = 0, z = 0, l = 0;
    while (l < 1e-6) {
      x = R() * 2 - 1; y = R() * 2 - 1; z = R() * 2 - 1; l = Math.hypot(x, y, z);
    }
    const r = 0.5 * Math.cbrt(R()) / l;
    return [[x * r, y * r, z * r], R() < 0.72 ? gold() : blue()];
  }
  if (k < 0.27) {
    // Electrons: a small dense blob on each orbit.
    const o = Math.floor(R() * 3);
    const t = [0.35, 2.4, 4.3][o];
    const p = onOrbit(o, t, 0);
    const r = 0.17 * Math.cbrt(R());
    const a = R() * TAU;
    const b = Math.acos(R() * 2 - 1);
    return [
      [p[0] + r * Math.sin(b) * Math.cos(a), p[1] + r * Math.sin(b) * Math.sin(a), p[2] + r * Math.cos(b)],
      R() < 0.8 ? gold() : WHITE,
    ];
  }
  // Orbits: speckled gold and blue, as in the Figma artwork.
  const o = Math.floor(R() * 3);
  const t = R() * TAU;
  return [onOrbit(o, t, 0.055), R() < 0.55 ? gold() : blue()];
}

/**
 * Lyks "like" notification (Figma Products page): a speech bubble with its tail at the
 * bottom, a thin inner frame, a filled heart and the count "1".
 */
function drawLike(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  ctx.lineJoin = "round";

  // Outer bubble with tail, as one outline.
  const l = 24, t = 24, r = 488, b = 324, rad = 64;
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.moveTo(l + rad, t);
  ctx.arcTo(r, t, r, b, rad);
  ctx.arcTo(r, b, l, b, rad);
  ctx.lineTo(296, b);
  ctx.lineTo(250, 406);
  ctx.lineTo(214, b);
  ctx.arcTo(l, b, l, t, rad);
  ctx.arcTo(l, t, r, t, rad);
  ctx.closePath();
  ctx.stroke();

  // Faint inner frame.
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.roundRect(54, 54, 404, 240, 44);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Heart.
  const cx = 170, cy = 178, s = 92;
  ctx.beginPath();
  ctx.moveTo(cx, cy + s * 0.75);
  ctx.bezierCurveTo(cx - s * 1.25, cy - s * 0.05, cx - s * 0.62, cy - s * 0.98, cx, cy - s * 0.36);
  ctx.bezierCurveTo(cx + s * 0.62, cy - s * 0.98, cx + s * 1.25, cy - s * 0.05, cx, cy + s * 0.75);
  ctx.fill();

  // Count.
  ctx.font = "700 200px Arial, Helvetica, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("1", 352, 184);
}

/* ---------- registry ---------- */
export const SHAPES: Record<ShapeName, ShapeDef> = {
  like: { kind: "canvas", width: 512, height: 420, draw: drawLike, depth: 0.45 },
  rocket: { kind: "image", src: "/particles/rocket.png", depth: 0.5, fill: 0.92, minAlpha: 0.2 },
  atom: { kind: "procedural", generate: atom, width: 4.3, height: 4.3, fill: 0.95 },
  cloud: { kind: "procedural", generate: cloud, width: 7.2, height: 3.6, glow: 0.25 },
  sphere: { kind: "image", src: "/particles/sphere.png", bulge: true },
  code: { kind: "image", src: "/particles/code.png", depth: 0.45 },
  plane: { kind: "image", src: "/particles/plane.png", depth: 0.5 },
  cube: { kind: "image", src: "/particles/cube.png", depth: 0.6 },
  globe: { kind: "image", src: "/particles/globe.png", bulge: true },
  magnifier: { kind: "image", src: "/particles/magnifier.png", depth: 0.4 },
  dust: { kind: "procedural", generate: dust, width: 9, height: 4, glow: 0 },
};

/* ---------- image sampling ---------- */
type Pixels = { data: Uint8ClampedArray; w: number; h: number };

async function loadPixels(src: string): Promise<Pixels> {
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  await img.decode();
  const k = Math.min(1, 512 / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.max(1, Math.round(img.naturalWidth * k));
  const h = Math.max(1, Math.round(img.naturalHeight * k));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2D canvas unavailable");
  ctx.drawImage(img, 0, 0, w, h);
  return { data: ctx.getImageData(0, 0, w, h).data, w, h };
}

function drawPixels(def: CanvasShape): Pixels {
  const canvas = document.createElement("canvas");
  canvas.width = def.width;
  canvas.height = def.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2D canvas unavailable");
  def.draw(ctx, def.width, def.height);
  return { data: ctx.getImageData(0, 0, def.width, def.height).data, w: def.width, h: def.height };
}

function sampleImage(px: Pixels, def: ImageShape, count: number): ShapeBuffer {
  const { data, w, h } = px;
  const minAlpha = def.minAlpha ?? 0;

  // Weight each pixel by opacity and brightness so particles gather on the bright dots
  // of the artwork rather than on any soft glow around it.
  const idx: number[] = [];
  const cum: number[] = [];
  let total = 0;
  for (let i = 0; i < w * h; i++) {
    const a = data[i * 4 + 3] / 255;
    if (a < minAlpha) continue;
    const lum = Math.max(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]) / 255;
    const wgt = a * lum * lum;
    if (wgt > 0.01) {
      total += wgt;
      idx.push(i);
      cum.push(total);
    }
  }
  if (!idx.length) throw new Error(`No visible pixels in ${def.src}`);

  // The cloud uses the image's full frame, exactly like the static fallback <img> in
  // ParticleSlot, so the two line up. Export particle PNGs cropped tight to the artwork.
  const worldW = def.size ?? 4;
  const worldH = (worldW * h) / w;

  const pick = () => {
    const t = R() * total;
    let lo = 0;
    let hi = cum.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cum[mid] < t) lo = mid + 1;
      else hi = mid;
    }
    return idx[lo];
  };

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const depth = def.depth ?? 0.5;

  for (let n = 0; n < count; n++) {
    const i = pick();
    const x = ((i % w) + R()) / w - 0.5;
    const y = 0.5 - (Math.floor(i / w) + R()) / h;
    const px3 = x * worldW;
    const py3 = y * worldH;
    let z = (R() - 0.5) * depth;
    let dim = 1;

    if (def.bulge) {
      const nx = x * 2;
      const ny = y * 2;
      const zf = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny)) * (worldW / 2) * 0.9;
      const back = R() < 0.25;
      z = (back ? -zf : zf) + (R() - 0.5) * 0.06;
      if (back) dim = 0.45;
    }

    positions.set([px3, py3, z], n * 3);
    colors.set(scale(toPalette(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]), dim), n * 3);
  }

  return {
    positions,
    colors,
    width: worldW,
    height: worldH,
    fill: def.fill ?? 0.92,
    glow: def.glow ?? 1,
  };
}

/**
 * Snap a sampled pixel to the Figma particle palette (gold / blue / white highlight).
 * The renders are anti-aliased against black, so raw pixels come out dull; under
 * additive blending that reads olive. Re-tinting keeps the artwork's colour layout
 * with the design's clean colours.
 */
function toPalette(r: number, g: number, b: number): Vec3 {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const sat = max > 0 ? (max - min) / max : 0;
  // Near full strength: with normal blending dots no longer brighten by stacking up.
  const bright = 0.88 + Math.min(1, max * 1.2) * 0.12 + (R() - 0.5) * 0.08;
  let c: Vec3;
  if (sat < 0.25 && max > 0.7) c = mix(GOLD_LIGHT, WHITE, 0.6 + R() * 0.4); // white sparkle
  else if (b > r) c = mix(BLUE, BLUE_LIGHT, R() * 0.6);
  else c = mix(GOLD, GOLD_LIGHT, R() * 0.5);
  return scale(c, bright);
}

/* ---------- colour pattern ---------- */
/**
 * Colour ramp from the reference: amber gold → gold → cream → icy white → light blue →
 * sky blue → azure. Dots take their colour from a smooth field over the shape, so colour
 * comes in soft zones (gold edges flowing through white into bright blue) instead of
 * random per-dot speckle.
 */
// Saturated colours measured from the reference render: deep orange-gold #FF8D00–#FFA100,
// gold #FFCB39, white, light blue #60BAFF, electric cyan #0BCAFF, deep blue #3380F2.
const RAMP: [number, Vec3][] = [
  [0.0, [1.0, 0.5, 0.0]],
  [0.16, [1.0, 0.6, 0.02]],
  [0.3, [1.0, 0.78, 0.2]],
  [0.39, [1.0, 0.95, 0.82]],
  [0.46, [0.85, 0.95, 1.0]],
  [0.56, [0.38, 0.73, 1.0]],
  [0.72, [0.22, 0.58, 0.94]],
  [0.86, [0.04, 0.72, 1.0]],
  [1.0, [0.16, 0.45, 0.92]],
];
function ramp(t: number): Vec3 {
  const x = Math.min(1, Math.max(0, t));
  for (let i = 1; i < RAMP.length; i++) {
    const [t1, c1] = RAMP[i];
    if (x <= t1) {
      const [t0, c0] = RAMP[i - 1];
      return mix(c0, c1, (x - t0) / (t1 - t0));
    }
  }
  return RAMP[RAMP.length - 1][1];
}

/** Smooth 2D value noise in 0–1, with a random offset so every shape gets its own zones. */
function makeNoise() {
  const table = Array.from({ length: 256 }, () => R());
  const hash = (x: number, y: number) => table[(((x * 73856093) ^ (y * 19349663)) >>> 0) % 256];
  const ox = R() * 100;
  const oy = R() * 100;
  return (px: number, py: number) => {
    const x = px + ox;
    const y = py + oy;
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = x - xi;
    const fy = y - yi;
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    const top = hash(xi, yi) + (hash(xi + 1, yi) - hash(xi, yi)) * sx;
    const bottom = hash(xi, yi + 1) + (hash(xi + 1, yi + 1) - hash(xi, yi + 1)) * sx;
    return top + (bottom - top) * sy;
  };
}

/**
 * Recolour a sampled shape with the reference pattern. Position decides most of the
 * colour (a top-left → bottom-right gold-to-blue drift plus soft noise patches); the
 * artwork's own gold/blue still nudges each dot so details like the rocket's gold window
 * ring keep their structure. Brightness is kept, so dim haze shapes stay dim.
 */
function applyColorPattern(buf: ShapeBuffer): ShapeBuffer {
  const { positions, colors, width, height } = buf;
  const noise = makeNoise();
  for (let i = 0; i < colors.length; i += 3) {
    const r = colors[i];
    const g = colors[i + 1];
    const b = colors[i + 2];
    const bright = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const isWhite = bright > 0 && min / bright > 0.8;
    const bias = isWhite ? 0 : b > r ? 0.16 : -0.16;

    const x = positions[i] / width; // about −0.5 … 0.5
    const y = positions[i + 1] / height;
    const diagonal = (x - y) * 0.5 + 0.5; // 0 top-left → 1 bottom-right
    const field = 0.45 * diagonal + 0.55 * noise(x * 2.4, y * 2.4);
    // Stretch the field (×1.9 around 0.5) so gold and blue form big distinct zones with a
    // thin white seam between them; +0.05 leans towards blue (reference: ~52% blue/cyan,
    // ~32% gold, ~16% white).
    const t = 0.55 + (field - 0.5) * 1.9 + bias + (R() - 0.5) * 0.12;

    const c = scale(ramp(t), Math.min(1, bright * 1.05));
    colors[i] = c[0];
    colors[i + 1] = c[1];
    colors[i + 2] = c[2];
  }
  return buf;
}

function sampleProcedural(def: ProceduralShape, count: number): ShapeBuffer {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let n = 0; n < count; n++) {
    const [p, c] = def.generate();
    positions.set(p, n * 3);
    colors.set(c, n * 3);
  }
  return {
    positions,
    colors,
    width: def.width,
    height: def.height,
    fill: def.fill ?? 1,
    glow: def.glow ?? 1,
  };
}

const cache = new Map<string, Promise<ShapeBuffer>>();

/** Build (or reuse) the point cloud for a shape. Browser only. */
export function getShapeBuffer(name: ShapeName, count: number): Promise<ShapeBuffer> {
  const key = `${name}:${count}`;
  let job = cache.get(key);
  if (!job) {
    const def = SHAPES[name];
    const built =
      def.kind === "image"
        ? loadPixels(def.src).then((px) => sampleImage(px, def, count))
        : def.kind === "canvas"
          ? Promise.resolve().then(() =>
              sampleImage(drawPixels(def), { kind: "image", src: name, depth: def.depth, fill: def.fill, glow: def.glow }, count),
            )
          : Promise.resolve(sampleProcedural(def, count));
    job = built.then(applyColorPattern);
    job.catch(() => cache.delete(key));
    cache.set(key, job);
  }
  return job;
}
