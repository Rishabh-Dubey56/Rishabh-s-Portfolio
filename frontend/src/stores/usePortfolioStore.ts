import { create } from "zustand";

export type SectionId = "hero" | "about" | "projects" | "experience" | "achievements" | "contact";

export interface CameraWaypoint {
  pos: [number, number, number];
  lookAt: [number, number, number];
  corePos: [number, number, number];
  coreScale: number;
  lightCrimson: number;
  lightAmber: number;
}

export const SECTION_WAYPOINTS: Record<SectionId, CameraWaypoint> = {
  hero: {
    pos: [0, 0, 5.5],
    lookAt: [0, 0, 0],
    corePos: [2.2, 0.2, -0.5],
    coreScale: 1.0,
    lightCrimson: 1.4,
    lightAmber: 1.2,
  },
  about: {
    pos: [-1.6, -0.4, 4.6],
    lookAt: [0, 0, 0],
    corePos: [1.8, -0.3, -1.0],
    coreScale: 1.2,
    lightCrimson: 1.8,
    lightAmber: 0.9,
  },
  projects: {
    pos: [0, -1.8, 6.2],
    lookAt: [0, -0.5, 0],
    corePos: [0, -0.8, -2.0],
    coreScale: 1.4,
    lightCrimson: 1.6,
    lightAmber: 1.4,
  },
  experience: {
    pos: [1.8, -1.0, 5.0],
    lookAt: [-0.5, 0, 0],
    corePos: [-2.0, -0.6, -1.2],
    coreScale: 1.1,
    lightCrimson: 0.9,
    lightAmber: 1.8,
  },
  achievements: {
    pos: [1.2, -1.8, 4.8],
    lookAt: [0, -0.6, 0],
    corePos: [-1.5, -0.8, -1.0],
    coreScale: 1.2,
    lightCrimson: 1.8,
    lightAmber: 2.2,
  },
  contact: {
    pos: [0, -2.6, 4.2],
    lookAt: [0, -0.8, 0],
    corePos: [0, -1.2, -0.5],
    coreScale: 1.5,
    lightCrimson: 2.2,
    lightAmber: 2.0,
  },
};

interface PortfolioState {
  /** Overall normalized scroll progress 0–1 */
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;

  /** Currently active section ID */
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;

  /** Active camera waypoint target */
  currentWaypoint: CameraWaypoint;
  setWaypoint: (waypoint: CameraWaypoint) => void;

  /** Whether the initial loading sequence is complete */
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;

  /** Whether the 3D canvas is ready */
  isCanvasReady: boolean;
  setIsCanvasReady: (ready: boolean) => void;

  /** Whether mobile nav is open */
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),

  activeSection: "hero",
  setActiveSection: (section) =>
    set({
      activeSection: section,
      currentWaypoint: SECTION_WAYPOINTS[section] || SECTION_WAYPOINTS.hero,
    }),

  currentWaypoint: SECTION_WAYPOINTS.hero,
  setWaypoint: (waypoint) => set({ currentWaypoint: waypoint }),

  isLoaded: false,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),

  isCanvasReady: false,
  setIsCanvasReady: (ready) => set({ isCanvasReady: ready }),

  isMobileNavOpen: false,
  setIsMobileNavOpen: (open) => set({ isMobileNavOpen: open }),
}));
