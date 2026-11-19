import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SparkleIcon } from "@/components/ui/icons";
import { Tabs } from "@/components/ui/Tabs";
import { TextReveal } from "@/components/motion/TextReveal";
import { ParticleSlot } from "@/components/particles/ParticleSlot";
import { cn } from "@/lib/cn";
import type { ProductDetail } from "@/types/content";

type ProductSectionProps = {
  product: ProductDetail;
  /** Particle shape on the left (Figma alternates: Blooming, StarAlly and Lyks on the left). */
  shapeLeft?: boolean;
};

const Eyebrow = ({ children }: { children: string }) => (
  <TextReveal as="p" text={children} className="font-display text-[13px] uppercase tracking-[0.14em] text-gold" />
);

const cardClass = "rounded-xl border border-white/12 bg-white/[0.03] backdrop-blur-sm";

function Overview({ product }: { product: ProductDetail }) {
  return (
    <>
      <TextReveal text={product.overview} className="font-body text-base leading-[1.75] text-white/75 md:text-[17px]" />
      <p className="mt-5 flex items-start gap-3 font-body text-[15px] text-white">
        <SparkleIcon className="mt-1 size-3.5 shrink-0" />
        <TextReveal as="span" text={product.problem} delay={2} />
      </p>

      {product.modules && (
        <div className="mt-10">
          <Eyebrow>{`Inside ${product.name}`}</Eyebrow>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {product.modules.map((m) => (
              <li key={m.title} className={cn(cardClass, "p-4")}>
                <TextReveal as="h3" text={m.title} className="font-display text-lg uppercase" />
                <TextReveal text={m.description} className="mt-1 font-body text-[13px] text-white/55" />
                {m.link ? (
                  <a
                    href={m.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-block font-display text-[13px] text-gold underline underline-offset-2 transition-colors hover:text-gold-soft"
                  >
                    {m.link.label}
                  </a>
                ) : (
                  m.status && (
                    <p className="mt-1.5 font-display text-[13px] uppercase tracking-[0.08em] text-gold/80">{m.status}</p>
                  )
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {product.steps && (
        <div className="mt-10">
          <Eyebrow>How it works</Eyebrow>
          <ol className="mt-4 border-t border-white/12">
            {product.steps.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[48px_1fr] items-baseline gap-y-1 border-b border-white/12 py-4 md:grid-cols-[48px_200px_1fr]"
              >
                <span className="font-display text-xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <TextReveal as="h3" text={step.title} className="font-display text-base uppercase tracking-[0.04em]" />
                <TextReveal
                  text={step.description}
                  delay={1}
                  className="col-start-2 font-body text-[13px] text-white/55 md:col-start-3"
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}

function Solutions({ product }: { product: ProductDetail }) {
  return (
    <>
      <Eyebrow>Where it helps</Eyebrow>
      <ul className="mt-4 border-t border-white/12">
        {product.solutions.map((s) => (
          <li key={s.title} className="flex gap-3 border-b border-white/12 py-5">
            <SparkleIcon className="mt-1 size-3.5 shrink-0 text-white" />
            <div>
              <TextReveal as="h3" text={s.title} className="font-display text-lg uppercase" />
              <TextReveal text={s.description} delay={1} className="mt-1.5 font-body text-sm leading-relaxed text-white/60" />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function Technology({ product }: { product: ProductDetail }) {
  return (
    <>
      <Eyebrow>What powers it</Eyebrow>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {product.technology.map((t) => (
          <li key={t.title} className={cn(cardClass, "p-5")}>
            <SparkleIcon className="size-3.5 text-white" />
            <TextReveal as="h3" text={t.title} className="mt-4 font-display text-lg uppercase" />
            <TextReveal text={t.description} delay={1} className="mt-2 font-body text-[13px] leading-relaxed text-white/55" />
          </li>
        ))}
      </ul>
    </>
  );
}

/** One product: eyebrow, name, tagline, Overview / Solutions / Technology tabs, and its particle shape. */
export function ProductSection({ product, shapeLeft = false }: ProductSectionProps) {
  return (
    <section id={product.slug} className="scroll-mt-24">
      <Container
        className={cn(
          "grid items-center gap-10 py-16 md:justify-between md:py-[120px]",
          shapeLeft
            ? "md:grid-cols-[minmax(0,520px)_minmax(0,640px)]"
            : "md:grid-cols-[minmax(0,640px)_minmax(0,520px)]",
        )}
      >
        <ParticleSlot
          shape={product.shape}
          className={cn(
            "mx-auto aspect-square w-full max-w-[340px] md:sticky md:top-[calc(50vh-260px)] md:max-w-[520px] md:self-start",
            shapeLeft ? "md:order-1" : "md:order-2",
          )}
        />
        <div className={shapeLeft ? "md:order-2" : "md:order-1"}>
          <Eyebrow>{product.eyebrow}</Eyebrow>
          <TextReveal
            as="h2"
            text={product.name}
            className="mt-3 font-display text-[clamp(3rem,5vw,4.5rem)] font-semibold uppercase leading-[1.1]"
          />
          <TextReveal
            text={product.tagline}
            delay={2}
            className="mt-2 font-body text-lg text-white/85 md:text-xl"
          />

          <Tabs
            label={`${product.name} details`}
            className="mt-8"
            tabs={[
              { id: "overview", label: "Overview", content: <Overview product={product} /> },
              { id: "solutions", label: "Solutions", content: <Solutions product={product} /> },
              { id: "technology", label: "Technology", content: <Technology product={product} /> },
            ]}
          />

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button href={product.website} variant="gold">
              Visit website
            </Button>
            <div>
              <p className="font-display text-[11px] uppercase tracking-[0.14em] text-white/45">Built for</p>
              <p className="mt-0.5 font-body text-sm text-white">{product.builtFor}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
