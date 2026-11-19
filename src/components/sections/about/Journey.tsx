import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { milestones } from "@/data/about";

/** "Our journey": five milestones on a timeline — glowing gold dot, hairline, outlined year. */
export function Journey() {
  return (
    <section>
      <SectionHeading solid="Our" outline="Journey" compact />
      <Container className="pb-16 md:pb-[120px]">
        <ol className="mx-auto grid max-w-[1220px] gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {milestones.map((m, i) => (
            <li key={m.year}>
              <Reveal delay={i} className="flex items-center gap-3" aria-hidden="true">
                <span className="grid size-[18px] shrink-0 place-items-center">
                  <span className="size-2 rounded-full bg-gold shadow-[0_0_10px_3px_rgb(255_210_94/0.55)]" />
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-white/35 to-white/10" />
              </Reveal>
              <TextReveal
                text={m.year}
                delay={i}
                className="text-outline mt-5 font-display text-[clamp(3.5rem,5.6vw,5rem)] leading-[1.1] [--outline-width:1px]"
              />
              <TextReveal
                as="h3"
                text={m.title}
                delay={i + 2}
                className="mt-5 font-display text-xl uppercase leading-[1.4]"
              />
              <TextReveal
                text={m.description}
                delay={i + 3}
                className="mt-2.5 max-w-[240px] font-body text-sm leading-[1.64] text-white/60"
              />
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
