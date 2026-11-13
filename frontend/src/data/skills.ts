import type { EducationEntry, SkillCategory } from "@/types";

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
