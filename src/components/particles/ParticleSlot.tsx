import Image from "next/image";
import { cn } from "@/lib/cn";
import { SHAPES, type ShapeName } from "./engine/shapes";

type ParticleSlotProps = {
  shape: ShapeName;
  className?: string;
};

/**
 * Reserves space where the particle cloud should form a shape.
 * The ParticleScene finds slots in DOM order and morphs between them while scrolling.
 * The static Figma illustration is only a fallback for when particles can't run
 * (hidden otherwise, see `.particle-fallback` in globals.css).
 */
export function ParticleSlot({ shape, className }: ParticleSlotProps) {
  const def = SHAPES[shape];
  const fill = def.fill ?? (def.kind === "image" ? 0.92 : 1);

  return (
    <div data-particle-slot data-shape={shape} aria-hidden="true" className={cn("relative", className)}>
      {def.kind === "image" && (
        <Image
          src={def.src}
          alt=""
          fill
          loading="lazy"
          sizes="(min-width: 768px) 520px, 90vw"
          className="particle-fallback object-contain"
          style={{ scale: String(fill) }}
        />
      )}
    </div>
  );
}
