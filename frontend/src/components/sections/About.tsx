"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Code2,
  Cpu,
  Database,
  GraduationCap,
  Layers,
  Sparkles,
  Terminal,
  CheckCircle2,
} from "lucide-react";
import { SKILLS_DATA, EDUCATION_DATA, SITE } from "@/lib/constants";

export default function About() {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const categoryIcons = [
    <Layers key="fe" className="w-4 h-4 text-crimson" />,
    <Database key="be" className="w-4 h-4 text-amber-warm" />,
    <Cpu key="ai" className="w-4 h-4 text-crimson" />,
    <Terminal key="core" className="w-4 h-4 text-steel" />,
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center py-28 overflow-hidden bg-transparent"
      aria-label="About section"
    >
      {/* Background ambient accents */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -left-20 top-1/2 -translate-y-1/2 w-[420px] h-[520px] opacity-[0.06] blur-[120px]"
          style={{ background: "radial-gradient(circle, #dc2626 0%, transparent 70%)" }}
        />
        <div
          className="absolute right-0 bottom-10 w-[350px] h-[350px] opacity-[0.04] blur-[100px]"
          style={{ background: "radial-gradient(circle, #d97706 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        {/* Section header (Matching Reference Frames 3 & 4) */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-crimson" />
            <span className="font-mono text-xs tracking-[0.28em] uppercase text-crimson font-medium">
              01 — Profile & Core Stack
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2.5 mb-4">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-ivory tracking-tight uppercase">
              The Creative Outlook
            </h2>
            <span className="font-display italic text-amber-warm text-xl sm:text-2xl font-light">
              & Systems Engineering
            </span>
          </div>
          <div className="section-divider" />
        </div>

        {/* Narrative & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 mb-20 items-start">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-void/60 backdrop-blur-md">
              <p className="font-body text-lg text-bone leading-relaxed mb-5">
                I am a software engineer and full-stack developer pursuing my
                Bachelor of Technology in Computer Science & Engineering in association
                with <span className="text-ivory font-semibold">IBM</span> at{" "}
                <span className="text-amber-warm font-semibold">United University, Prayagraj</span>.
              </p>

              <p className="font-body text-base text-ash leading-relaxed mb-5">
                My work centers on building modern web applications that merge
                rigorous software architecture with cinematic spatial interactivity.
                Whether developing AI-driven diagnostic pipelines, building low-latency
                collaborative platforms, or crafting immersive WebGL 3D interfaces,
                I focus relentlessly on high performance, clean type safety, and
                frictionless user ergonomics.
              </p>

              <p className="font-body text-sm text-steel leading-relaxed">
                Currently actively exploring retrieval-augmented generation (RAG),
                cloud-native microservices, and modern rendering patterns with Next.js 16
                and React 19.
              </p>

              {/* Quick tags */}
              <div className="mt-6 pt-6 border-t border-white/[0.06] flex flex-wrap gap-2.5">
                {[
                  "Full-Stack Engineering",
                  "Applied Machine Learning",
                  "3D WebGL / Three.js",
                  "Type-Safe Systems",
                  "Prayagraj, India",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/[0.03] border border-white/[0.08] text-silver"
                  >
                    <CheckCircle2 className="w-3 h-3 text-crimson" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Academic Credentials Banner */}
            <div className="card p-6 md:p-7 relative overflow-hidden group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-crimson/10 border border-crimson/20 text-crimson shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-amber-warm/15 text-amber-warm font-medium">
                      IBM Curriculum Partnership
                    </span>
                    <span className="font-mono text-xs text-amber-warm/90 font-medium">
                      2024 — 2028 · 3rd Year
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-ivory mb-1">
                    {EDUCATION_DATA[0].degree}
                  </h3>
                  <p className="font-body text-sm text-ash mb-3">
                    {EDUCATION_DATA[0].institution} · {EDUCATION_DATA[0].location}
                  </p>
                  <p className="font-body text-xs text-steel leading-relaxed mb-3">
                    {EDUCATION_DATA[0].focus}
                  </p>
                  <ul className="space-y-1.5">
                    {EDUCATION_DATA[0].honors?.map((honor) => (
                      <li key={honor} className="font-body text-xs text-silver flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                        {honor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Focus & Competencies Column */}
          <div className="lg:col-span-5 space-y-5">
            {/* Cinematic Portrait Card with Studio Lighting Aesthetic */}
            <div className="card p-3.5 relative overflow-hidden group border-white/[0.08] bg-void/70 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
              <div className="relative w-full h-[360px] sm:h-[420px] rounded-xl overflow-hidden bg-void">
                <Image
                  src="/images/portrait.jpg"
                  alt="Rishabh Dubey — Portrait"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-top filter contrast-[1.04] transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent opacity-90 pointer-events-none" />

                {/* Top Floating Identity Pill */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-void/80 backdrop-blur-md border border-white/10 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-ping" />
                  <span className="font-mono text-[11px] text-silver uppercase font-semibold">
                    Rishabh Dubey
                  </span>
                </div>

                {/* Bottom Overlay Info Banner */}
                <div className="absolute bottom-3 inset-x-3 p-3.5 rounded-xl bg-void/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-display text-sm font-bold text-ivory">Full-Stack Engineer</div>
                    <div className="font-mono text-[10px] text-steel">Prayagraj, Uttar Pradesh, India</div>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Active</span>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-display text-lg font-semibold text-ivory flex items-center gap-2 pt-2 mb-3">
              <Sparkles className="w-4 h-4 text-crimson" />
              Core Technical Competencies
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Full-Stack Web",
                  desc: "React, Next.js, TypeScript & Node.js production platforms",
                  tag: "Frontend & API",
                },
                {
                  title: "Applied AI / ML",
                  desc: "PyTorch & FastAPI medical diagnostics and pipelines",
                  tag: "Machine Learning",
                },
                {
                  title: "IBM Specialization",
                  desc: "Cloud computing & enterprise software at United University",
                  tag: "B.Tech CSE",
                },
                {
                  title: "Tech Community",
                  desc: "Student mentoring & workshops via WikiClub Tech UU",
                  tag: "Open Source",
                },
              ].map((pillar) => (
                <div
                  key={pillar.title}
                  className="card p-5 transition-all duration-300 hover:border-crimson/30 hover:-translate-y-1 group"
                >
                  <span className="font-mono text-[10px] text-amber-warm uppercase tracking-wider block mb-1">
                    {pillar.tag}
                  </span>
                  <div className="font-display text-base font-bold text-ivory group-hover:text-crimson transition-colors duration-300 mb-1">
                    {pillar.title}
                  </div>
                  <div className="font-body text-xs text-steel leading-normal">
                    {pillar.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick status card */}
            <div className="p-5 rounded-xl border border-white/[0.08] bg-void/50 mt-6">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="font-mono text-xs text-silver">Current Availability</span>
              </div>
              <p className="font-body text-xs text-ash mt-2 leading-relaxed">
                {SITE.availability}. Actively building high-impact software systems.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Domain Matrix */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-crimson block mb-1">
                Technical Architecture
              </span>
              <h3 className="font-display text-2xl font-bold text-ivory">
                Technologies & Tools
              </h3>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {SKILLS_DATA.map((cat, idx) => (
                <button
                  key={cat.title}
                  onClick={() => setActiveCategory(idx)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer ${
                    activeCategory === idx
                      ? "bg-crimson text-ivory shadow-[0_0_20px_rgba(220,38,38,0.3)] border border-crimson"
                      : "bg-void/80 text-ash border border-white/[0.06] hover:text-ivory hover:border-white/[0.15]"
                  }`}
                >
                  {categoryIcons[idx]}
                  <span>{cat.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Skills Display */}
          <div className="card p-6 md:p-8">
            <div className="mb-6">
              <h4 className="font-display text-lg font-semibold text-ivory mb-1">
                {SKILLS_DATA[activeCategory].title}
              </h4>
              <p className="font-body text-sm text-ash">
                {SKILLS_DATA[activeCategory].description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {SKILLS_DATA[activeCategory].skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`p-3.5 rounded-xl border transition-all duration-300 ${
                    skill.highlight
                      ? "bg-white/[0.04] border-crimson/30 hover:border-crimson hover:bg-crimson/5"
                      : "bg-void/60 border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-body text-xs font-semibold text-ivory">
                      {skill.name}
                    </span>
                    {skill.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                    )}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-steel block">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
