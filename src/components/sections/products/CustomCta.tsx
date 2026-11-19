import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/motion/TextReveal";
import { customCta } from "@/data/products";

/** "Need something custom?" closing section of the Products page. */
export function CustomCta() {
  return (
    <section className="px-5 py-20 text-center md:py-[120px]">
      <TextReveal
        as="h2"
        text={[{ text: customCta.solid }, { text: customCta.outline, className: "text-outline" }]}
        className="font-display text-[clamp(2.75rem,6vw,5.25rem)] font-medium uppercase leading-[1.07] [--outline-width:1px] md:[--outline-width:2px]"
      />
      <TextReveal
        text={customCta.text}
        delay={3}
        className="mx-auto mt-8 max-w-[560px] font-body text-lg leading-relaxed text-white/80 md:mt-10"
      />
      <div className="mt-10">
        <Button href={customCta.cta.href} variant="gold">
          {customCta.cta.label}
        </Button>
      </div>
    </section>
  );
}
