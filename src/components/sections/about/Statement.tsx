import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/motion/TextReveal";
import { ParticleSlot } from "@/components/particles/ParticleSlot";
import type { ShapeName } from "@/components/particles/engine/shapes";
import { cn } from "@/lib/cn";

type AboutStatementProps = {
  title: string;
  text: string;
  /** Right-aligned column (Vision) or left (Mission), as laid out in Figma. */
  align?: "left" | "right";
  /** Particle shape that settles in the empty half beside the text while you scroll past. */
  shape?: ShapeName;
};

/** Vision / Mission block: big solid title over a short statement, with the particles on the other side. */
export function AboutStatement({ title, text, align = "left", shape }: AboutStatementProps) {
  const textRight = align === "right";
  return (
    <section className="py-16 md:py-[120px]">
      <Container className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        {shape && (
          <ParticleSlot
            shape={shape}
            className={cn(
              "mx-auto aspect-[2/1] w-full max-w-[420px] md:aspect-square md:max-w-[440px]",
              textRight ? "md:order-1 md:justify-self-start" : "md:order-2 md:justify-self-end",
            )}
          />
        )}
        <div
          className={cn(
            "max-w-[601px]",
            textRight ? "md:order-2 md:justify-self-end" : "md:order-1",
            !shape && "md:col-span-2",
            !shape && textRight && "md:ml-auto",
          )}
        >
          <TextReveal
            as="h2"
            text={title}
            className="font-display text-[clamp(3rem,6.7vw,6rem)] font-medium uppercase leading-[1.05]"
          />
          <TextReveal
            text={text}
            delay={2}
            className="mt-6 font-body text-lg leading-[1.55] text-white/85 md:mt-8 md:text-2xl"
          />
        </div>
      </Container>
    </section>
  );
}
