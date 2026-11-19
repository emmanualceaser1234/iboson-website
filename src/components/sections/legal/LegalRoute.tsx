import type { Metadata } from "next";
import { ParticleScene } from "@/components/particles/ParticleScene";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import type { LegalPage } from "@/types/content";
import { LegalPageView } from "./LegalPageView";

const titleCase = (s: string) => s.toLowerCase().replace(/(^|[\s-])(\S)/g, (_, a: string, b: string) => a + b.toUpperCase());

/** Page metadata for a legal page, e.g. "Privacy Policy — iBoson". */
export function legalMetadata(page: LegalPage): Metadata {
  return {
    title: titleCase(`${page.outline} ${page.solid}`).replace(/^Can-Spam/i, "CAN-SPAM"),
    description: page.description,
  };
}

/** Full legal page: starfield, legal content and the shared closing CTA. */
export function LegalRoute({ page }: { page: LegalPage }) {
  return (
    <>
      <ParticleScene />
      <main className="relative z-10">
        <LegalPageView page={page} />
        <CtaSection />
      </main>
    </>
  );
}
