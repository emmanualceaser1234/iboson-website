import { Container } from "@/components/ui/Container";
import { SparkleIcon } from "@/components/ui/icons";
import { TextReveal } from "@/components/motion/TextReveal";
import { contactEmail, followLinks, offices } from "@/data/contact";
import { ContactForm } from "./ContactForm";

const RowLabel = ({ children }: { children: string }) => (
  <p className="flex items-center gap-2.5 font-display text-xs uppercase tracking-[0.14em] text-white/85">
    <SparkleIcon className="size-3 shrink-0" />
    {children}
  </p>
);

/** "Get in touch": contact details on the left, the message form on the right. */
export function GetInTouch() {
  return (
    <section className="pb-16 pt-[120px] md:pb-[120px] md:pt-[200px]">
      <Container className="grid items-start gap-12 md:grid-cols-[minmax(0,460px)_minmax(0,672px)] md:justify-between">
        <div>
          <TextReveal
            as="h1"
            text={[{ text: "Get in" }, { text: "touch", className: "text-outline" }]}
            className="font-display text-[clamp(3rem,5.6vw,5rem)] font-medium uppercase leading-[1.07] [--outline-width:1px] md:[--outline-width:2px]"
          />

          <div className="mt-8 divide-y divide-white/12 border-y border-white/12">
            <div className="py-6">
              <RowLabel>Email us</RowLabel>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-3 inline-block font-body text-xl text-white transition-colors hover:text-gold"
              >
                {contactEmail}
              </a>
            </div>
            {offices.map((office) => (
              <address key={office.label} className="py-6 not-italic">
                <RowLabel>{office.label}</RowLabel>
                <TextReveal
                  text={office.address}
                  className="mt-3 max-w-[430px] font-body text-[15px] leading-[1.6] text-white/75"
                />
              </address>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="font-display text-[11px] uppercase tracking-[0.14em] text-white/45">Follow us</p>
            {followLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="font-body text-sm text-white/85 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <ContactForm />
      </Container>
    </section>
  );
}
