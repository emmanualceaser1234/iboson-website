"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ChevronDownIcon } from "./icons";

export type AccordionItem = {
  title: string;
  content: ReactNode;
  /** Optional element before the title, e.g. a sparkle icon. */
  leading?: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  /** Index open on first render; null for all closed. */
  defaultOpen?: number | null;
  /** "upper" for category lists (Solutions), "normal" for questions (FAQ). */
  titleCase?: "upper" | "normal";
  className?: string;
};

/** One-open-at-a-time accordion used by "Solutions that matter" and the FAQ blocks. */
export function Accordion({ items, defaultOpen = 0, titleCase = "upper", className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={cn("border-t border-line md:border-t-0", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.title} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-3 py-6 text-left font-display text-xl leading-tight text-white transition-colors hover:text-gold md:text-2xl",
                  titleCase === "upper" && "uppercase",
                )}
              >
                {item.leading}
                <span className="flex-1">{item.title}</span>
                <ChevronDownIcon
                  className={cn("size-3.5 shrink-0 transition-transform duration-300", isOpen && "rotate-180")}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-400 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <div className="pb-6">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
