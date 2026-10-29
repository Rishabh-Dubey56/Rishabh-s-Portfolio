/* ============================================
   Application Constants & Verified Portfolio Data
   Rishabh Dubey — Full-Stack Developer & AI Enthusiast
   ============================================ */

import type {
  NavLink,
  ScrollSection,
  Project,
  Experience,
  EducationEntry,
  SkillCategory,
  Achievement,
} from "@/types";

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

/** API base URL */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

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

/** Verified Projects Data */
export const PROJECTS_DATA: Project[] = [
  {
    id: "swadesh",
    title: "Swadesh",
    tagline: "Indian Culture, Crafts & Heritage Platform",
    description:
      "A digital platform built to spotlight authentic Indian heritage, cultural diversity, and local indigenous artisans, connecting regional creators with an appreciative digital audience.",
    category: "fullstack",
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    liveUrl: "https://swadeshindia.vercel.app/",
    repoUrl: "https://github.com/Rishabh-Dubey56",
    featured: true,
    highlights: [
      "Modern editorial interface celebrating Indian culture and regional artisan crafts",
      "Fast page loads and responsive cross-device layout deployed on Vercel",
      "Interactive cultural guides and rich multimedia exploration",
    ],
    sortOrder: 1,
  },
  {
    id: "fixora-kaamsetu",
    title: "Fixora / KaamSetu",
    tagline: "Hyperlocal Service & Skilled Technician Platform",
    description:
      "A comprehensive home services and technician platform bridging local skilled blue-collar workers with residential customers for seamless booking, transparent communication, and reliable task execution.",
    category: "fullstack",
    techStack: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://github.com/Rishabh-Dubey56",
    repoUrl: "https://github.com/Rishabh-Dubey56",
    featured: true,
    highlights: [
      "Hyperlocal booking workflow connecting verified service professionals with clients",
      "Role-based portal for service requests, real-time status tracking, and dispatch",
      "Clean UI designed for low-friction interaction on mobile and desktop",
    ],
    sortOrder: 2,
  },
  {
    id: "medinexus-ai",
    title: "MediNexus AI",
    tagline: "AI-Powered Clinical Diagnostics & Triage Assistant",
    description:
      "An intelligent medical diagnosis and healthcare decision-support system designed to assist with preliminary clinical assessment, symptom triage, and health information guidance.",
    category: "ai",
    techStack: ["Python", "FastAPI", "PyTorch", "React", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://github.com/Rishabh-Dubey56",
    repoUrl: "https://github.com/Rishabh-Dubey56",
    featured: true,
    highlights: [
      "Deep learning models for symptom classification and intelligent medical inquiry",
      "Asynchronous FastAPI backend providing low-latency inference endpoints",
      "Structured patient intake and clinical summary generation",
    ],
    sortOrder: 3,
  },
  {
    id: "wikiclub-tech-uu",
    title: "WikiClub Tech UU",
    tagline: "Student Technical Community & Knowledge Hub",
    description:
      "The dedicated technology, workshop, and open-source resource platform for the WikiClub tech initiative at United University, Prayagraj, fostering peer learning and collaborative software development.",
    category: "fullstack",
    techStack: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GitHub Pages"],
    liveUrl: "https://github.com/Rishabh-Dubey56",
    repoUrl: "https://github.com/Rishabh-Dubey56",
    featured: true,
    highlights: [
      "Centralized technical workshop schedules, project documentation, and learning tracks",
      "Community contribution guidelines empowering university students to build together",
      "Clean, accessible technical documentation architecture",
    ],
    sortOrder: 4,
  },
];

/** Verified Experience & Journey Data */
export const EXPERIENCES_DATA: Experience[] = [
  {
    id: "exp-1",
    role: "Full-Stack Software Developer & Project Lead",
    company: "Independent Projects & Freelance",
    period: "2024 — Present",
    startDate: "2024-01-01",
    description:
      "Designing and architecting modern web platforms, full-stack web applications (Swadesh, Fixora), and AI-integrated services.",
    bulletPoints: [
      "Developed and deployed production web applications using Next.js, React, TypeScript, and modern CSS architectures.",
      "Engineered backend API endpoints, database schemas, and state management systems with a strong focus on responsiveness and performance.",
      "Collaborated on agile software delivery, responsive UI/UX implementation, and Git version control.",
    ],
    skills: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "Git"],
    type: "internship",
    sortOrder: 1,
  },
  {
    id: "exp-2",
    role: "AI & Software Lead / Contributor",
    company: "MediNexus AI & Research Initiatives",
    period: "2024 — 2025",
    startDate: "2024-06-01",
    endDate: "2025-05-31",
    description:
      "Led development of the MediNexus AI platform, exploring deep learning models and intelligent assistance systems.",
    bulletPoints: [
      "Built asynchronous API pipelines in Python and FastAPI for medical data parsing and model evaluation.",
      "Trained and experimented with neural network architectures for classification and diagnostic support.",
      "Ensured clean codebase structure with documentation and reproducible setup.",
    ],
    skills: ["Python", "FastAPI", "PyTorch", "Machine Learning", "REST APIs"],
    type: "academic",
    sortOrder: 2,
  },
  {
    id: "exp-3",
    role: "Technical Coordinator & Contributor",
    company: "WikiClub Tech UU · United University",
    period: "2024 — Present",
    startDate: "2024-08-01",
    description:
      "Organizing technical sessions, mentoring fellow students in web development, and driving open-source project initiatives.",
    bulletPoints: [
      "Built the community technical web portal and maintained documentation for collaborative student projects.",
      "Conducted practical workshops on Git/GitHub, modern JavaScript, and frontend development.",
      "Advocated for peer-to-peer coding practices and collaborative problem solving.",
    ],
    skills: ["Community Leadership", "Next.js", "Open Source", "Mentorship"],
    type: "academic",
    sortOrder: 3,
  },
];

/** Verified Academic Background */
export const EDUCATION_DATA: EducationEntry[] = [
  {
    id: "edu-1",
    degree: "B.Tech CSE (IBM)",
    institution: "United University",
    location: "Prayagraj, Uttar Pradesh, India",
    period: "2024 — 2028",
    status: "3rd Year",
    focus: "Specialization in association with IBM (Cloud Computing, Artificial Intelligence & Enterprise Applications)",
    honors: [
      "IBM Curriculum Modules covering Cloud Computing and Enterprise Application Architecture",
      "Active organizer and developer in university technical community (WikiClub Tech UU)",
      "Core coursework: Data Structures, Algorithms, Operating Systems, Database Management Systems",
    ],
  },
];

/** Verified Categorized Skills */
export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Frontend & Spatial Web",
    description: "Responsive, accessible, and high-performance user interfaces.",
    skills: [
      { name: "Next.js 16 / React 19", level: "Expert", highlight: true },
      { name: "TypeScript", level: "Advanced", highlight: true },
      { name: "Tailwind CSS v4", level: "Expert", highlight: true },
      { name: "Three.js / WebGL", level: "Intermediate", highlight: true },
      { name: "GSAP & ScrollTrigger", level: "Advanced" },
      { name: "Zustand State Management", level: "Advanced" },
    ],
  },
  {
    title: "Backend & Systems",
    description: "API design, database modeling, and microservices.",
    skills: [
      { name: "Node.js & Express", level: "Advanced", highlight: true },
      { name: "Python & FastAPI", level: "Advanced", highlight: true },
      { name: "PostgreSQL & Prisma", level: "Advanced", highlight: true },
      { name: "RESTful API Architecture", level: "Advanced" },
      { name: "Docker Containerization", level: "Intermediate" },
      { name: "JWT & Security Protocols", level: "Advanced" },
    ],
  },
  {
    title: "Applied AI & Data",
    description: "Machine learning models and intelligent data processing.",
    skills: [
      { name: "PyTorch & Deep Learning", level: "Intermediate", highlight: true },
      { name: "NumPy & Pandas", level: "Advanced" },
      { name: "Model Evaluation & Metrics", level: "Intermediate" },
      { name: "Prompt & LLM Integration", level: "Intermediate" },
    ],
  },
  {
    title: "Engineering Foundations",
    description: "Computer science fundamentals and collaborative development practices.",
    skills: [
      { name: "Data Structures & Algorithms", level: "Advanced", highlight: true },
      { name: "Git & Collaborative GitHub", level: "Expert", highlight: true },
      { name: "Linux & Shell", level: "Intermediate" },
      { name: "Object-Oriented Design", level: "Advanced" },
    ],
  },
];

/** Verified Authentic Achievements Data */
export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: "ach-1",
    title: "IBM Specialization Honors — B.Tech CSE",
    issuer: "United University & IBM",
    description:
      "Pursuing specialized curriculum in Cloud Computing, AI & Enterprise Architecture at United University, Prayagraj.",
    date: "2024 — 2028",
    category: "certification",
    url: "https://uniteduniversity.edu.in",
    sortOrder: 1,
  },
  {
    id: "ach-2",
    title: "Founder & Lead Developer — Swadesh Platform",
    issuer: "Swadesh Cultural Initiative",
    description:
      "Architected and deployed production platform spotlighting Indian regional arts, cultural heritage, and indigenous crafts.",
    date: "2024",
    category: "publication",
    url: "https://swadeshindia.vercel.app/",
    sortOrder: 2,
  },
  {
    id: "ach-3",
    title: "Lead Coordinator — WikiClub Tech Community",
    issuer: "United University Technical Society",
    description:
      "Directed technical workshops, hands-on git bootcamps, and open-source project sprints for student engineers.",
    date: "2024 — Present",
    category: "award",
    url: "https://github.com/Rishabh-Dubey56",
    sortOrder: 3,
  },
];

