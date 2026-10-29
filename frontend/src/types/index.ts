/* ============================================
   Shared Type Definitions
   Rishabh Dubey Portfolio
   ============================================ */

/** Project data from the backend API or mock store */
export interface Project {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  category: "all" | "fullstack" | "ai" | "webgl" | "mobile";
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  thumbnailUrl?: string;
  featured: boolean;
  highlights?: string[];
  metrics?: string;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

/** Work experience / internship entry */
export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  companyUrl?: string;
  startDate: string;
  endDate?: string;
  period?: string;
  description: string;
  bulletPoints?: string[];
  skills?: string[];
  type: "full-time" | "part-time" | "internship" | "freelance" | "contract" | "academic";
  sortOrder: number;
}

/** Education entry */
export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  status?: string;
  grade?: string;
  focus?: string;
  honors?: string[];
}

/** Skill categories */
export interface SkillItem {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  iconName?: string;
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

/** Numerical metrics / stats counter */
export interface PortfolioStat {
  value: string;
  label: string;
  subtext?: string;
}

/** Achievement / certification entry */
export interface Achievement {
  id: string;
  title: string;
  issuer?: string;
  description: string;
  date: string;
  category: "award" | "certification" | "competition" | "publication" | "other";
  url?: string;
  sortOrder: number;
}

/** Contact form message payload */
export interface ContactMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

/** API response wrapper */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/** Navigation link */
export interface NavLink {
  label: string;
  href: string;
}

/** Social media link */
export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

/** Scroll section for 3D scene mapping */
export interface ScrollSection {
  id: string;
  label: string;
  startProgress: number;
  endProgress: number;
}
