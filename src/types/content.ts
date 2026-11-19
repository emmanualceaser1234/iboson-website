import type { ShapeName } from "@/components/particles/engine/shapes";

export type NavLink = { label: string; href: string };

export type FooterColumn = { title: string; links: NavLink[] };

export type CapabilityCard = {
  title: string;
  description: string;
  link: NavLink;
};

export type ProductHighlight = {
  slug: string;
  name: string;
  description: string;
  href: string;
  shape: ShapeName;
};

export type SolutionItem = {
  title: string;
  description: string;
  product: NavLink;
};

export type FaqItem = { question: string; answer: string };

export type ClientLogo = { name: string; src: string; width: number; height: number };

export type Stat = { value: string; label: string };

export type TeamMember = {
  name: string;
  role: string;
  /** Portrait in /public; omitted until the photo is supplied (a placeholder shows instead). */
  photo?: string;
};

export type Milestone = { year: string; title: string; description: string };

export type Award = {
  name: string;
  /** Laurel badge image in /public; omitted until supplied (the name shows as text instead). */
  image?: string;
};
