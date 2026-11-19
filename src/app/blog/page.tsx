import type { Metadata } from "next";
import { ParticleScene } from "@/components/particles/ParticleScene";
import { FeaturedStory } from "@/components/sections/blog/FeaturedStory";
import { LatestPosts } from "@/components/sections/blog/LatestPosts";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { blogIntro } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: blogIntro.description,
};

export default function BlogPage() {
  return (
    <>
      {/* No particle shapes on this page (Figma) — just the starfield. */}
      <ParticleScene />
      <main className="relative z-10">
        <FeaturedStory />
        <LatestPosts />
        <CtaSection />
      </main>
    </>
  );
}
