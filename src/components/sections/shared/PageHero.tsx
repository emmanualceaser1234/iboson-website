import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/motion/TextReveal";
import { ParticleSlot } from "@/components/particles/ParticleSlot";
import type { ShapeName } from "@/components/particles/engine/shapes";
import type { NavLink } from "@/types/content";

type PageHeroProps = {
  /** First title line, drawn as an outline (e.g. "About", "Join"). */
  outline: string;
  /** Second title line, solid (e.g. "iBoson", "Our team"). */
  solid: string;
  description: string;
  /** Particle shape that forms beside the title. */
  shape: ShapeName;
  cta?: NavLink;
};

/**
 * Inner-page hero (Figma About / Careers): outlined + solid title, intro and optional
 * button on the left, the page's particle shape on the right (680px tall in Figma).
 */
export function PageHero({ outline, solid, description, shape, cta }: PageHeroProps) {
  return (
    <section className="relative">
      <Container className="grid min-h-[100svh] items-center gap-6 pb-10 pt-[110px] md:grid-cols-[minmax(0,560px)_minmax(0,520px)] md:justify-between md:pb-0 md:pt-[94px] lg:min-h-[774px]">
        <div className="order-2 md:order-1">
          <TextReveal
            as="h1"
            text={[
              { text: outline, className: "text-outline block" },
              { text: solid, className: "block" },
            ]}
            className="font-display text-[clamp(3.75rem,7vw,6.25rem)] font-medium uppercase leading-[1.05] [--outline-width:1px] md:[--outline-width:2px]"
          />
          <TextReveal
            text={description}
            delay={4}
            className="mt-7 max-w-[500px] font-body text-lg leading-[1.42] text-white/85 md:text-xl"
          />
          {cta && (
            <div className="mt-8">
              <Button href={cta.href} variant="gold">
                {cta.label}
              </Button>
            </div>
          )}
        </div>
        <ParticleSlot
          shape={shape}
          className="order-1 mx-auto aspect-square w-full max-w-[380px] md:order-2 md:max-w-[520px] md:justify-self-end"
        />
      </Container>
    </section>
  );
}
