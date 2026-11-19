import Link from "next/link";
import { ArrowUpRightIcon, SparkleIcon } from "@/components/ui/icons";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/cn";
import type { CapabilityCard as CapabilityCardData } from "@/types/content";

type CapabilityCardProps = {
  card: CapabilityCardData;
  /** Step number shown large in the corner (1 → "01"). */
  index?: number;
  className?: string;
};

/** Dark glass card from "Ideas to reality". Tilt and hover motion come from the parent stack. */
export function CapabilityCard({ card, index, className }: CapabilityCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col justify-between rounded-[18px] border border-white/12 p-7",
        "bg-[linear-gradient(160deg,rgb(38_38_44/0.92),rgb(14_14_17/0.94)_45%)] shadow-[-18px_24px_50px_rgb(0_0_0/0.65)] backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        {index !== undefined && (
          <span className="font-display text-7xl font-extralight leading-none text-white/90 md:text-8xl">
            {String(index).padStart(2, "0")}
          </span>
        )}
        <SparkleIcon className="size-7 text-white" />
      </div>
      <div>
        <TextReveal as="h3" text={card.title} className="font-display text-2xl leading-[1.2] text-white md:text-[26px]" />
        <TextReveal text={card.description} delay={3} className="mt-3 font-body text-[15px] leading-normal text-white/60" />
        <Link
          href={card.link.href}
          className="mt-6 inline-flex items-center gap-1.5 font-display text-[15px] text-white transition-colors hover:text-gold"
        >
          {card.link.label}
          <ArrowUpRightIcon className="size-3" />
        </Link>
      </div>
    </article>
  );
}
