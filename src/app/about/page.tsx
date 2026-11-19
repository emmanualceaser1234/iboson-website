import type { Metadata } from "next";
import { ParticleScene } from "@/components/particles/ParticleScene";
import { AboutStatement } from "@/components/sections/about/Statement";
import { Awards } from "@/components/sections/about/Awards";
import { ByTheNumbers } from "@/components/sections/about/ByTheNumbers";
import { Journey } from "@/components/sections/about/Journey";
import { Team } from "@/components/sections/about/Team";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { aboutHero, mission, vision } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description: aboutHero.description,
};

export default function AboutPage() {
  return (
    <>
      {/* Only the hero has a particle shape on this page (Figma); the starfield runs throughout. */}
      <ParticleScene />
      <main className="relative z-10">
        <PageHero
          outline={aboutHero.outline}
          solid={aboutHero.solid}
          description={aboutHero.description}
          shape="atom"
        />
        <AboutStatement title="Vision" text={vision} align="right" />
        <AboutStatement title="Mission" text={mission} />
        <ByTheNumbers />
        <Team />
        <Journey />
        <Awards />
        <CtaSection />
      </main>
    </>
  );
}
