import type { Award, Milestone, Stat, TeamMember } from "@/types/content";

/* Copy from Figma "About" (564:239576). */

export const aboutHero = {
  outline: "About",
  solid: "iBoson",
  description:
    "A deep-tech AI company at Technopark, Trivandrum, building AI products for businesses, e-commerce stores, Apple developers and AR developers.",
};

export const vision =
  "A world where every business and every developer works with an AI partner that gets the job done.";

export const mission = "To build intelligent technology that turns complex work into simple, reliable outcomes.";

export const stats: Stat[] = [
  { value: "4+", label: "Products" },
  { value: "3", label: "SDK platforms" },
  { value: "6", label: "Technology areas" },
  { value: "40+", label: "AI agents" },
];

// TODO: add `photo` paths once the portraits are exported from Figma (image 424).
export const team: TeamMember[] = [
  { name: "Vishnu J P", role: "Founder & CEO" },
  { name: "Jijo J S", role: "Chief Technology Officer" },
  { name: "Atul Vasudev", role: "Director of Engineering" },
  { name: "Dr. Brijesh", role: "Lead Innovator" },
];

export const milestones: Milestone[] = [
  {
    year: "2016",
    title: "Company founded",
    description: "Started our journey with a vision for innovative technology.",
  },
  {
    year: "2018",
    title: "First product",
    description: "Developed UniteAR, our flagship augmented reality platform.",
  },
  {
    year: "2022",
    title: "New office at CDAC",
    description: "Moved into our new workspace at the CDAC building.",
  },
  {
    year: "2024",
    title: "AI & Wearables",
    description: "Shifted focus towards AI and wearable technologies.",
  },
  {
    year: "2026",
    title: "5+ AI products",
    description: "Expanded our portfolio with multiple AI-powered products.",
  },
];

// From the Figma "Awards" strip; `lines` are the line breaks used on each laurel badge.
// To use exported badge images instead, add `image` paths.
export const awards: Award[] = [
  { name: "Global Entrepreneur Program", lines: ["Global", "Entrepreneur", "Program"] },
  { name: "Microsoft Startup Program", lines: ["Microsoft", "Startup", "Program"] },
  { name: "Innovative Startup Award", lines: ["Innovative", "Startup", "Award"] },
  {
    name: "Entrepreneur India startup Awards Winner",
    lines: ["Entrepreneur", "India startup", "Awards Winner"],
  },
  { name: "National Startup Awards finalist", lines: ["National", "Startup", "Awards finalist"] },
  { name: "Nvidia Inception Program", lines: ["Nvidia", "Inception", "Program"] },
  { name: "Government Hackathon Winner", lines: ["Government", "Hackathon", "Winner"] },
  { name: "National Startup Finalist", lines: ["National Startup", "Finalist"] },
  { name: "Singularity University Selection", lines: ["Singularity", "University", "Selection"] },
  { name: "IIM Bangalore Incubation", lines: ["IIM Bangalore", "Incubation"] },
];
