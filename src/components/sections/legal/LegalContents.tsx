"use client";

import { useEffect, useState } from "react";
import { SparkleIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { LegalSection } from "@/types/content";

/**
 * Sticky "Contents" card (Figma "Contents (sticky on scroll)"). Highlights the section
 * currently being read: the last section whose heading has passed the upper third of the screen.
 */
export function LegalContents({ sections }: { sections: Pick<LegalSection, "id" | "nav">[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.33;
      let current = sections[0]?.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    <nav
      aria-label="Contents"
      className="sticky top-[120px] rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-7 backdrop-blur-sm"
    >
      <p className="font-display text-xs uppercase tracking-[0.14em] text-gold">Contents</p>
      <ol className="mt-5 space-y-1">
        {sections.map((s, i) => {
          const isActive = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "flex items-center gap-3 py-1.5 font-display text-sm tracking-[0.02em] transition-colors",
                  isActive ? "text-white" : "text-white/60 hover:text-white",
                )}
              >
                <span className={cn("w-5 shrink-0 tabular-nums", isActive ? "text-gold" : "text-white/40")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{s.nav}</span>
                {isActive && <SparkleIcon className="size-3 shrink-0" />}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
