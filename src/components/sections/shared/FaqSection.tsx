import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ParticleSlot } from "@/components/particles/ParticleSlot";
import type { FaqItem } from "@/types/content";

type FaqSectionProps = {
  items: FaqItem[];
  title?: string;
  id?: string;
};

/** FAQ with the particle magnifying glass on the left (used on Home and Contact). */
export function FaqSection({ items, title = "FAQ", id = "faq" }: FaqSectionProps) {
  return (
    <section id={id} className="py-16 md:py-[120px]">
      <Container className="grid items-center gap-10 md:grid-cols-[minmax(0,520px)_minmax(0,643px)] md:justify-between xl:pl-[108px]">
        <ParticleSlot shape="magnifier" className="mx-auto aspect-square w-full max-w-[360px] md:max-w-[520px]" />
        <div>
          <TextReveal
            as="h2"
            text={title}
            className="font-display text-[clamp(3rem,5vw,4.5rem)] font-semibold uppercase leading-[1.05]"
          />
          <Reveal delay={1} className="mt-7">
            <Accordion
              titleCase="normal"
              items={items.map((item, i) => ({
                title: `${i + 1}. ${item.question}`,
                content: <p className="max-w-[600px] font-body text-[15px] leading-relaxed text-white/70">{item.answer}</p>,
              }))}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
