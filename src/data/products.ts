import type { ProductDetail } from "@/types/content";

/* Copy from Figma "Products" (564:241774) and "Components — Product tabs". */

export const productsIntro = {
  outline: "Our",
  solid: "Products",
};

export const customCta = {
  solid: "Need something",
  outline: "custom?",
  text: "We design and build AI and AR solutions around your problem, using the same technology behind our products.",
  cta: { label: "Talk to our team", href: "/contact" },
};

// TODO: confirm the product website URLs ("#" until known).
export const products: ProductDetail[] = [
  {
    slug: "blooming",
    name: "Blooming",
    eyebrow: "AI for business",
    tagline: "Run, build and govern your business with AI agents.",
    overview:
      "Blooming is the AI platform for businesses. Growth runs marketing, sales and support with ready-made agents. Studio builds custom agents. Control monitors and governs every agent.",
    problem: "Most businesses juggle 8 to 12 tools that never talk to each other.",
    modules: [
      {
        title: "Growth",
        description: "Five products, one login.",
        link: { label: "blooming.sh", href: "https://blooming.sh" },
      },
      {
        title: "Studio",
        description: "AI agents without code.",
        link: { label: "aiagents.dev", href: "https://aiagents.dev" },
      },
      { title: "Control", description: "Approvals and budgets.", status: "In design" },
    ],
    solutions: [
      {
        title: "Marketing agencies",
        description: "Manage every client brand in its own workspace, with its own agents, data and brand voice.",
      },
      {
        title: "SMBs and business owners",
        description: "Put marketing, sales and support on autopilot with ready-made AI agents.",
      },
      {
        title: "E-commerce and D2C",
        description: "Run campaigns and support from one place, with Shopify integration included.",
      },
      {
        title: "Banking and sales teams",
        description: "Qualify leads by call or chat and update the CRM automatically.",
      },
    ],
    technology: [
      { title: "AI agents", description: "Agents that handle conversations, qualify leads and follow up, 24/7." },
      { title: "AI / ML", description: "Brand Voice AI, lead insights and AI-suggested support replies." },
      { title: "Voice & messaging", description: "Call agents, plus WhatsApp and SMS agents." },
      { title: "Cloud", description: "One shared database, automation engine and AI memory." },
    ],
    builtFor: "SMBs and agencies",
    website: "https://blooming.sh",
    shape: "sphere",
  },
  {
    slug: "phoenix-vu",
    name: "Phoenix vu",
    eyebrow: "AI for Apple developers",
    tagline: "The AI coding agent built for Xcode.",
    overview:
      "A macOS-native AI coding agent for iOS, iPadOS, macOS, watchOS, tvOS and visionOS. It runs as a sidebar next to Xcode, so there is no window switching or copy-pasting.",
    problem: "General AI assistants do not understand Xcode, Swift or Apple frameworks.",
    steps: [
      { title: "Open beside Xcode", description: "No window switching or copy-pasting." },
      { title: "Ask in plain words", description: "It reads your files and the project." },
      { title: "Writes and builds", description: "It fixes errors until the build passes." },
      { title: "You approve", description: "Every change is shown as a diff." },
    ],
    solutions: [
      { title: "Apple app development", description: "Ship iOS, iPadOS, macOS, watchOS, tvOS and visionOS apps faster." },
      { title: "Development teams", description: "Spend less time on boilerplate and build errors, more on the product." },
      {
        title: "Long-running projects",
        description: "Project-aware memory remembers past conversations each time you reopen a project.",
      },
    ],
    technology: [
      { title: "AI agents", description: "An autonomous loop: write, build, detect errors, fix and rebuild." },
      { title: "Mixture of models", description: "Each task goes to the AI model best suited for it." },
      { title: "Swift & Apple SDKs", description: "Understands Swift, SwiftUI, UIKit, AppKit and Xcode builds." },
      { title: "Private by design", description: "Project data stays on your Mac. No code kept on our servers." },
    ],
    builtFor: "Apple developers and teams",
    website: "#",
    shape: "code",
  },
  {
    slug: "starally",
    name: "StarAlly",
    eyebrow: "AI personal assistant",
    tagline: "An Autonomous Personal Assistant you Text.",
    overview:
      "StarAlly is an autonomous AI personal assistant that takes care of your everyday tasks through simple text messages or calls. You only make the choices that are truly yours, and say yes before anything is paid.",
    problem: "Everyday tasks still require navigating multiple websites and filling forms.",
    steps: [
      { title: "Ask", description: "Text or send a voice note, in your own words." },
      { title: "It does the work", description: "Signs in, searches and compares on the provider’s own site." },
      { title: "You say yes", description: "Nothing is booked or paid without your yes." },
      { title: "It follows up", description: "Saves bookings, sets reminders, tracks refunds." },
    ],
    solutions: [
      { title: "Food and dining", description: "Books tables, orders food and groceries, and reorders “my usual”." },
      {
        title: "Travel",
        description: "Finds and books flights, hotels and trains on their own sites, picks seats and checks you in.",
      },
      { title: "Tickets and appointments", description: "Books movies, events and doctor visits, and watches for earlier slots." },
      { title: "Email and calendar", description: "Sorts mail, drafts replies and finds free times, with Gmail and Google Calendar." },
      { title: "Bills and subscriptions", description: "Pays bills, cancels subscriptions and tracks refunds until they arrive." },
      {
        title: "Trip plans and alerts",
        description: "Builds a day-by-day trip page and texts you about check-in, delays and gate changes.",
      },
    ],
    technology: [
      {
        title: "AI agents + secure browser",
        description: "Works on the provider’s own website and never gets around its security checks.",
      },
      {
        title: "Encrypted vault",
        description: "Logins, cards and passport details are typed into the site. The AI never sees them.",
      },
      { title: "Memory", description: "Remembers your preferences, people and plans. See, edit or delete it anytime." },
      {
        title: "Voice, calls & languages",
        description: "Understands voice notes, calls that always say it is an AI, replies in your language.",
      },
    ],
    builtFor: "Busy people, starting in India and the US",
    website: "#",
    shape: "plane",
  },
  {
    slug: "noxvision",
    name: "NoxVision",
    eyebrow: "AR and computer vision",
    tagline: "Real-time 3D object recognition SDK for AR apps.",
    overview:
      "Upload a 3D model, add the SDK and detect real objects in real time. No custom AI training or labelling. Turn real objects into interactive AR experiences.",
    problem: "Object recognition usually means collecting data and training models.",
    steps: [
      { title: "Scan", description: "Use an app like Polycam or Luma AI." },
      { title: "Upload", description: "Add your .glb, .ply or .obj file." },
      { title: "Add the SDK", description: "For Android, iOS or Unity." },
      { title: "Point the camera", description: "Your AR content appears on the object." },
    ],
    solutions: [
      {
        title: "Manufacturing and field service",
        description: "Guide workers, inspect tools and identify machine parts with a phone camera.",
      },
      { title: "Education and training", description: "Make physical objects part of interactive learning with AR guides." },
      { title: "Maintenance and support", description: "Scan equipment to show part IDs, repair steps and manuals on site." },
      { title: "AR and XR products", description: "Build retail, education and industrial AR apps on top of real objects." },
    ],
    technology: [
      { title: "Computer vision", description: "Real-time 3D object recognition from a phone camera." },
      { title: "AR / MR", description: "AR content placed on the recognized real object." },
      { title: "Spatial computing", description: "Understands objects as 3D shapes, not flat images." },
      { title: "Cloud", description: "Private model storage, accessible only with your credentials." },
    ],
    builtFor: "AR developers, industrial teams, educators",
    website: "#",
    shape: "cube",
  },
  {
    slug: "lyks",
    name: "Lyks",
    eyebrow: "AI video for e-commerce",
    tagline: "AI UGC and cinematic videos for Shopify stores.",
    overview:
      "A Shopify-native app that turns your products into AI UGC-style and cinematic videos, straight from your store. No camera, no editing and no production team.",
    problem: "Short-form video sells, but most stores have no production team.",
    steps: [
      { title: "Connect store", description: "Your catalog comes in automatically." },
      { title: "Pick a product", description: "AI reads its images and details." },
      { title: "Edit the script", description: "Review it before anything is made." },
      { title: "Generate", description: "Get 9:16 videos for TikTok, Reels and Shorts." },
    ],
    solutions: [
      { title: "E-commerce and D2C", description: "Create product videos for your whole catalog without a production team." },
      { title: "Social commerce", description: "Post-ready vertical videos for TikTok, Instagram Reels and YouTube Shorts." },
      { title: "Product launches", description: "Test several video angles for a new product before you spend on ads." },
    ],
    technology: [
      { title: "Generative AI", description: "AI avatars with natural speech and lip-sync, plus cinematic product motion." },
      { title: "AI / ML", description: "AI script writing from your product title, description and images." },
      { title: "Cloud", description: "A Shopify-native app with a prepaid wallet: pay for what you generate." },
    ],
    builtFor: "Shopify merchants, D2C brands",
    website: "#",
    shape: "like",
  },
];
