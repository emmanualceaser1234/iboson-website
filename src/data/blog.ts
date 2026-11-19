import type { BlogFilter, BlogPost, FeaturedPost } from "@/types/content";

/* Copy from Figma "Blog" (564:243878). */

export const blogIntro = {
  title: "Ideas & updates",
  description: "Product news, how-tos and lessons from building AI agents, AI video, developer tools and AR.",
};

// TODO: point at the article once blog post pages exist; add `image` once exported from Figma.
export const featuredPost: FeaturedPost = {
  category: "AR & computer vision",
  author: "iBoson team",
  title: "Introducing Nox: object detection SDK for the spatial computing era",
  excerpt:
    "A plug-and-play SDK for LiDAR-enabled iOS and Depth API Android devices that detects real-world objects with 3D spatial awareness.",
  href: "/products#noxvision",
};

export const blogFilters: { id: BlogFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "product-updates", label: "Product updates" },
  { id: "ai-agents", label: "AI agents" },
  { id: "e-commerce", label: "E-commerce" },
  { id: "apple-dev", label: "Apple dev" },
  { id: "ar-vision", label: "AR & vision" },
];

// TODO: the three launch-post summaries are drafts (Figma has "[Short summary…]" placeholders);
// links go to the product until article pages exist; add `image` paths once exported.
export const posts: BlogPost[] = [
  {
    slug: "introducing-blooming",
    title: "Introducing Blooming: Run marketing, sales and support with AI agents",
    excerpt: "One platform with ready-made agents for growth, a studio to build your own and controls to govern them all.",
    category: "Product updates",
    date: "2022-11-28",
    tags: ["product-updates", "ai-agents"],
    href: "/products#blooming",
  },
  {
    slug: "meet-lyks",
    title: "Meet Lyks: AI product video made from your Shopify store",
    excerpt: "Turn any product in your catalog into UGC-style and cinematic videos, with no camera, editing or production team.",
    category: "E-commerce",
    date: "2022-11-18",
    tags: ["e-commerce", "product-updates"],
    href: "/products#lyks",
  },
  {
    slug: "phoenix-vu",
    title: "Phoenix vu: An AI coding agent that works inside Xcode",
    excerpt: "A macOS-native agent that writes, builds and fixes Swift code beside Xcode, and waits for your approval.",
    category: "Apple development",
    date: "2022-09-22",
    tags: ["apple-dev", "ai-agents", "product-updates"],
    href: "/products#phoenix-vu",
  },
  {
    slug: "ar-offshore-marine",
    title: "The benefits of AR in offshore and marine applications",
    excerpt: "How AR helps offshore and marine teams work more safely in tough conditions.",
    category: "AR & computer vision",
    date: "2022-11-28",
    tags: ["ar-vision"],
    href: "#",
  },
  {
    slug: "ar-physical-experiences",
    title: "The role of AR in creating physical experiences",
    excerpt: "How AR blends physical and digital worlds into experiences customers remember.",
    category: "AR & computer vision",
    date: "2022-11-18",
    tags: ["ar-vision"],
    href: "#",
  },
  {
    slug: "aging-workforce-digital-transformation",
    title: "How to solve aging workforce problem with digital transformation",
    excerpt: "How digital tools help industrial teams keep skills as experienced workers retire.",
    category: "Industry",
    date: "2022-09-22",
    tags: [],
    href: "#",
  },
];
