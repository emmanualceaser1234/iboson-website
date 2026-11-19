import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ParticleSlot } from "@/components/particles/ParticleSlot";
import { contactLink } from "@/data/site";

type CtaSectionProps = {
  lines?: [string, string];
  cta?: { label: string; href: string };
  /** Let the particle cloud settle into soft dust behind the text. */
  withParticles?: boolean;
};

/** Closing call to action shared by every page (Figma component "CTA"). */
export function CtaSection({
  lines = ["Let’s build something", "intelligent together."],
  cta = contactLink,
  withParticles = false,
}: CtaSectionProps) {
  return (
    <section className="relative px-5 py-28 text-center md:py-40">
      {withParticles && (
        <div className="absolute inset-0">
          <ParticleSlot shape="dust" className="size-full" />
        </div>
      )}
      <TextReveal
        as="h2"
        text={[lines[0], "\n", lines[1]]}
        className="relative font-display text-[clamp(2.25rem,4.4vw,3.5rem)] font-normal uppercase leading-[1.2] tracking-[0.02em]"
      />
      <Reveal delay={1} className="relative mt-9">
        <Button href={cta.href}>{cta.label}</Button>
      </Reveal>
    </section>
  );
}
