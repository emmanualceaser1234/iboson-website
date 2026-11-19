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

export type ShapeDef = ImageShape | ProceduralShape;

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

/* ---------- registry ---------- */
export const SHAPES: Record<ShapeName, ShapeDef> = {
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
    job =
      def.kind === "image"
        ? loadPixels(def.src).then((px) => sampleImage(px, def, count))
        : Promise.resolve(sampleProcedural(def, count));
    job.catch(() => cache.delete(key));
    cache.set(key, job);
  }
  return job;
}
