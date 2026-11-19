import { Fragment, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SparkleIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { contactLink } from "@/data/site";
import type { LegalBlock, LegalPage } from "@/types/content";
import { LegalContents } from "./LegalContents";

/** Turn emails and URLs inside policy text into links. */
function linkify(text: string): ReactNode {
  const parts = text.split(/((?:https?:\/\/[^\s,]+[^\s,.;:)])|(?:[\w.+-]+@[\w-]+(?:\.[\w-]+)+))/g);
  return parts.map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
    const href = part.includes("@") && !part.startsWith("http") ? `mailto:${part}` : part;
    return (
      <a key={i} href={href} className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-gold">
        {part}
      </a>
    );
  });
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "h3") {
    // "2.1 Personal information" → gold number, white title.
    const [, num, rest] = block.text.match(/^(\d+\.\d+)\s+(.*)$/) ?? [null, "", block.text];
    return (
      <h3 className="mt-7 font-display text-xl leading-snug">
        {num && <span className="mr-1.5 text-gold">{num}</span>}
        {rest}
      </h3>
    );
  }
  if (block.type === "list") {
    return (
      <ul className="mt-4 space-y-3">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <SparkleIcon className="mt-[0.45em] size-2.5 shrink-0 text-gold" />
            <span>{linkify(item)}</span>
          </li>
        ))}
      </ul>
    );
  }
  return <p className="mt-4 first:mt-0">{linkify(block.text)}</p>;
}

/**
 * Shared layout for the six legal pages (Figma Privacy Policy, Terms, Cookie Policy, Refund,
 * DPA, CAN-SPAM): centred hero, sticky contents card, numbered sections and a "Questions?" card.
 * Body copy fades in per section rather than letter by letter — these pages are long.
 */
export function LegalPageView({ page }: { page: LegalPage }) {
  const dates = [
    page.effectiveDate && `Effective date: ${page.effectiveDate}`,
    page.lastUpdated && `Last updated: ${page.lastUpdated}`,
  ].filter(Boolean);

  return (
    <>
      <section className="px-5 pb-12 pt-[150px] text-center md:pb-20 md:pt-[200px]">
        {dates.length > 0 && (
          <p className="font-display text-xs uppercase tracking-[0.14em] text-gold">{dates.join("  ·  ")}</p>
        )}
        <TextReveal
          as="h1"
          text={[{ text: page.outline, className: "text-outline" }, { text: page.solid }]}
          className="mt-5 font-display text-[clamp(3rem,7vw,6.25rem)] font-medium uppercase leading-[1.07] [--outline-width:1px] md:[--outline-width:2px]"
        />
        <TextReveal
          text={page.description}
          delay={3}
          className="mx-auto mt-6 max-w-[580px] font-body text-lg leading-relaxed text-white/75"
        />
      </section>

      <Container className="pb-16 md:pb-[120px]">
        <div className="mx-auto grid max-w-[1220px] gap-12 lg:grid-cols-[320px_minmax(0,820px)] lg:justify-between">
          <aside className="hidden lg:block">
            <LegalContents sections={page.sections.map(({ id, nav }) => ({ id, nav }))} />
          </aside>

          <div className="min-w-0">
            {page.sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-b border-white/12 pb-10 pt-10 first:pt-0"
              >
                <h2 className="flex items-baseline gap-3 font-display text-[28px] leading-tight">
                  <span className="text-base text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <TextReveal as="span" text={section.title} />
                </h2>
                <Reveal className="mt-5 font-body text-[15.5px] leading-[1.75] text-white/75">
                  {section.blocks.map((block, j) => (
                    <Block key={j} block={block} />
                  ))}
                </Reveal>
              </section>
            ))}

            {page.questions && (
              <Reveal className="mt-10 flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between md:px-8">
                <div>
                  <h2 className="font-display text-2xl uppercase">Questions?</h2>
                  <p className="mt-1.5 font-body text-sm text-white/60">{linkify(page.questions)}</p>
                </div>
                <Button href={contactLink.href} variant="gold" className="shrink-0 self-start sm:self-auto">
                  Contact us
                </Button>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
