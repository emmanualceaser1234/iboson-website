import { Container } from "@/components/ui/Container";
import { ScrollStack } from "@/components/motion/ScrollStack";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParticleSlot } from "@/components/particles/ParticleSlot";
import { capabilities } from "@/data/home";
import { CapabilityCard } from "./CapabilityCard";

/**
 * "Ideas to reality": the four capability cards as a sticky scroll stack — each card
 * pins under the navbar and piles onto the last with a slight tilt; hover a card to
 * straighten and enlarge it. The particle haze forms behind them.
 */
export function IdeasToReality() {
  return (
    <section>
      <SectionHeading solid="Ideas to" outline="Reality" />
      <Container className="relative pb-20 md:pb-[120px]">
        <div className="absolute inset-x-0 -top-10 bottom-0">
          <ParticleSlot shape="cloud" className="size-full" />
        </div>

        <ScrollStack
          className="relative mx-auto max-w-[620px] gap-16 md:gap-20"
          itemClassName="top-24 md:top-[120px]"
        >
          {capabilities.map((card, i) => (
            <CapabilityCard key={card.title} card={card} index={i + 1} className="min-h-[360px] md:h-[400px]" />
          ))}
        </ScrollStack>
      </Container>
    </section>
  );
}
