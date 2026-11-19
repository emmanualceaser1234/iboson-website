import type { Metadata } from "next";
import { ParticleScene } from "@/components/particles/ParticleScene";
import { CustomCta } from "@/components/sections/products/CustomCta";
import { ProductSection } from "@/components/sections/products/ProductSection";
import { ProductsIntro } from "@/components/sections/products/ProductsIntro";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Blooming, Phoenix vu, StarAlly, NoxVision and Lyks — AI products for businesses, Apple developers, everyday life, AR developers and Shopify stores.",
};

export default function ProductsPage() {
  return (
    <>
      {/* The particle cloud morphs from product to product as you scroll. */}
      <ParticleScene />
      <main className="relative z-10">
        <ProductsIntro />
        {products.map((product, i) => (
          <ProductSection key={product.slug} product={product} shapeLeft={i % 2 === 0} />
        ))}
        <CustomCta />
      </main>
    </>
  );
}
