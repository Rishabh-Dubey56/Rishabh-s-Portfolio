"use client";

import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-void/80 backdrop-blur-xl border-b border-white/[0.04] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo / Monogram */}
        <a
          href="#hero"
          className="group flex items-center gap-2 relative z-50"
          aria-label="Back to top"
        >
          <span className="font-display text-xl font-bold tracking-tight text-ivory transition-colors group-hover:text-crimson">
            RD
          </span>
          <span className="hidden sm:inline-block h-4 w-px bg-graphite" />
          <span className="hidden sm:inline-block font-body text-xs text-steel tracking-widest uppercase">
            Portfolio
          </span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative px-4 py-2 font-body text-sm text-ash transition-colors duration-300 hover:text-ivory group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-crimson transition-all duration-300 group-hover:w-3/4" />
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a
              href="#contact"
              className="px-5 py-2 text-sm font-medium font-body rounded-full border border-crimson/40 text-crimson transition-all duration-300 hover:bg-crimson/10 hover:border-crimson/70"
            >
              Let&apos;s Talk
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className={`block w-6 h-[1.5px] bg-ivory transition-all duration-300 origin-center ${
              mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-ivory transition-all duration-300 ${
              mobileOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-ivory transition-all duration-300 origin-center ${
              mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
            }`}
          />
        </button>

        {/* Mobile overlay menu */}
        <div
          className={`fixed inset-0 bg-void/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
            mobileOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-3xl font-semibold text-ivory hover:text-crimson transition-colors duration-300"
              style={{
                transitionDelay: mobileOpen ? `${i * 75}ms` : "0ms",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.4s ease ${i * 75}ms, transform 0.4s ease ${i * 75}ms, color 0.3s ease`,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-8 py-3 text-lg font-medium font-body rounded-full border border-crimson text-crimson hover:bg-crimson/10 transition-all duration-300"
            style={{
              transitionDelay: mobileOpen ? `${NAV_LINKS.length * 75}ms` : "0ms",
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            Let&apos;s Talk
          </a>
        </div>
      </nav>
    </header>
  );
}
