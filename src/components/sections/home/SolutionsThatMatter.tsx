import { Accordion } from "@/components/ui/Accordion";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SparkleIcon } from "@/components/ui/icons";
import { ParticleSlot } from "@/components/particles/ParticleSlot";
import { solutions } from "@/data/home";

export function SolutionsThatMatter() {
  return (
    <section>
      <SectionHeading solid="Solutions that" outline="Matter" />
      <Container className="grid items-center gap-10 pb-16 md:grid-cols-[minmax(0,600px)_minmax(0,520px)] md:justify-between md:pb-20">
        <Reveal className="order-2 md:order-1">
          <Accordion
            items={solutions.map((s) => ({
              title: s.title,
              leading: <SparkleIcon className="size-4 shrink-0" />,
              content: (
                <div className="pl-7">
                  <p className="max-w-[480px] font-body text-base leading-relaxed text-white/75 md:text-lg">
                    {s.description}
                  </p>
                  <Chip href={s.product.href} className="mt-5">
                    {s.product.label}
                  </Chip>
                </div>
              ),
            }))}
          />
        </Reveal>
        <ParticleSlot
          shape="globe"
          className="order-1 mx-auto aspect-square w-full max-w-[340px] md:order-2 md:mx-0 md:max-w-[520px] md:justify-self-end"
        />
      </Container>
    </section>
  );
}
