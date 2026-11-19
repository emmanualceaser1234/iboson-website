import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { productHighlights } from "@/data/home";
import { ProductFeature } from "./ProductFeature";

export function BuildToSolve() {
  return (
    <section>
      <SectionHeading solid="Build to" outline="Solve" />
      <Container>
        {productHighlights.map((product, i) => (
          <ProductFeature key={product.slug} product={product} reverse={i % 2 === 1} />
        ))}
      </Container>
      <Reveal className="flex justify-center py-12 md:py-20">
        <Button href="/products">View more</Button>
      </Reveal>
    </section>
  );
}
