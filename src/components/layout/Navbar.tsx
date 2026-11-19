"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { contactLink, mainNav } from "@/data/site";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled || menuOpen ? "bg-black/60 backdrop-blur-[13px]" : "bg-transparent",
        )}
      >
        <Container size="wide" className="flex h-[72px] items-center justify-between md:h-[94px]">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-5 md:flex">
            <ul className="flex items-center gap-6">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "font-display text-lg leading-8 text-white transition-colors hover:text-gold",
                      isActive(item.href) ? "font-medium" : "font-normal",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button href={contactLink.href}>{contactLink.label}</Button>
          </nav>

          <button
            type="button"
            className="-mr-2 grid size-11 place-items-center text-white md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </Container>
      </header>

      {/* Mobile menu — kept outside <header> so its backdrop-filter doesn't trap this fixed panel. */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 bottom-0 top-[72px] z-40 bg-black/95 backdrop-blur-[13px] transition-opacity duration-300 md:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        inert={!menuOpen}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-2 px-5 pt-8">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="border-b border-line py-4 font-display text-3xl uppercase text-white"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-8" onClick={closeMenu}>
            <Button href={contactLink.href}>{contactLink.label}</Button>
          </div>
        </nav>
      </div>
    </>
  );
}
