import { Fragment, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SparkleIcon } from "@/components/ui/icons";
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
      <h3 className="mt-[22px] font-display text-[21px] leading-snug text-white first:mt-0">
        {num && <span className="mr-1.5 text-gold">{num}</span>}
        {rest}
      </h3>
    );
  }
  if (block.type === "list") {
    return (
      <ul className="mt-3.5 space-y-[11px]">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <SparkleIcon className="ml-1 mt-[0.6em] size-3 shrink-0 text-gold" />
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
 * No entrance animations: legal copy is shown immediately.
 */
export function LegalPageView({ page }: { page: LegalPage }) {
  // Figma shows the dates line on every legal page ("[INSERT DATE]" until real dates are set).
  const placeholder = "[Insert date]";
  const dates = [`Effective date: ${page.effectiveDate ?? placeholder}`];
  if (!page.effectiveOnly) dates.push(`Last updated: ${page.lastUpdated ?? placeholder}`);

  return (
    <>
      {/* Figma hero: dates line, outlined + solid title, two-line intro; body starts 40px below. */}
      <section className="px-5 pb-12 pt-[150px] text-center md:pb-[90px] md:pt-[197px]">
        <p className="font-display text-xs uppercase tracking-[0.14em] text-gold">
          {dates.map((d, i) => (
            <Fragment key={d}>
              {i > 0 && <span className="mx-3">·</span>}
              {d}
            </Fragment>
          ))}
        </p>
        <h1 className="mt-8 font-display text-[clamp(3rem,7vw,6.25rem)] font-medium uppercase leading-[1.07] [--outline-width:1px] md:[--outline-width:2px]">
          <span className="text-outline">{page.outline}</span> {page.solid}
        </h1>
        <p className="mx-auto mt-[18px] max-w-[760px] font-body text-lg font-light leading-[1.55] text-white/80 md:text-xl">
          {page.description}
        </p>
      </section>

      <Container className="pb-16 md:pb-[120px] md:pt-10">
        {/* Figma body spans 1220px (110 → 1330 on the 1440 frame), 10px wider than the container. */}
        <div className="mx-auto grid max-w-[1220px] gap-12 lg:grid-cols-[320px_minmax(0,820px)] lg:justify-between xl:-mx-2.5">
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
                <h2 className="flex items-start gap-3 font-display text-[30px] leading-[1.3]">
                  <span className="mt-1.5 text-base leading-none text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span>{section.title}</span>
                </h2>
                <div className="mt-3.5 font-body text-[17px] font-light leading-[1.8] text-white/80 md:text-lg md:leading-[1.75]">
                  {section.blocks.map((block, j) => (
                    <Block key={j} block={block} />
                  ))}
                </div>
              </section>
            ))}

            {page.questions && (
              <div className="mt-10 flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between md:px-10 md:py-[38px]">
                <div>
                  <h2 className="font-display text-[26px] uppercase leading-tight md:text-[30px]">Questions?</h2>
                  <p className="mt-1.5 font-body text-sm text-white/60">{linkify(page.questions)}</p>
                </div>
                <Button href={contactLink.href} variant="gold" className="shrink-0 self-start sm:self-auto">
                  Contact us
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
