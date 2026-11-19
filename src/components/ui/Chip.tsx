import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ChipProps = {
  children: ReactNode;
  href?: string;
  className?: string;
};

/** Small uppercase pill, e.g. "BLOOMING - AI AGENT STUDIO". Renders a link when `href` is set. */
export function Chip({ children, href, className }: ChipProps) {
  const classes = cn(
    "inline-flex items-center rounded-full border border-line bg-white/10 px-4 py-2",
    "font-display text-xs uppercase tracking-[0.08em] text-white",
    href && "transition-colors hover:border-gold/60 hover:bg-white/15",
    className,
  );
  return href ? (
    <Link href={href} className={classes}>
      {children}
    </Link>
  ) : (
    <span className={classes}>{children}</span>
  );
}
