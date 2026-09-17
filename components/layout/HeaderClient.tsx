"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import type { NavLink } from "@/lib/content";

interface HeaderClientProps {
  links: NavLink[];
  phoneDisplay: string;
  phone: string;
  ctaLabel: string;
}

export function HeaderClient({
  links,
  phoneDisplay,
  phone,
  ctaLabel,
}: HeaderClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b px-5 py-4 transition-[transform,background-color,border-color,backdrop-filter,padding] duration-450 ease-out will-change-transform md:px-8 lg:px-12 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "border-off-white/10 bg-fight-black/86 py-2.5 backdrop-blur-md"
          : "border-transparent bg-fight-black/0 py-4 backdrop-blur-0"
      }`}
    >
      <div className="eff-container flex items-center justify-between !px-0">
        <Link
          href="/"
          className="flex flex-col items-start leading-none"
          aria-label="Elite Fight Force home"
        >
          <span className="type-display-md italic tracking-normal text-off-white">
            EFF
          </span>
          <span className="type-caption mt-0.5 hidden italic tracking-[0.15em] sm:block">
            ELITE FIGHT FORCE
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.slice(0, 7).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="type-label text-off-white/80 transition-colors hover:text-off-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 type-label text-off-white/80 transition-colors hover:text-off-white"
          >
            <Phone className="size-3.5" aria-hidden />
            {phoneDisplay}
          </a>
          <Link
            href="/free-trial"
            className="bg-blood-red px-5 py-2.5 type-label text-off-white transition-colors hover:bg-hot-red"
          >
            {ctaLabel}
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="flex items-center gap-2 type-label text-off-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" aria-hidden />
            Menu
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full border-line bg-fight-black sm:max-w-sm"
          >
            <SheetHeader className="text-left">
              <SheetTitle className="flex flex-col items-start leading-none text-off-white">
                <span className="type-display-md italic tracking-normal">
                  EFF
                </span>
                <span className="type-caption mt-0.5 italic tracking-[0.15em] text-smoke">
                  ELITE FIGHT FORCE
                </span>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-6">
              {links.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="type-heading-md border-b border-line/60 py-4 text-off-white/90 transition-colors hover:text-blood-red"
                  style={{ transitionDelay: `${i * 20}ms` }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-4 px-6">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 type-label text-off-white/80"
              >
                <Phone className="size-3.5" aria-hidden />
                {phoneDisplay}
              </a>
              <Link
                href="/free-trial"
                onClick={() => setOpen(false)}
                className="bg-blood-red px-5 py-3.5 text-center type-label text-off-white"
              >
                {ctaLabel}
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
