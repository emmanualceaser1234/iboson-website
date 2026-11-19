/** Warm gold haze behind the navbar (Figma: Ellipse 963×139 at the top of every page). */
export function TopGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[-120px] z-[1] h-[260px] w-[min(963px,100vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(255_190_70/0.32),rgb(55_41_18/0.25)_55%,transparent)] blur-2xl"
    />
  );
}

/** Same haze rising from the bottom edge of the footer. */
export function BottomGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[-140px] left-1/2 h-[280px] w-[min(1100px,100vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(255_190_70/0.26),rgb(55_41_18/0.22)_55%,transparent)] blur-2xl"
    />
  );
}
