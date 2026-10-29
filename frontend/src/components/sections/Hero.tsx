"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowDownRight, ExternalLink } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function Hero() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const rafId = useRef<number | null>(null);

  /* ── Subtle desktop mouse parallax ── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 1024) return;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;

      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      const xPercent = (clientX / rect.width - 0.5) * 2;
      const yPercent = (clientY / rect.height - 0.5) * 2;

      setParallax({
        x: Math.round(xPercent * 7 * 100) / 100,
        y: Math.round(yPercent * 6 * 100) / 100,
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] flex flex-col justify-between items-center overflow-hidden bg-transparent pt-20 pb-6 px-4 sm:px-6 md:px-10"
      aria-label="Hero section — Rishabh Dubey"
    >
      {/* ── Background Cinematic Rim Lights ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Left Crimson Aura */}
        <div
          className="absolute -left-28 top-1/4 w-[500px] h-[500px] rounded-full opacity-40 blur-[140px] animate-glow-pulse"
          style={{
            background: "radial-gradient(circle, #dc2626 0%, rgba(220,38,38,0.2) 50%, transparent 75%)",
            transform: `translate3d(${-parallax.x * 1.5}px, ${-parallax.y * 1.5}px, 0)`,
          }}
        />
        {/* Right Warm Amber Aura */}
        <div
          className="absolute -right-24 top-1/3 w-[480px] h-[480px] rounded-full opacity-30 blur-[140px] animate-glow-pulse-slow"
          style={{
            background: "radial-gradient(circle, #d97706 0%, rgba(217,119,6,0.2) 50%, transparent 75%)",
            transform: `translate3d(${parallax.x * 1.5}px, ${parallax.y * 1.5}px, 0)`,
          }}
        />
      </div>

      {/* ── Top Header Bar / Academic Radar Pill ── */}
      <div className="relative z-20 flex flex-col items-center gap-1.5 text-center pt-1 max-w-full px-2">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-white/[0.1] bg-void/80 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-ping shrink-0" />
          <span className="font-mono text-[10px] sm:text-xs tracking-wide sm:tracking-[0.22em] text-silver uppercase font-semibold">
            <span className="hidden sm:inline">B.Tech CSE (IBM) · United University, Prayagraj · 2024–2028 · 3rd Year</span>
            <span className="sm:hidden">B.Tech CSE (IBM) · 2024–2028 · 3rd Year</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-warm animate-ping shrink-0" />
        </div>
        <p className="font-mono text-[9px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.32em] text-steel uppercase font-medium">
          • Full-Stack Engineer & Creative Technologist •
        </p>
      </div>

      {/* ── Mobile/Tablet Headline (Visible strictly on screens < lg) ── */}
      <div className="relative z-20 w-full text-center lg:hidden select-none my-1">
        <h1 className="font-display font-black text-3xl sm:text-5xl md:text-7xl tracking-tight uppercase leading-[0.92]">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#ef4444] via-[#dc2626] to-[#b91c1c] drop-shadow-[0_0_35px_rgba(220,38,38,0.6)]">
            RISHABH
          </span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-ivory via-bone to-silver drop-shadow-[0_0_25px_rgba(249,250,251,0.25)]">
            DUBEY
          </span>
        </h1>
      </div>

      {/* ── Central Stage: Desktop Architectural Gate / Mobile Walking Vista ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-5 xl:gap-8 my-auto py-1">
        
        {/* Left Headline (Desktop only — lg and up) */}
        <div className="hidden lg:block lg:flex-1 text-right select-none">
          <h1 className="font-display font-black lg:text-[5.2rem] xl:text-[7rem] 2xl:text-[8.5rem] tracking-tight uppercase leading-[0.88]">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-[#ef4444] via-[#dc2626] to-[#b91c1c] drop-shadow-[0_0_45px_rgba(220,38,38,0.6)]">
              RISHABH
            </span>
          </h1>
        </div>

        {/* Central Walking Stage Corridor — Full-Body Authentic Portrait Cutout with Walking Cadence */}
        <div className="relative shrink-0 w-[220px] sm:w-[260px] md:w-[300px] lg:w-[310px] xl:w-[350px] h-[280px] sm:h-[340px] md:h-[380px] lg:h-[410px] xl:h-[450px] flex items-center justify-center pointer-events-none">
          {/* Volumetric ambient backlight behind portrait */}
          <div
            className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full opacity-45 blur-[75px] pointer-events-none animate-glow-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(220,38,38,0.7) 0%, rgba(217,119,6,0.3) 50%, transparent 70%)",
            }}
          />

          {/* Authentic Transparent Cutout with Walking Cadence, Bobbing & Parallax */}
          <div
            className="relative h-full aspect-[682/1024] flex items-center justify-center transition-transform duration-200 ease-out animate-walk-stride"
            style={{
              transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
            }}
          >
            <Image
              src="/images/hero-portrait.png"
              alt="Rishabh Dubey — Full-Stack Developer & Creative Technologist"
              fill
              priority
              sizes="(max-width: 768px) 240px, (max-width: 1200px) 300px, 360px"
              className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.98)] filter contrast-[1.04]"
            />
            {/* Ground contact shadow precisely anchoring white sneakers onto the 3D stage */}
            <div
              className="absolute inset-x-6 bottom-0 h-7 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 90%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 45%, transparent 75%)",
              }}
            />
          </div>
        </div>

        {/* Right Headline (Desktop only — lg and up) */}
        <div className="hidden lg:block lg:flex-1 text-left select-none">
          <div className="font-display font-black lg:text-[5.2rem] xl:text-[7rem] 2xl:text-[8.5rem] tracking-tight uppercase leading-[0.88]">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-ivory via-bone to-silver drop-shadow-[0_0_35px_rgba(249,250,251,0.25)]">
              DUBEY
            </span>
          </div>
        </div>

      </div>

      {/* ── Bottom Hero Section: Bio, Verified CTAs & Real-Time Beacon ── */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto w-full pt-1">
        
        {/* Core Statement */}
        <p className="font-body text-xs sm:text-sm text-ash leading-relaxed mb-3 max-w-xl px-2">
          Architecting high-performance digital platforms (<span className="text-ivory font-medium">Swadesh</span>, <span className="text-ivory font-medium">Fixora</span>) and exploring
          applied machine learning systems (<span className="text-ivory font-medium">MediNexus AI</span>) with clean type safety and
          cinematic spatial design.
        </p>

        {/* Primary Action Controls */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3.5 justify-center items-center mb-3">
          <a
            href="#projects"
            id="hero-cta-projects"
            className="group inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-crimson text-ivory font-body font-semibold text-xs sm:text-sm transition-all duration-300 hover:bg-blaze hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Explore Verified Projects</span>
            <ArrowDownRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </a>

          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/12 bg-void/70 text-bone font-body font-medium text-xs sm:text-sm transition-all duration-300 hover:border-amber-warm/60 hover:bg-amber-warm/10 hover:text-ivory hover:scale-[1.02] active:scale-[0.98]"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-warm" />
            <span>LinkedIn</span>
          </a>

          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/10 bg-void/70 text-ash font-body font-medium text-xs sm:text-sm transition-all duration-300 hover:border-white/25 hover:text-ivory hover:scale-[1.02]"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>

        {/* Real-time status pill */}
        <div className="flex items-center justify-center gap-2 text-[10px] sm:text-[11px] font-mono text-steel mb-2 px-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="hidden sm:inline">Currently in 3rd Year · Open to Engineering Roles & Summer 2026 Internships</span>
          <span className="sm:hidden">Open to Roles & Summer 2026 Internships</span>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity" aria-hidden="true">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-steel">
            Scroll Down
          </span>
          <div className="w-px h-6 bg-graphite/60 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-b from-crimson to-amber-warm animate-scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
