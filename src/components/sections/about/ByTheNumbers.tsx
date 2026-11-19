import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { stats } from "@/data/about";

/** "By the numbers": four large light-weight figures with labels. */
export function ByTheNumbers() {
  return (
    <section>
      <SectionHeading solid="By the" outline="Numbers" compact />
      <Container className="pb-16 md:pb-[120px]">
        <dl className="mx-auto grid max-w-[951px] grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {stats.map((stat, i) => (
            // dt (label) comes first in the DOM for screen readers; flex-col-reverse shows the number on top.
            <div key={stat.label} className="flex flex-col-reverse items-center text-center">
              <TextReveal
                as="dt"
                text={stat.label}
                delay={i + 2}
                className="mt-6 font-display text-xl font-light text-white/90 md:mt-10 md:text-2xl"
              />
              <TextReveal
                as="dd"
                text={stat.value}
                delay={i}
                className="font-display text-[clamp(4.5rem,9vw,8rem)] font-light leading-[1.05]"
              />
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
