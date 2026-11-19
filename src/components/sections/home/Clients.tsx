import Image from "next/image";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { clients } from "@/data/home";

export function Clients() {
  return (
    <section className="py-16 md:py-[120px]">
      <TextReveal as="h2" text="Our Clients" className="text-center font-body text-base text-white/80 md:text-lg" />
      <Reveal delay={1} className="mx-auto mt-10 max-w-[1290px] md:mt-[39px]">
        <Marquee label={`Our clients: ${clients.map((c) => c.name).join(", ")}`} duration={30}>
          {clients.map((logo) => (
            <Image
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              className="mx-8 h-auto max-h-[53px] w-auto opacity-90 md:mx-[30px]"
              style={{ height: logo.height }}
            />
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
