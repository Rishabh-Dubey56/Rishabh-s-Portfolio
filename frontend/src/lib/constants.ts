/* ============================================
   Application Constants & Verified Portfolio Data
   Rishabh Dubey — Full-Stack Developer & AI Enthusiast
   ============================================ */

import type { NavLink, ScrollSection } from "@/types";

export {
  PROJECTS_DATA,
  EXPERIENCES_DATA,
  ACHIEVEMENTS_DATA,
  EDUCATION_DATA,
  SKILLS_DATA,
} from "@/data";

/** Navigation links */
export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

/** Scroll sections mapping for GSAP ScrollTrigger camera choreography */
export const SCROLL_SECTIONS: ScrollSection[] = [
  { id: "hero", label: "Hero", startProgress: 0, endProgress: 0.18 },
  { id: "about", label: "About", startProgress: 0.18, endProgress: 0.38 },
  { id: "projects", label: "Projects", startProgress: 0.38, endProgress: 0.58 },
  { id: "experience", label: "Experience", startProgress: 0.58, endProgress: 0.76 },
  { id: "achievements", label: "Achievements", startProgress: 0.76, endProgress: 0.90 },
  { id: "contact", label: "Contact", startProgress: 0.90, endProgress: 1.0 },
];

/** Site metadata — verified authentic information only */
export const SITE = {
  name: "Rishabh Dubey",
  role: "Full-Stack Developer & AI/ML Enthusiast",
  affiliation: "B.Tech CSE (IBM) · United University, Prayagraj",
  github: "https://github.com/Rishabh-Dubey56",
  linkedin: "https://linkedin.com/in/rishabh-dubey-6b0a95321",
  location: "Prayagraj, Uttar Pradesh, India",
  email: "dubeyrishabh997@gmail.com",
  availability: "Open to Software Engineering Roles & Summer 2026 Internships",
  title: "Rishabh Dubey — Full-Stack Developer & Creative Technologist",
  description:
    "Portfolio of Rishabh Dubey — Full-Stack Developer & AI Enthusiast studying B.Tech CSE (IBM) at United University, Prayagraj.",
  url: "https://github.com/Rishabh-Dubey56",
} as const;
