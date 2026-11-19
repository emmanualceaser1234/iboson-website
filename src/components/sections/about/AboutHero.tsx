import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/motion/TextReveal";
import { ParticleSlot } from "@/components/particles/ParticleSlot";
import { aboutHero } from "@/data/about";

/** "About iBoson": outlined + solid title and intro beside the particle atom (Figma 680px tall). */
export function AboutHero() {
  return (
    <section className="relative">
      <Container className="grid min-h-[100svh] items-center gap-6 pb-10 pt-[110px] md:grid-cols-[minmax(0,560px)_minmax(0,520px)] md:justify-between md:pb-0 md:pt-[94px] lg:min-h-[774px]">
        <div className="order-2 md:order-1">
          <TextReveal
            as="h1"
            text={[
              { text: aboutHero.outline, className: "text-outline block" },
              { text: aboutHero.solid, className: "block" },
            ]}
            className="font-display text-[clamp(3.75rem,7vw,6.25rem)] font-medium uppercase leading-[1.05] [--outline-width:1px] md:[--outline-width:2px]"
          />
          <TextReveal
            text={aboutHero.description}
            delay={4}
            className="mt-7 max-w-[500px] font-body text-lg leading-[1.42] text-white/85 md:text-xl"
          />
        </div>
        <ParticleSlot
          shape="atom"
          className="order-1 mx-auto aspect-square w-full max-w-[380px] md:order-2 md:max-w-[520px] md:justify-self-end"
        />
      </Container>
    </section>
  );
}
