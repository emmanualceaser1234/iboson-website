import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { team } from "@/data/about";

const initials = (name: string) =>
  name
    .replace(/^Dr\.\s*/, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

/** "People behind iBoson": black-and-white portraits with name and role. */
export function Team() {
  return (
    <section>
      <SectionHeading solid="People Behind" outline="iBoson" compact />
      <Container className="pb-16 md:pb-[120px]">
        <ul className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8">
          {team.map((member, i) => (
            <li key={member.name} className="text-center">
              <Reveal
                delay={i}
                className="relative mx-auto aspect-[4/5] w-full max-w-[250px] overflow-hidden rounded-2xl"
              >
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(min-width: 768px) 250px, 45vw"
                    className="object-cover grayscale"
                  />
                ) : (
                  // Placeholder until the Figma portraits (image 424) are exported.
                  <div
                    aria-hidden="true"
                    className="grid size-full place-items-center border border-white/10 bg-[radial-gradient(circle_at_50%_30%,rgb(255_255_255/0.1),rgb(255_255_255/0.02)_70%)] font-display text-5xl font-light text-white/35"
                  >
                    {initials(member.name)}
                  </div>
                )}
              </Reveal>
              <TextReveal
                as="h3"
                text={member.name}
                className="mt-8 font-display text-2xl text-white md:mt-11 md:text-[28px]"
              />
              <TextReveal
                text={member.role}
                delay={2}
                className="mx-auto mt-3 max-w-[193px] font-body text-base leading-normal text-white/85 md:text-xl"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
