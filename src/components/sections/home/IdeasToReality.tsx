import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParticleSlot } from "@/components/particles/ParticleSlot";
import { capabilities } from "@/data/home";
import { CapabilityCard } from "./CapabilityCard";

/**
 * "Ideas to reality": four capability cards fanned out in 3D, like the Figma stack,
 * with the particle haze forming behind them. Flat grid on small screens.
 */
export function IdeasToReality() {
  return (
    <section>
      <SectionHeading solid="Ideas to" outline="Reality" />
      <Container className="relative pb-20 md:pb-[120px] md:pt-[120px]">
        <div className="absolute inset-x-0 -top-10 bottom-0">
          <ParticleSlot shape="cloud" className="size-full" />
        </div>

        {/* Mobile / tablet: simple grid */}
        <div className="relative grid gap-4 sm:grid-cols-2 lg:hidden">
          {capabilities.map((card, i) => (
            <Reveal key={card.title} delay={i}>
              <CapabilityCard card={card} className="min-h-[300px]" />
            </Reveal>
          ))}
        </div>

        {/* Desktop: overlapping tilted stack */}
        <div className="relative mx-auto hidden h-[560px] w-[812px] lg:block">
          {capabilities.map((card, i) => (
            <Reveal
              key={card.title}
              delay={i}
              className="absolute top-0 w-[300px] [perspective:1500px]"
              style={{ left: i * 171 }}
            >
              <div
                className="transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] [transform:rotateY(-24deg)_rotateX(6deg)_rotateZ(-7deg)_translateY(var(--y))] hover:[transform:rotateY(-10deg)_rotateX(3deg)_rotateZ(-3deg)_translateY(calc(var(--y)-36px))]"
                style={{ "--y": `${i * 30}px` } as CSSProperties}
              >
                <CapabilityCard card={card} className="h-[440px]" />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
