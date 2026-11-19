"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/** A run of text with its own styling, e.g. the outlined word of a section title. */
export type TextSegment = string | { text: string; className?: string };

/* One IntersectionObserver shared by every <TextReveal>. Unlike <Reveal> it fires both ways:
   text animates in each time it scrolls into view and resets once fully out of view. */
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, (visible: boolean) => void>();
const ENTER_RATIO = 0.2;

function observe(el: Element, onChange: (visible: boolean) => void) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const cb = callbacks.get(entry.target);
        if (!cb) continue;
        if (!entry.isIntersecting) cb(false);
        else if (entry.intersectionRatio >= ENTER_RATIO) cb(true);
      }
    },
    { threshold: [0, ENTER_RATIO] },
  );
  callbacks.set(el, onChange);
  observer.observe(el);
  return () => {
    callbacks.delete(el);
    observer?.unobserve(el);
  };
}

/** Longest the letter cascade may take, so long paragraphs don't crawl in. */
const MAX_CASCADE_MS = 900;
const STAGGER_MS = 35;

type TextRevealProps<T extends ElementType> = {
  /** Element to render, e.g. "h2", "p", "span". Defaults to "p". */
  as?: T;
  /** The text, or several styled segments. A segment of "\n" becomes a line break. */
  text: TextSegment | TextSegment[];
  /** Extra delay before the first letter, in steps of 100ms. */
  delay?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

/**
 * Letter-by-letter text reveal: each letter fades up out of a blur, one after another,
 * every time the text scrolls into view. Screen readers get the plain text from a
 * visually hidden copy; the letter spans are aria-hidden.
 */
export function TextReveal<T extends ElementType = "p">({
  as,
  text,
  delay = 0,
  style,
  ...props
}: TextRevealProps<T>) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observe(el, setVisible);
  }, []);

  const segments = (Array.isArray(text) ? text : [text]).map((s) =>
    typeof s === "string" ? { text: s, className: undefined } : s,
  );
  const label = segments.map((s) => s.text).join(" ").replace(/\s+/g, " ").trim();
  const letterCount = label.replace(/\s/g, "").length;
  const stagger = Math.min(STAGGER_MS, MAX_CASCADE_MS / Math.max(1, letterCount));

  let index = 0;
  const renderWords = (value: string): ReactNode[] =>
    value.split(/(\s+)/).map((word, w) => {
      if (!word) return null;
      if (/^\s+$/.test(word)) return <Fragment key={w}> </Fragment>;
      return (
        <span key={w} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, c) => (
            <span key={c} className="text-reveal-char" style={{ "--i": index++ } as CSSProperties}>
              {char}
            </span>
          ))}
        </span>
      );
    });

  const Tag: ElementType = as ?? "p";
  return (
    <Tag
      ref={ref}
      data-text-reveal=""
      data-visible={visible ? "" : undefined}
      style={
        {
          ...style,
          "--tr-stagger": `${stagger}ms`,
          "--tr-delay": `${delay * 100}ms`,
        } as CSSProperties
      }
      {...props}
    >
      <span className="sr-only">{label}</span>
      {segments.map((seg, s) =>
        seg.text === "\n" ? (
          <br key={s} />
        ) : (
          <Fragment key={s}>
            {s > 0 && segments[s - 1].text !== "\n" && !seg.className?.includes("block") && " "}
            <span aria-hidden="true" className={seg.className}>
              {renderWords(seg.text)}
            </span>
          </Fragment>
        ),
      )}
    </Tag>
  );
}
