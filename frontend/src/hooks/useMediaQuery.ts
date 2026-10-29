"use client";

import { useState, useEffect } from "react";

/**
 * Hook for responsive breakpoint detection.
 * Uses matchMedia for efficient, event-driven updates.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/** Convenience: true if viewport ≥ 768px */
export function useIsDesktop() {
  return useMediaQuery("(min-width: 768px)");
}

/** Convenience: true if user prefers reduced motion */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
