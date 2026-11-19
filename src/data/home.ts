import type {
  CapabilityCard,
  ClientLogo,
  FaqItem,
  ProductHighlight,
  SolutionItem,
} from "@/types/content";

export const hero = {
  outline: "Building",
  solid: ["What’s", "Next"],
  description:
    "We believe in making advanced technology more accessible, practical, and impactful through intelligent products and solutions.",
};

export const statement =
  "We bring innovative ideas to life through AI and emerging technologies, creating solutions that make a meaningful difference.";

export const capabilities: CapabilityCard[] = [
  {
    title: "AI Agents & Automation",
    description:
      "AI agents that run marketing, sales and support, with Studio to build them and Control to govern them.",
    link: { label: "Explore Blooming", href: "/products#blooming" },
  },
  {
    title: "AI-Powered Software Development",
    description:
      "An AI coding agent inside Xcode that writes code, builds, fixes errors and waits for your approval.",
    link: { label: "Explore Phoenix vu", href: "/products#phoenix-vu" },
  },
  {
    title: "AR & Computer Vision",
    description:
      "Real-time 3D object recognition that turns physical objects into interactive AR experiences.",
    link: { label: "Explore NoxVision", href: "/products#noxvision" },
  },
  {
    title: "Custom Technology Solutions",
    description:
      "Tailored AI, AR and product engineering for teams with a specific problem to solve.",
    link: { label: "Discuss your project", href: "/contact" },
  },
];

// "Visit website" currently points at the Products page sections.
// TODO: swap in each product's external website URL when available.
export const productHighlights: ProductHighlight[] = [
  {
    slug: "blooming",
    name: "Blooming",
    description:
      "Brings multiple business products together in one connected platform to simplify operations, automate workflows, and manage intelligent agents.",
    href: "/products#blooming",
    shape: "sphere",
  },
  {
    slug: "phoenix-vu",
    name: "Phoenix vu",
    description:
      "An advanced AI coding assistant built for Apple developers, helping them write code, fix errors, and build better apps directly within Xcode.",
    href: "/products#phoenix-vu",
    shape: "code",
  },
  {
    slug: "starally",
    name: "StarAlly",
    description:
      "An AI personal assistant that handles everyday tasks across websites, emails, calendars, and your phone, with your approval at every important step.",
    href: "/products#starally",
    shape: "plane",
  },
  {
    slug: "noxvision",
    name: "NoxVision",
    description:
      "An AR and computer vision SDK that enables real-time 3D object recognition, transforming physical objects into interactive augmented reality experiences.",
    href: "/products#noxvision",
    shape: "cube",
  },
];

export const technologies = [
  "AI/ML",
  "AI Agents",
  "AR/MR",
  "Computer Vision",
  "Spatial Computing",
  "Cloud & Product Engineering",
];

// Only the first item's copy exists in Figma; items 2–5 are draft copy to review.
export const solutions: SolutionItem[] = [
  {
    title: "Enterprise & Business Services",
    description:
      "Automate business workflows and improve operational efficiency with intelligent solutions.",
    product: { label: "Blooming - AI Agent Studio", href: "/products#blooming" },
  },
  {
    title: "Personal Productivity & Lifestyle",
    description:
      "Hand off everyday tasks like bookings, bills and email to an AI assistant that asks before anything is paid.",
    product: { label: "StarAlly - AI Personal Assistant", href: "/products#starally" },
  },
  {
    title: "Manufacturing & Industrial",
    description:
      "Identify machine parts, guide workers and show repair steps in AR, all from a phone camera.",
    product: { label: "NoxVision - AR & Computer Vision", href: "/products#noxvision" },
  },
  {
    title: "Software & Technology",
    description:
      "Write, build and fix Apple platform apps faster with an AI coding agent that works inside Xcode.",
    product: { label: "Phoenix vu - AI Coding Agent", href: "/products#phoenix-vu" },
  },
  {
    title: "Retail & E-Commerce",
    description:
      "Turn your Shopify catalog into AI UGC and cinematic product videos without a production team.",
    product: { label: "Lyks - AI Video for E-commerce", href: "/products#lyks" },
  },
];

// Placeholder logos cut from the Figma render — replace with exports from Figma.
export const clients: ClientLogo[] = [
  // width/height = display size at desktop (Figma scale)
  { name: "Tallinn", src: "/clients/tallinn.png", width: 100, height: 25 },
  { name: "INNVIT", src: "/clients/innvit.png", width: 107, height: 25 },
  { name: "Araneta Group", src: "/clients/araneta-group.png", width: 222, height: 44 },
  { name: "Gallinea", src: "/clients/gallinea.png", width: 146, height: 48 },
  { name: "NOVA6", src: "/clients/nova6.png", width: 142, height: 41 },
  { name: "Buttercup Learning", src: "/clients/buttercup.png", width: 153, height: 36 },
  { name: "Inspiron Tech", src: "/clients/inspiron-tech.png", width: 126, height: 53 },
];

// Only the first answer exists in Figma; answers 2–6 are draft copy to review.
export const homeFaqs: FaqItem[] = [
  {
    question: "What does iBoson do?",
    answer:
      "iBoson builds innovative software products and digital solutions that help businesses and individuals simplify their work, automate everyday tasks, and make better use of technology.",
  },
  {
    question: "What products does iBoson offer?",
    answer:
      "Blooming (AI agents for business), Phoenix vu (an AI coding agent for Xcode), StarAlly (an AI personal assistant), NoxVision (an AR and computer vision SDK) and Lyks (AI product videos for Shopify).",
  },
  {
    question: "How can iBoson products help my business?",
    answer:
      "They take repetitive work off your team: AI agents handle marketing, sales and support, while our AR and video tools help you show products in new ways.",
  },
  {
    question: "Which industries can benefit from your solutions?",
    answer:
      "Business services, retail and e-commerce, manufacturing and industrial teams, software development and anyone looking to save time on everyday tasks.",
  },
  {
    question: "Do your solutions suit small businesses and startups?",
    answer:
      "Yes. Most of our products are ready to use without a technical team, and they scale as your business grows.",
  },
  {
    question: "How can I learn more about your products?",
    answer:
      "Visit the Products page for details on each product, or contact us and our team will walk you through what fits your needs.",
  },
];
