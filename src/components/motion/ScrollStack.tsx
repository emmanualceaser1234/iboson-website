"use client";

import { Children, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type ScrollStackProps = {
  children: ReactNode;
  /** Final tilt of the first / last card in degrees; cards in between are spread evenly. */
  rotation?: number;
  /** Final sideways shift of the first / last card in px (desktop only). */
  shift?: number;
  className?: string;
  /** Classes for each sticky card wrapper (sticky `top-*` offset lives here). */
  itemClassName?: string;
};

/**
 * Sticky scroll stack (after Framer "Scroll Stack", Demo 3 "Process cards"):
 * each card sticks below the navbar and piles onto the previous one. While a card
 * travels from mid-screen up to its sticky spot it tilts and slides out to its own
 * angle, so the pile fans slightly. Hovering a card straightens it, lifts it to the
 * front and scales it up while the others dim (styles: `.scroll-stack` in globals.css).
 */
export function ScrollStack({ children, rotation = 4, shift = 100, className, itemClassName }: ScrollStackProps) {
  const ref = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const n = items.length;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(":scope > .scroll-stack-card"));

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const card of cards) {
        // Progress 0 → 1 from "card top at screen centre" to "card top at its sticky offset".
        const top = card.getBoundingClientRect().top;
        const stick = parseFloat(getComputedStyle(card).top) || 0;
        const start = vh / 2;
        const p = start > stick ? (start - top) / (start - stick) : 1;
        card.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={ref} className={cn("scroll-stack flex flex-col", className)}>
      {items.map((child, i) => {
        // Spread evenly from −1 (first card) to +1 (last card), like Demo 3's −4° / 0° / +4°.
        const t = n > 1 ? (i / (n - 1)) * 2 - 1 : 0;
        return (
          <div
            key={i}
            className={cn("scroll-stack-card sticky", itemClassName)}
            style={{ zIndex: i + 1, "--rot": `${t * rotation}deg`, "--shift": `${t * shift}px` } as CSSProperties}
          >
            <div className="scroll-stack-inner">{child}</div>
          </div>
        );
      })}
    </div>
  );
}
