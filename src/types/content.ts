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

/** A titled line item: "How it works" step, "Where it helps" use case or "What powers it" tech. */
export type ProductPoint = { title: string; description: string };

export type ProductModule = {
  title: string;
  description: string;
  link?: NavLink;
  /** Shown instead of a link, e.g. "In design". */
  status?: string;
};

export type ProductDetail = {
  slug: string;
  name: string;
  eyebrow: string;
  tagline: string;
  overview: string;
  /** The problem it solves, shown with a sparkle under the overview. */
  problem: string;
  /** Blooming's "Inside Blooming" modules (shown instead of steps). */
  modules?: ProductModule[];
  steps?: ProductPoint[];
  solutions: ProductPoint[];
  technology: ProductPoint[];
  builtFor: string;
  website: string;
  shape: ShapeName;
};

export type BlogFilter = "all" | "product-updates" | "ai-agents" | "e-commerce" | "apple-dev" | "ar-vision";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** Category label shown above the title, e.g. "AR & computer vision". */
  category: string;
  /** ISO date, e.g. "2022-11-28". */
  date: string;
  /** Which filter chips the post appears under (it always appears under "All"). */
  tags: Exclude<BlogFilter, "all">[];
  href: string;
  /** Cover image in /public; omitted until supplied (a branded placeholder shows instead). */
  image?: string;
};

export type FeaturedPost = Omit<BlogPost, "date" | "tags" | "slug"> & { author: string };
