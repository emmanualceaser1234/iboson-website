import Image from "next/image";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Laurel } from "@/components/ui/Laurel";
import { awards } from "@/data/about";

/** "Awards and recognition": a slow marquee of laurel badges (325 × 97 in Figma). */
export function Awards() {
  return (
    <section className="pb-16 md:pb-[120px]">
      <SectionHeading solid="Awards and" outline="Recognition" compact />
      <Marquee label={`Awards: ${awards.map((a) => a.name).join(", ")}`} duration={45}>
        {awards.map((award) => (
          <div
            key={award.name}
            className="relative mx-6 flex h-[97px] min-w-[240px] shrink-0 items-center justify-center"
          >
            {award.image ? (
              <Image src={award.image} alt={award.name} fill sizes="325px" className="object-contain" />
            ) : (
              // Figma laurel badge: grey wreath branches either side of the award name.
              <div className="flex items-center gap-2">
                <Laurel flip className="h-[90px] w-auto shrink-0 text-[#959595]" />
                <span className="text-center font-body text-[19px] font-semibold leading-[1.15] text-white">
                  {(award.lines ?? [award.name]).map((line) => (
                    <span key={line} className="block whitespace-nowrap">
                      {line}
                    </span>
                  ))}
                </span>
                <Laurel className="h-[90px] w-auto shrink-0 text-[#959595]" />
              </div>
            )}
          </div>
        ))}
      </Marquee>
    </section>
  );
}
