import { cn } from "@/lib/cn";

/*
 * Laurel branch from the Figma "Awards" badges: a curved stem with eight pairs of pointed
 * leaves that shrink towards the tip. Generated as vector paths (crisp at any size).
 * Drawn as the right-hand branch ")"; `flip` mirrors it for the left side.
 */
const P0 = [8, 80];
const P1 = [50, 44];
const P2 = [12, 4];
const point = (t: number) => [0, 1].map((k) => (1 - t) ** 2 * P0[k] + 2 * (1 - t) * t * P1[k] + t * t * P2[k]);
const tangent = (t: number) => [0, 1].map((k) => 2 * (1 - t) * (P1[k] - P0[k]) + 2 * t * (P2[k] - P1[k]));
const angle = (t: number) => {
  const [tx, ty] = tangent(t);
  return (Math.atan2(ty, tx) * 180) / Math.PI + 90;
};
const leafPath = (len: number, w: number) => `M0,0 Q${w},${-len / 2} 0,${-len} Q${-w},${-len / 2} 0,0 Z`;

const round = (n: number) => Math.round(n * 100) / 100;
const PAIRS = 8;
const LEAVES = [
  ...Array.from({ length: PAIRS }, (_, i) => {
    const t = 0.1 + (i * 0.8) / (PAIRS - 1);
    const s = 1 - i * 0.055;
    const [x, y] = point(t);
    return [-1, 1].map((side) => ({
      d: leafPath(15 * s, 4.4 * s),
      transform: `translate(${round(x)} ${round(y)}) rotate(${round(angle(t) + side * 48)})`,
    }));
  }).flat(),
  (() => {
    const [x, y] = point(0.97);
    return { d: leafPath(11, 3), transform: `translate(${round(x)} ${round(y)}) rotate(${round(angle(0.97))})` };
  })(),
];
const STEM = `M${P0.join(",")} Q${P1.join(",")} ${point(0.97).map(round).join(",")}`;

export function Laurel({ flip = false, className }: { flip?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 52 84" aria-hidden="true" className={cn("fill-current", flip && "-scale-x-100", className)}>
      <path d={STEM} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {LEAVES.map((leaf, i) => (
        <path key={i} d={leaf.d} transform={leaf.transform} />
      ))}
    </svg>
  );
}
