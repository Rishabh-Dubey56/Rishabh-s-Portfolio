"use client";

import { useSyncExternalStore, useCallback } from "react";

/**
 * Hook for responsive breakpoint detection.
 * Uses useSyncExternalStore for efficient, event-driven updates without cascading renders.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query]
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Convenience: true if viewport ≥ 768px */
export function useIsDesktop() {
  return useMediaQuery("(min-width: 768px)");
}

/** Convenience: true if user prefers reduced motion */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
