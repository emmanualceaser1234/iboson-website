"use client";

import { Children, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type ScrollStackProps = {
  children: ReactNode;
  /** Rendered behind the cards inside the pinned viewport (e.g. a particle slot). */
  background?: ReactNode;
  /** Card size and fan spacing, in px (Figma "Ideas to reality": 300×440, 171px apart, 30px drop). */
  cardWidth?: number;
  cardHeight?: number;
  step?: number;
  drop?: number;
  /** Scroll distance per card entrance, in vh. */
  scrollPerCard?: number;
  className?: string;
};

/**
 * Pinned card fan built on scroll (entrance after Framer "Scroll Stack" Demo 3, hover after
 * the Framer "3D card" demo). The section pins vertically centred; as you scroll, each card
 * rises from below with a spin and lands in its slot of the tilted 3D fan from Figma.
 * Hovering a card turns it flat towards you, brings it to the front and enlarges it while
 * the others dim. Styles: `.scroll-fan` in globals.css.
 */
export function ScrollStack({
  children,
  background,
  cardWidth = 300,
  cardHeight = 440,
  step = 171,
  drop = 30,
  scrollPerCard = 60,
  className,
}: ScrollStackProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const n = items.length;
  const fanWidth = step * (n - 1) + cardWidth;
  const fanHeight = cardHeight + drop * (n - 1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".scroll-fan-card"));

    let raf = 0;
    const update = () => {
      raf = 0;
      // p: 0 when the track pins, 1 when it unpins.
      const r = track.getBoundingClientRect();
      const range = r.height - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 1;
      // The first card is already in place; the others land one after another.
      cards.forEach((card, i) => {
        const q = i === 0 ? 1 : Math.min(1, Math.max(0, p * (n - 1) - (i - 1)));
        card.style.setProperty("--q", q.toFixed(4));
      });
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
  }, [n]);

  return (
    <div
      ref={trackRef}
      className={cn("relative", className)}
      style={{ height: `calc(100svh + ${(n - 1) * scrollPerCard}vh)` }}
    >
      {/* Pinned viewport; padding keeps the fan centred in the area below the navbar. */}
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden pt-[72px] md:pt-[94px]">
        {background}
        <div
          className="scroll-fan relative shrink-0"
          style={{ width: fanWidth, height: fanHeight } as CSSProperties}
        >
          {items.map((child, i) => {
            // Spin direction alternates per card, like Demo 3's −4° / 0° / +4° spread.
            const spin = (i % 2 === 0 ? -1 : 1) * (6 + i * 2);
            return (
              <div
                key={i}
                className="scroll-fan-card absolute top-0"
                style={
                  {
                    left: i * step,
                    width: cardWidth,
                    height: cardHeight,
                    zIndex: i + 1,
                    "--y": `${i * drop}px`,
                    "--spin": `${spin}deg`,
                  } as CSSProperties
                }
              >
                <div className="scroll-fan-enter size-full">
                  <div className="scroll-fan-inner size-full">{child}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
