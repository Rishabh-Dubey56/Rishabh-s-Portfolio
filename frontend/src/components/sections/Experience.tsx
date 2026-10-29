"use client";

import { useState } from "react";
import { Briefcase, Calendar, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { EXPERIENCES_DATA } from "@/lib/constants";

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredExperiences =
    activeFilter === "all"
      ? EXPERIENCES_DATA
      : EXPERIENCES_DATA.filter((exp) => exp.type === activeFilter);

  return (
    <section
      id="experience"
      className="relative min-h-screen flex items-center py-28 overflow-hidden bg-transparent"
      aria-label="Experience section"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute right-0 top-1/3 w-[450px] h-[450px] opacity-[0.05] blur-[130px]"
          style={{ background: "radial-gradient(circle, #d97706 0%, transparent 70%)" }}
        />
        <div
          className="absolute left-10 bottom-20 w-[350px] h-[350px] opacity-[0.04] blur-[120px]"
          style={{ background: "radial-gradient(circle, #dc2626 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-warm" />
              <span className="font-mono text-xs tracking-[0.28em] uppercase text-amber-warm font-medium">
                02 — Career & Milestones
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2.5 mb-4">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-ivory tracking-tight uppercase">
                The Engineering Journey
              </h2>
              <span className="font-display italic text-amber-warm text-xl sm:text-2xl font-light">
                & Technical Leadership
              </span>
            </div>
            <div className="section-divider" />
          </div>

          {/* Filter badges */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Milestones" },
              { id: "internship", label: "Software Engineering" },
              { id: "academic", label: "AI Research" },
              { id: "freelance", label: "Open Source / Hackathons" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-amber-warm text-void font-semibold shadow-[0_0_15px_rgba(217,119,6,0.3)]"
                    : "bg-void border border-white/[0.08] text-steel hover:text-ivory hover:border-white/[0.18]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical timeline spine */}
          <div className="absolute left-3 md:left-8 top-3 bottom-8 w-px bg-gradient-to-b from-crimson via-amber-warm/40 to-transparent" />

          <div className="space-y-12">
            {filteredExperiences.map((exp, index) => (
              <div
                key={exp.id}
                className="relative pl-10 md:pl-20 group"
              >
                {/* Timeline node */}
                <div className="absolute left-3 md:left-8 top-4 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-amber-warm bg-void group-hover:scale-125 group-hover:bg-amber-warm transition-all duration-300 shadow-[0_0_12px_rgba(217,119,6,0.5)] flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-void" />
                </div>

                {/* Experience Card */}
                <div className="card p-6 md:p-8 transition-all duration-500 hover:border-amber-warm/30 hover:shadow-[0_10px_35px_-10px_rgba(0,0,0,0.8)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full bg-amber-warm/10 border border-amber-warm/25 text-amber-warm text-xs font-mono font-medium uppercase tracking-wider">
                        {exp.type}
                      </span>
                      <div className="flex items-center gap-1.5 text-steel text-xs font-mono">
                        <Calendar className="w-3.5 h-3.5 text-amber-warm/70" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <span className="font-mono text-xs text-steel/60 hidden sm:block">
                      Milestone 0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-ivory mb-1 group-hover:text-amber-warm transition-colors duration-300">
                    {exp.role}
                  </h3>

                  <div className="flex items-center gap-2 text-sm font-medium text-ash mb-4">
                    <Briefcase className="w-3.5 h-3.5 text-crimson" />
                    <span>{exp.company}</span>
                  </div>

                  <p className="text-silver font-body text-sm leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  {/* Bullet points */}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <div className="space-y-2 mb-6 pt-4 border-t border-white/[0.04]">
                      {exp.bulletPoints.map((point, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <ChevronRight className="w-4 h-4 text-amber-warm shrink-0 mt-0.5" />
                          <span className="font-body text-xs sm:text-sm text-ash leading-relaxed">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Skills pill tags */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-steel text-xs font-mono group-hover:text-silver group-hover:border-white/[0.12] transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
