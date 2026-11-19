import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  /** Accessible summary of the scrolling content. */
  label: string;
  className?: string;
};

/** Infinite horizontal scroller. Content is rendered twice so the loop is seamless. */
export function Marquee({ children, duration = 40, label, className }: MarqueeProps) {
  return (
    <div
      role="region"
      aria-label={label}
      className={cn("group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]", className)}
    >
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
