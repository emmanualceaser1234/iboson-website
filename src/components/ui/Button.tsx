import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href: string;
  children: ReactNode;
  /**
   * shine — dark pill with an animated gold light running around the border (Figma "Link").
   * gold  — dark pill with a solid pale-gold border (Figma "Button / Gold pill").
   */
  variant?: "shine" | "gold";
  className?: string;
};

const isExternal = (href: string) => /^https?:\/\//.test(href) || href.startsWith("mailto:");

export function Button({ href, children, variant = "shine", className }: ButtonProps) {
  const external = isExternal(href);
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  if (variant === "gold") {
    return (
      <Link
        href={href}
        {...linkProps}
        className={cn(
          "inline-flex items-center justify-center rounded-full border-[1.5px] border-gold-soft bg-[#050505] px-[30px] py-[14px]",
          "font-display text-sm font-medium uppercase tracking-[0.06em] text-white transition-colors hover:bg-gold-soft hover:text-black",
          className,
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      {...linkProps}
      className={cn(
        "group relative isolate inline-flex h-11 shrink-0 items-center justify-center overflow-hidden rounded-full p-[2px]",
        className,
      )}
    >
      {/* Rotating gold light; only a 2px ring of it shows around the inner pill. */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[180%] -translate-x-1/2 -translate-y-1/2"
      >
        <span className="block size-full animate-border-spin bg-[conic-gradient(from_0deg,transparent_0deg,transparent_60deg,#ffd25e_110deg,#fff4d6_140deg,#ffd25e_170deg,transparent_220deg,transparent_240deg,#ffd25e_290deg,#fff4d6_320deg,#ffd25e_350deg,transparent_360deg)]" />
      </span>
      <span aria-hidden="true" className="absolute inset-0 -z-10 rounded-full border border-line" />
      <span
        className={cn(
          "flex h-full items-center justify-center rounded-full bg-[#09090d] px-7",
          "font-display text-sm font-semibold uppercase leading-none tracking-[1.5px] whitespace-nowrap text-white",
          "transition-colors duration-300 group-hover:bg-[#1a1610]",
        )}
      >
        {children}
      </span>
    </Link>
  );
}
