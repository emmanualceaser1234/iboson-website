import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/motion/TextReveal";
import { statement } from "@/data/home";

export function Statement() {
  return (
    <section className="py-20 md:py-[200px]">
      <Container>
        <TextReveal
          text={statement}
          className="mx-auto max-w-[1200px] text-center font-display text-lg font-light uppercase leading-[1.8] tracking-[0.09em] text-white md:text-[32px]"
        />
      </Container>
    </section>
  );
}
