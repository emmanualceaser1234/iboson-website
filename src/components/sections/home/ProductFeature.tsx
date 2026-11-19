import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ParticleSlot } from "@/components/particles/ParticleSlot";
import { cn } from "@/lib/cn";
import type { ProductHighlight } from "@/types/content";

type ProductFeatureProps = {
  product: ProductHighlight;
  /** Put the particle shape on the left. */
  reverse?: boolean;
  ctaLabel?: string;
};

/** Product row: name, one-line pitch and button beside its particle shape (680px tall in Figma). */
export function ProductFeature({ product, reverse = false, ctaLabel = "Visit website" }: ProductFeatureProps) {
  return (
    <article
      id={product.slug}
      className={cn(
        "grid scroll-mt-24 items-center gap-8 py-12 md:min-h-[680px] md:justify-between md:py-20",
        reverse
          ? "md:grid-cols-[minmax(0,520px)_minmax(0,579px)]"
          : "md:grid-cols-[minmax(0,579px)_minmax(0,520px)]",
      )}
    >
      <div className={cn("order-2", reverse ? "md:order-2" : "md:order-1")}>
        <TextReveal
          as="h3"
          text={product.name}
          className="font-display text-[clamp(2.5rem,4.2vw,3.75rem)] font-semibold uppercase leading-[1.17]"
        />
        <TextReveal
          text={product.description}
          delay={3}
          className="mt-6 max-w-[579px] font-body text-lg leading-[1.42] text-white/85 md:mt-8 md:text-xl"
        />
        <Reveal delay={2} className="mt-8">
          <Button href={product.href}>{ctaLabel}</Button>
        </Reveal>
      </div>
      <ParticleSlot
        shape={product.shape}
        className={cn(
          "order-1 mx-auto aspect-square w-full max-w-[340px] md:max-w-[520px]",
          reverse ? "md:order-1 md:mx-0" : "md:order-2 md:mx-0 md:justify-self-end",
        )}
      />
    </article>
  );
}
