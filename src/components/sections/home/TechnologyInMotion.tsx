import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SparkleIcon } from "@/components/ui/icons";
import { technologies } from "@/data/home";

export function TechnologyInMotion() {
  return (
    <section className="pb-20 md:pb-[120px] md:pt-[120px]">
      <SectionHeading solid="Technology in" outline="Motion" />
      <Marquee label={technologies.join(", ")} duration={35}>
        {technologies.map((tech) => (
          <span key={tech} className="flex items-center">
            <span className="whitespace-nowrap font-display text-xl font-light uppercase leading-[107px] text-white md:text-[28px]">
              {tech}
            </span>
            <SparkleIcon className="mx-8 size-6 text-white md:mx-12 md:size-8" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
