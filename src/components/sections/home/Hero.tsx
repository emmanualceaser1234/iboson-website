import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/motion/TextReveal";
import { ParticleSlot } from "@/components/particles/ParticleSlot";
import { hero } from "@/data/home";

export function Hero() {
  return (
    <section className="relative">
      <Container className="grid min-h-[100svh] items-center gap-6 pb-10 pt-[110px] md:grid-cols-[minmax(0,526px)_minmax(0,573px)] md:justify-between md:pb-0 md:pt-[94px] lg:min-h-[805px]">
        <div className="order-2 md:order-1">
          <TextReveal
            as="h1"
            text={[
              { text: hero.outline, className: "text-outline block" },
              ...hero.solid.map((line) => ({ text: line, className: "block" })),
            ]}
            className="font-display text-[clamp(3.75rem,7vw,6.25rem)] font-medium uppercase leading-[1.07] [--outline-width:1px] md:[--outline-width:2px]"
          />
          <TextReveal
            text={hero.description}
            delay={5}
            className="mt-7 max-w-[455px] font-body text-lg leading-[1.42] text-white/85 md:text-xl"
          />
        </div>
        <ParticleSlot
          shape="rocket"
          className="order-1 mx-auto aspect-[573/471] w-full max-w-[420px] md:order-2 md:max-w-none"
        />
      </Container>
    </section>
  );
}
