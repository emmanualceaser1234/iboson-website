"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type TabItem = { id: string; label: string; content: ReactNode };

type TabsProps = {
  tabs: TabItem[];
  /** Accessible name for the tab list, e.g. "Blooming details". */
  label: string;
  className?: string;
};

/**
 * Pill tabs (Figma "Product tabs": Overview / Solutions / Technology).
 * Arrow keys move between tabs; the active panel fades in (`.tab-panel` in globals.css).
 */
export function Tabs({ tabs, label, className }: TabsProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (i: number) => {
    const next = (i + tabs.length) % tabs.length;
    setActive(next);
    buttons.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight") select(i + 1);
    else if (e.key === "ArrowLeft") select(i - 1);
    else if (e.key === "Home") select(0);
    else if (e.key === "End") select(tabs.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div className={className}>
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-3">
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "h-11 rounded-full border px-6 font-display text-[13px] uppercase tracking-[0.12em] transition-colors",
                selected
                  ? "border-white/90 text-white"
                  : "border-white/15 text-white/55 hover:border-white/40 hover:text-white",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        key={active}
        role="tabpanel"
        id={`${baseId}-panel-${active}`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className="tab-panel mt-8"
      >
        {tabs[active].content}
      </div>
    </div>
  );
}
