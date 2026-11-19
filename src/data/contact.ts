import { siteConfig, socialLinks } from "@/data/site";
import type { FaqItem, NavLink } from "@/types/content";

/* Copy from Figma "Contact" (564:247018). */

export const contactIntro = {
  title: "Let’s talk",
  description: "Get in touch with iBoson about our products, a custom project or careers.",
};

export const contactEmail = siteConfig.email;

export const offices = [
  {
    label: "India · Headquarters",
    address: "CDAC ACE 1, 3rd Floor, CDAC Building, Technopark Campus, Kazhakootam, Trivandrum, Kerala 695581",
  },
  {
    label: "United Kingdom",
    address: "The Profile West, 950 Great West Road, Brentford TW8 9ES, Middlesex",
  },
];

/** Figma lists LinkedIn first on this page. */
export const followLinks: NavLink[] = ["LinkedIn", "Facebook", "Instagram", "Twitter"].map(
  (label) => socialLinks.find((l) => l.label === label) ?? { label, href: "#" },
);

export const contactTopics = [
  "Blooming",
  "StarAlly",
  "PhoenixVu",
  "NoxVision",
  "Lyks",
  "Custom project",
  "Careers",
  "Something else",
];

// Question 1's answer is from Figma; 2–6 are drafts (Figma has questions only).
export const contactFaqs: FaqItem[] = [
  {
    question: "How can I get in touch with iBoson?",
    answer:
      "You can reach us by filling out the contact form on this page or using the email and contact details provided on our website. Share your requirements, and our team will get back to you.",
  },
  {
    question: "Can I request a demo of your products?",
    answer:
      "Yes. Pick the product in the form above or email info@iboson.io, and we will set up a walkthrough at a time that suits you.",
  },
  {
    question: "Can I discuss a custom software project with your team?",
    answer:
      "Yes. Choose “Custom project” in the form and tell us about the problem you want to solve. We design and build AI and AR solutions using the same technology behind our products.",
  },
  {
    question: "How can I get help with an iBoson product?",
    answer:
      "Choose the product in the form above or email info@iboson.io with a short description of what you need, and our team will get back to you.",
  },
  {
    question: "Are there any job opportunities at iBoson?",
    answer: "We hire for engineering and product roles from time to time. See the Careers page for current openings.",
  },
  {
    question: "How can I apply for a job at iBoson?",
    answer:
      "Use “Apply now” on the Careers page, or send your CV to info@iboson.io and tell us what you would like to build.",
  },
];
