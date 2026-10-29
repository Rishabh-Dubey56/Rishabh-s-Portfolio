"use client";

import { Award, Trophy, Sparkles, ExternalLink, CheckCircle2, ShieldCheck } from "lucide-react";
import { ACHIEVEMENTS_DATA } from "@/lib/constants";

export default function Achievements() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "award":
        return <Trophy className="w-4 h-4 text-amber-warm" />;
      case "certification":
        return <Award className="w-4 h-4 text-crimson" />;
      case "publication":
      default:
        return <Sparkles className="w-4 h-4 text-silver" />;
    }
  };

  return (
    <section
      id="achievements"
      className="relative min-h-screen flex items-center py-28 overflow-hidden bg-transparent"
      aria-label="Achievements section"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute left-1/3 top-1/3 w-[500px] h-[500px] opacity-[0.05] blur-[140px]"
          style={{ background: "radial-gradient(circle, #d97706 0%, transparent 70%)" }}
        />
        <div
          className="absolute right-10 bottom-20 w-[400px] h-[400px] opacity-[0.04] blur-[120px]"
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
                04 — Honors & Recognitions
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2.5 mb-4">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-ivory tracking-tight uppercase">
                Verified Milestones
              </h2>
              <span className="font-display italic text-amber-warm text-xl sm:text-2xl font-light">
                & Leadership Honors
              </span>
            </div>
            <div className="section-divider" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-void border border-white/[0.08] text-steel text-xs font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Strictly Verified Credentials</span>
          </div>
        </div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ACHIEVEMENTS_DATA.map((ach, idx) => (
            <article
              key={ach.id}
              className="card p-7 md:p-8 flex flex-col justify-between group transition-all duration-500 hover:border-amber-warm/40 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-15px_rgba(217,119,6,0.2)]"
            >
              <div>
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] group-hover:border-amber-warm/40 transition-colors">
                    {getCategoryIcon(ach.category)}
                  </div>
                  <span className="font-mono text-xs text-steel/60">
                    Honor 0{idx + 1}
                  </span>
                </div>

                {/* Date & Issuer Tag */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-warm/10 border border-amber-warm/25 text-amber-warm text-[11px] font-mono font-medium">
                    {ach.date}
                  </span>
                  {ach.issuer && (
                    <span className="font-mono text-xs text-steel">
                      {ach.issuer}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-ivory mb-3 group-hover:text-amber-warm transition-colors duration-300">
                  {ach.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-ash leading-relaxed mb-6">
                  {ach.description}
                </p>
              </div>

              {/* Bottom Details & Link */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-silver">
                  <CheckCircle2 className="w-3.5 h-3.5 text-crimson" />
                  <span>Authenticated</span>
                </span>

                {ach.url && (
                  <a
                    href={ach.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-ash hover:text-ivory transition-colors group/link"
                  >
                    <span>View Reference</span>
                    <ExternalLink className="w-3.5 h-3.5 text-amber-warm group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
