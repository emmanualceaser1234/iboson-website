"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
} from "react";

/* One IntersectionObserver shared by every <Reveal> on the page. */
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();

function observe(el: Element, onVisible: () => void) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
        callbacks.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );
  callbacks.set(el, onVisible);
  observer.observe(el);
  return () => {
    callbacks.delete(el);
    observer?.unobserve(el);
  };
}

type RevealProps<T extends ElementType> = {
  /** Element to render, e.g. "h2", "p", "span". Defaults to "div". */
  as?: T;
  /** Extra delay in steps of 100ms, for staggering siblings. */
  delay?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/**
 * Rises into place (fade + slide up) the first time it scrolls into view.
 * Visibility lives in React state, so server and client HTML always match on hydration.
 */
export function Reveal<T extends ElementType = "div">({ as, delay = 0, style, ...props }: RevealProps<T>) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observe(el, () => setVisible(true));
  }, []);

  const Tag: ElementType = as ?? "div";
  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-visible={visible ? "" : undefined}
      style={delay ? ({ ...style, "--reveal-delay": delay } as CSSProperties) : style}
      {...props}
    />
  );
}
