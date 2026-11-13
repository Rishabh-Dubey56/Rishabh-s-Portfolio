import type { Project } from "@/types";

export const PROJECTS_DATA: Project[] = [
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
    sortOrder: 1,
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
    sortOrder: 2,
  },
  {
    id: "dairymitra-ai",
    title: "DairyMitra-AI / GAUVANTA",
    tagline: "AI-Driven Cattle Health Monitoring & Veterinary Triage",
    description:
      "An intelligent livestock health monitoring and disease detection assistant empowering dairy farmers with timely symptom assessment, nutritional guidance, and veterinary triage.",
    category: "ai",
    techStack: ["Python", "PyTorch", "React", "FastAPI", "Tailwind CSS"],
    liveUrl: "https://github.com/Rishabh-Dubey56",
    repoUrl: "https://github.com/Rishabh-Dubey56",
    featured: true,
    highlights: [
      "Computer vision and neural assessment models for early livestock symptom classification",
      "Multilingual conversational assistant for rural dairy farmers and veterinary outreach",
      "Real-time health record logging and preventative care recommendations",
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
