import { siteConfig } from "@/data/site";
import type { JobOpening } from "@/types/content";

/* Copy from Figma "Careers" (564:245673). */

export const careersHero = {
  outline: "Join",
  solid: "Our team",
  description:
    "Rediscover yourself and make a difference with innovation and technology. Build AI products with us at iBoson innovations.",
  cta: { label: "View open roles", href: "#open-roles" },
};

export const openings: JobOpening[] = [
  {
    title: "Application Developer – Android",
    description: "Experienced in native Android development. Build and ship mobile experiences for our products.",
    department: "Engineering",
    location: "Technopark, Trivandrum",
  },
  {
    title: "Front-end Developer",
    description: "Join our high-spirited technical team and build the interfaces of our AI products.",
    department: "Engineering",
    location: "Technopark, Trivandrum",
  },
];

export const openApplication = {
  title: "Don’t see your role?",
  description: "Send us your CV and tell us what you would like to build. We keep good profiles on file.",
  cta: { label: `Email ${siteConfig.email}`, href: `mailto:${siteConfig.email}` },
};

/** "Apply now" opens an email to the careers inbox with the role in the subject line. */
export const applyHref = (role: string) =>
  `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Application: ${role}`)}`;
