import Image from "next/image";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SparkleIcon } from "@/components/ui/icons";
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
            className="relative mx-5 flex h-[97px] w-[325px] shrink-0 items-center justify-center"
          >
            {award.image ? (
              <Image src={award.image} alt={award.name} fill sizes="325px" className="object-contain" />
            ) : (
              // Text badge until the Figma laurel images are exported.
              <div className="flex items-center gap-4 text-white/85">
                <SparkleIcon className="size-4 shrink-0 text-white/40" />
                <span className="max-w-[190px] text-center font-body text-[17px] font-semibold leading-tight">
                  {award.name}
                </span>
                <SparkleIcon className="size-4 shrink-0 text-white/40" />
              </div>
            )}
          </div>
        ))}
      </Marquee>
    </section>
  );
}
