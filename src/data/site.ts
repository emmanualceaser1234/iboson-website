import type { FooterColumn, NavLink } from "@/types/content";

export const siteConfig = {
  name: "iBoson",
  tagline: "Building what’s next",
  description:
    "iBoson brings together AI, software engineering and emerging technologies to build intelligent products that solve real-world challenges.",
  email: "info@iboson.io",
  copyright: "© 2026 iboson.io. All rights reserved.",
};

export const mainNav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

export const contactLink: NavLink = { label: "Contact us", href: "/contact" };

// TODO: replace "#" with the real social profile URLs.
export const socialLinks: NavLink[] = [
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
];

export const productLinks: NavLink[] = [
  { label: "Blooming", href: "/products#blooming" },
  { label: "Phoenix vu", href: "/products#phoenix-vu" },
  { label: "StarAlly", href: "/products#starally" },
  { label: "NoxVision", href: "/products#noxvision" },
  { label: "Lyks", href: "/products#lyks" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Refund & Cancellation", href: "/refund-and-cancellation" },
  { label: "Data Processing Agreement", href: "/data-processing-agreement" },
  { label: "CAN-SPAM Compliance", href: "/can-spam-compliance" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Quick link",
    links: [
      { label: "About", href: "/about" },
      { label: "Product", href: "/products" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
  { title: "Others", links: legalLinks },
  { title: "Products", links: productLinks },
  { title: "Social", links: socialLinks },
];
