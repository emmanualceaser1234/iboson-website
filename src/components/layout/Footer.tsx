import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowUpIcon } from "@/components/ui/icons";
import { footerColumns, siteConfig } from "@/data/site";
import { BottomGlow } from "./Glow";

export function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden pb-8 pt-10">
      <BottomGlow />
      <Container size="wide" className="relative">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-y-0 md:border-b-0">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="border-b border-line pb-3 font-display text-xl text-white">{column.title}</h2>
              <ul className="mt-5 space-y-[9px]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-base text-white/75 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-between gap-4 md:px-24">
          <p className="font-body text-sm text-white/50">{siteConfig.copyright}</p>
          <a
            href="#top"
            className="flex items-center gap-1.5 font-body text-sm text-white/50 transition-colors hover:text-white"
          >
            Back to Top
            <ArrowUpIcon className="size-4" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
