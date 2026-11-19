import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/cn";

type AboutStatementProps = {
  title: string;
  text: string;
  /** Right-aligned column (Vision) or left (Mission), as laid out in Figma. */
  align?: "left" | "right";
};

/** Vision / Mission block: big solid title over a short statement, 120px section padding. */
export function AboutStatement({ title, text, align = "left" }: AboutStatementProps) {
  return (
    <section className="py-16 md:py-[120px]">
      <Container>
        <div className={cn("max-w-[601px]", align === "right" && "md:ml-auto")}>
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
