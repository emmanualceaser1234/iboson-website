import { TextReveal } from "@/components/motion/TextReveal";
import { productsIntro } from "@/data/products";

/** "Our products" page title (Figma hero, 345px tall incl. the navbar). */
export function ProductsIntro() {
  return (
    <section className="px-5 pb-6 pt-[150px] text-center md:pb-10 md:pt-[214px]">
      <TextReveal
        as="h1"
        text={[{ text: productsIntro.outline, className: "text-outline" }, { text: productsIntro.solid }]}
        className="font-display text-[clamp(3.25rem,7vw,6.25rem)] font-medium uppercase leading-[1.07] [--outline-width:1px] md:[--outline-width:2px]"
      />
    </section>
  );
}
