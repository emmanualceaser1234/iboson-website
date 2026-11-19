import { ScrollStack } from "@/components/motion/ScrollStack";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParticleSlot } from "@/components/particles/ParticleSlot";
import { capabilities } from "@/data/home";
import { CapabilityCard } from "./CapabilityCard";

/**
 * "Ideas to reality": the section pins centred on screen while the four capability cards
 * land one by one into the tilted 3D fan from Figma; hover a card to view it face-on.
 * The particle haze stays behind them for the whole pinned stretch.
 */
export function IdeasToReality() {
  return (
    <section>
      <SectionHeading solid="Ideas to" outline="Reality" />
      <ScrollStack
        className="mb-10 md:mb-20"
        background={
          <div className="absolute inset-x-0 bottom-[8%] top-[18%]">
            <ParticleSlot shape="cloud" className="size-full" />
          </div>
        }
      >
        {capabilities.map((card) => (
          <CapabilityCard key={card.title} card={card} className="size-full" />
        ))}
      </ScrollStack>
    </section>
  );
}
