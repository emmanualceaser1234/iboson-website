import type { Metadata } from "next";
import { ParticleScene } from "@/components/particles/ParticleScene";
import { OpenRoles } from "@/components/sections/careers/OpenRoles";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { careersHero } from "@/data/careers";

export const metadata: Metadata = {
  title: "Careers",
  description: careersHero.description,
};

export default function CareersPage() {
  return (
    <>
      {/* Only the hero has a particle shape on this page (Figma); the starfield runs throughout. */}
      <ParticleScene />
      <main className="relative z-10">
        <PageHero
          outline={careersHero.outline}
          solid={careersHero.solid}
          description={careersHero.description}
          shape="megaphone"
          cta={careersHero.cta}
        />
        <OpenRoles />
        <CtaSection />
      </main>
    </>
  );
}
