"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-white/[0.04] py-8"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-steel/50">
          © {currentYear} Rishabh Dubey
        </p>
        <div className="flex items-center gap-1 font-mono text-xs text-steel/30">
          <span>Built with</span>
          <span className="text-crimson/60">Next.js</span>
          <span>·</span>
          <span className="text-crimson/60">Three.js</span>
        </div>
      </div>
    </footer>
  );
}
