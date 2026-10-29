"use client";

import { useState } from "react";
import {
  ExternalLink,
  Sparkles,
  Layers,
  Cpu,
  Box,
  CheckCircle2,
} from "lucide-react";
import { PROJECTS_DATA } from "@/lib/constants";
import type { Project } from "@/types";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  const getCategoryIcon = (category: Project["category"]) => {
    switch (category) {
      case "ai":
        return <Cpu className="w-3.5 h-3.5 text-crimson" />;
      case "webgl":
        return <Box className="w-3.5 h-3.5 text-amber-warm" />;
      case "fullstack":
      default:
        return <Layers className="w-3.5 h-3.5 text-silver" />;
    }
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen flex items-center py-28 overflow-hidden bg-transparent"
      aria-label="Projects section"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute left-1/4 top-1/4 w-[550px] h-[550px] opacity-[0.06] blur-[150px]"
          style={{ background: "radial-gradient(circle, #dc2626 0%, transparent 70%)" }}
        />
        <div
          className="absolute right-10 bottom-1/4 w-[450px] h-[450px] opacity-[0.05] blur-[130px]"
          style={{ background: "radial-gradient(circle, #d97706 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-crimson" />
              <span className="font-mono text-xs tracking-[0.28em] uppercase text-crimson font-medium">
                03 — Featured Systems & Architecture
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2.5 mb-4">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-ivory tracking-tight uppercase">
                Featured Systems
              </h2>
              <span className="font-display italic text-amber-warm text-xl sm:text-2xl font-light">
                & Spatial Platforms
              </span>
            </div>
            <div className="section-divider" />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Works" },
              { id: "fullstack", label: "Full-Stack Web" },
              { id: "ai", label: "AI & Healthcare" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-crimson text-ivory font-semibold shadow-[0_0_20px_rgba(220,38,38,0.3)] border border-crimson"
                    : "bg-void/80 border border-white/[0.08] text-steel hover:text-ivory hover:border-white/[0.18]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Showcase — Asymmetrical Editorial Layout */}
        <div className="space-y-10">
          {/* 1. Flagship Showcase: Swadesh (when included in filter) */}
          {filteredProjects.find((p) => p.id === "swadesh") && (
            <article className="card p-7 md:p-10 relative overflow-hidden group transition-all duration-500 hover:border-crimson/40 hover:shadow-[0_25px_60px_-15px_rgba(220,38,38,0.2)]">
              {/* Volumetric background glow */}
              <div
                className="absolute -right-20 -top-20 w-[450px] h-[450px] rounded-full opacity-20 blur-[120px] pointer-events-none group-hover:opacity-35 transition-opacity duration-700"
                style={{ background: "radial-gradient(circle, #dc2626 0%, transparent 70%)" }}
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left: Project Narrative & Meta */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-crimson/15 border border-crimson/30 text-crimson font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-crimson" />
                      <span>Flagship Production Platform</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>Live on Vercel</span>
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-xs text-steel uppercase tracking-widest block mb-1">
                      Platform 01
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-ivory tracking-tight mb-2">
                      Swadesh
                    </h3>
                    <p className="font-display text-base sm:text-lg text-amber-warm font-medium">
                      Indian Culture, Crafts & Regional Heritage Platform
                    </p>
                  </div>

                  <p className="font-body text-base text-ash leading-relaxed">
                    A digital platform built to spotlight authentic Indian heritage,
                    cultural diversity, and local indigenous artisans, connecting regional creators
                    with an appreciative digital audience.
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                      <span className="font-body text-xs sm:text-sm text-silver">
                        Modern editorial interface celebrating Indian culture and regional artisan crafts
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                      <span className="font-body text-xs sm:text-sm text-silver">
                        Fast page loads and responsive cross-device layout deployed on Vercel
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                      <span className="font-body text-xs sm:text-sm text-silver">
                        Interactive cultural guides and rich multimedia exploration
                      </span>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"].map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-lg bg-void/80 border border-white/[0.08] text-steel text-xs font-mono font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-white/[0.06]">
                    <a
                      href="https://swadeshindia.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-crimson text-ivory font-body font-semibold text-sm transition-all duration-300 hover:bg-blaze hover:shadow-[0_0_25px_rgba(220,38,38,0.4)]"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open Live Platform</span>
                    </a>

                    <a
                      href="https://github.com/Rishabh-Dubey56"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.1] bg-white/[0.02] text-ash hover:text-ivory hover:border-white/[0.2] transition-colors text-xs font-mono"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>Repository</span>
                    </a>
                  </div>
                </div>

                {/* Right: Architectural Showcase Preview */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-charcoal/90 to-void/90 p-5 shadow-2xl overflow-hidden group/preview">
                    {/* Browser Chrome Header */}
                    <div className="flex items-center gap-2 pb-3 mb-4 border-b border-white/[0.06]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-crimson/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-warm/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                      </div>
                      <div className="flex-1 mx-2 px-3 py-1 rounded-md bg-void/60 border border-white/[0.05] text-[10px] font-mono text-steel truncate">
                        https://swadeshindia.vercel.app
                      </div>
                    </div>

                    {/* Architectural Wireframe Mock */}
                    <div className="space-y-3.5">
                      <div className="h-28 rounded-xl bg-gradient-to-r from-ember/30 via-smoke to-charcoal border border-white/[0.04] p-4 flex flex-col justify-end">
                        <span className="font-mono text-[10px] text-amber-warm uppercase tracking-widest">
                          Artisan Heritage Showcase
                        </span>
                        <span className="font-display text-lg font-bold text-ivory">
                          Swadesh India
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                          <span className="font-mono text-[9px] text-steel uppercase block mb-1">Regional Crafts</span>
                          <span className="font-body text-xs text-silver font-medium">Textiles & Pottery</span>
                        </div>
                        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                          <span className="font-mono text-[9px] text-steel uppercase block mb-1">Architecture</span>
                          <span className="font-body text-xs text-silver font-medium">Next.js & Vercel</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-crimson/5 border border-crimson/15 flex items-center justify-between">
                        <span className="font-mono text-[11px] text-silver">Status: Deployed & Active</span>
                        <ExternalLink className="w-3.5 h-3.5 text-crimson" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* 2. Secondary Systems Grid (Fixora, MediNexus AI, WikiClub Tech UU) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects
              .filter((p) => p.id !== "swadesh")
              .map((project) => (
                <article
                  key={project.id}
                  className="card p-6 md:p-7 flex flex-col justify-between group transition-all duration-500 hover:border-amber-warm/35 hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(217,119,6,0.15)]"
                >
                  <div>
                    {/* Top Tag & Category */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-void border border-white/[0.08] text-silver">
                        {getCategoryIcon(project.category)}
                        <span className="uppercase tracking-wider">{project.category}</span>
                      </span>

                      {project.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-warm/15 border border-amber-warm/30 text-amber-warm">
                          <Sparkles className="w-2.5 h-2.5" />
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Title & Tagline */}
                    <h4 className="font-display text-xl font-bold text-ivory mb-1 group-hover:text-amber-warm transition-colors duration-300">
                      {project.title}
                    </h4>

                    {project.tagline && (
                      <p className="font-body text-xs font-semibold text-amber-warm/90 mb-3">
                        {project.tagline}
                      </p>
                    )}

                    <p className="font-body text-xs text-ash leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="space-y-1.5 mb-5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-steel block mb-1">
                          Key Capabilities:
                        </span>
                        {project.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3 h-3 text-crimson shrink-0 mt-0.5" />
                            <span className="font-body text-xs text-silver leading-normal">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-5 pt-1">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-void border border-white/[0.06] text-steel text-[11px] font-mono group-hover:text-silver group-hover:border-white/[0.12] transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                      {project.liveUrl && project.liveUrl !== project.repoUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-bone hover:text-crimson transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Site</span>
                        </a>
                      )}

                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-ash hover:text-ivory transition-colors"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          <span>Architecture / Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
