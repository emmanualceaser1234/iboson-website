import { ParticleScene } from "@/components/particles/ParticleScene";
import { BuildToSolve } from "@/components/sections/home/BuildToSolve";
import { Clients } from "@/components/sections/home/Clients";
import { Hero } from "@/components/sections/home/Hero";
import { IdeasToReality } from "@/components/sections/home/IdeasToReality";
import { SolutionsThatMatter } from "@/components/sections/home/SolutionsThatMatter";
import { Statement } from "@/components/sections/home/Statement";
import { TechnologyInMotion } from "@/components/sections/home/TechnologyInMotion";
import { CtaSection } from "@/components/sections/shared/CtaSection";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { homeFaqs } from "@/data/home";

export default function HomePage() {
  return (
    <>
      <ParticleScene />
      <main className="relative z-10">
        <Hero />
        <Statement />
        <IdeasToReality />
        <BuildToSolve />
        <TechnologyInMotion />
        <SolutionsThatMatter />
        <Clients />
        <FaqSection items={homeFaqs} />
        <CtaSection withParticles />
      </main>
    </>
  );
}
