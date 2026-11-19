import type { Metadata } from "next";
import { ParticleScene } from "@/components/particles/ParticleScene";
import { GetInTouch } from "@/components/sections/contact/GetInTouch";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { contactFaqs, contactIntro } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: contactIntro.description,
};

export default function ContactPage() {
  return (
    <>
      {/* Particle magnifier beside the FAQ (Figma); the starfield runs throughout. */}
      <ParticleScene />
      <main className="relative z-10">
        <GetInTouch />
        <FaqSection items={contactFaqs} />
        <CtaSection />
      </main>
    </>
  );
}
