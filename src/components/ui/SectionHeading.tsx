import type { ElementType } from "react";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** Words in solid white, e.g. "Ideas to". */
  solid: string;
  /** Words drawn as an outline, e.g. "Reality". */
  outline: string;
  /** Which part comes first. Figma uses both orders ("IDEAS TO ~REALITY~", "~OUR~ PRODUCTS"). */
  outlineFirst?: boolean;
  /** 80px instead of 120px below the title (Figma inner-page sections). */
  compact?: boolean;
  as?: ElementType;
  id?: string;
  className?: string;
};

/**
 * The signature iBoson section title: one part solid, one part outlined,
 * Oswald Medium 100px / 107px line height at desktop, centered, with 120px padding.
 */
export function SectionHeading({
  solid,
  outline,
  outlineFirst = false,
  compact = false,
  as: Tag = "h2",
  id,
  className,
}: SectionHeadingProps) {
  const solidPart = { text: solid };
  const outlinePart = { text: outline, className: "text-outline" };

  return (
    <div
      className={cn(
        "px-5 pt-20 text-center md:pt-[120px]",
        compact ? "pb-12 md:pb-20" : "pb-20 md:pb-[120px]",
        className,
      )}
    >
      <TextReveal
        as={Tag}
        id={id}
        text={outlineFirst ? [outlinePart, solidPart] : [solidPart, outlinePart]}
        className="font-display text-[clamp(3rem,7vw,6.25rem)] font-medium uppercase leading-[1.07] [--outline-width:1px] md:[--outline-width:2px]"
      />
    </div>
  );
}
