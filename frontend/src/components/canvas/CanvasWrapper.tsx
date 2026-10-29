"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolioStore, SectionId } from "@/stores/usePortfolioStore";

const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
});

export default function CanvasWrapper() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || isInitialized.current) return;
    isInitialized.current = true;

    gsap.registerPlugin(ScrollTrigger);

    const store = usePortfolioStore.getState();

    // Global scroll progress tracker
    const globalTrigger = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        store.setScrollProgress(self.progress);
      },
    });

    // Per-section choreography
    const sections: SectionId[] = ["hero", "about", "projects", "experience", "achievements", "contact"];
    const sectionTriggers: ScrollTrigger[] = [];

    sections.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => store.setActiveSection(sectionId),
        onEnterBack: () => store.setActiveSection(sectionId),
      });

      sectionTriggers.push(trigger);
    });

    return () => {
      globalTrigger.kill();
      sectionTriggers.forEach((t) => t.kill());
      isInitialized.current = false;
    };
  }, []);

  return <Scene />;
}
