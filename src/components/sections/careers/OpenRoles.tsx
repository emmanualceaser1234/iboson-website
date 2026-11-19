import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { applyHref, openApplication, openings } from "@/data/careers";

/** "Open roles": one row per opening, then the "Don't see your role?" card. */
export function OpenRoles() {
  return (
    <section id="open-roles" className="scroll-mt-16 pb-16 md:pb-[120px]">
      <SectionHeading solid="Open" outline="Roles" compact />
      <Container>
        <ul className="mx-auto max-w-[1220px] border-t border-white/12">
          {openings.map((job) => (
            <li
              key={job.title}
              className="flex flex-col gap-5 border-b border-white/12 py-7 md:flex-row md:items-center md:justify-between md:gap-10"
            >
              <div className="max-w-[760px]">
                <TextReveal
                  as="h3"
                  text={job.title}
                  className="font-display text-2xl uppercase leading-tight md:text-[28px]"
                />
                <TextReveal
                  text={job.description}
                  delay={2}
                  className="mt-2 font-body text-[15px] leading-relaxed text-white/55"
                />
              </div>
              <div className="flex shrink-0 items-center gap-8">
                <div>
                  <p className="font-display text-[11px] uppercase tracking-[0.12em] text-gold">{job.department}</p>
                  <p className="mt-0.5 font-body text-[13px] text-white/70">{job.location}</p>
                </div>
                <Button href={applyHref(job.title)} variant="gold">
                  Apply now
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-12 flex max-w-[1220px] flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm md:flex-row md:items-center md:justify-between md:px-11 md:py-10">
          <div>
            <TextReveal
              as="h3"
              text={openApplication.title}
              className="font-display text-2xl uppercase leading-tight md:text-[28px]"
            />
            <TextReveal
              text={openApplication.description}
              delay={2}
              className="mt-2 font-body text-sm leading-relaxed text-white/60"
            />
          </div>
          <Button href={openApplication.cta.href} variant="gold" className="shrink-0 self-start md:self-auto">
            {openApplication.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
