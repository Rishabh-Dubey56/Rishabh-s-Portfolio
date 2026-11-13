import type { Experience } from "@/types";

export const EXPERIENCES_DATA: Experience[] = [
  {
    id: "exp-1",
    role: "Full-Stack Software Developer & Project Lead",
    company: "Independent Projects & Engineering Initiatives",
    period: "2024 — Present",
    startDate: "2024-01-01",
    description:
      "Designing and architecting modern web platforms, full-stack applications (Fixora / KaamSetu), and AI-integrated services.",
    bulletPoints: [
      "Developed and deployed production web applications using Next.js, React, TypeScript, and modern CSS architectures.",
      "Engineered responsive frontend interfaces, state management architectures, and RESTful API integrations.",
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
      "Led development of the MediNexus AI platform, exploring deep learning models and intelligent diagnostic assistance systems.",
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
