import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const projectsRouter = Router();

const FALLBACK_PROJECTS = [
  {
    id: "swadesh",
    title: "Swadesh",
    tagline: "Indian Culture, Crafts & Heritage Platform",
    description:
      "A digital platform built to spotlight authentic Indian heritage, cultural diversity, and local indigenous artisans, connecting regional creators with an appreciative digital audience.",
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    liveUrl: "https://swadeshindia.vercel.app/",
    repoUrl: "https://github.com/Rishabh-Dubey56",
    featured: true,
    sortOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "fixora-kaamsetu",
    title: "Fixora / KaamSetu",
    tagline: "Hyperlocal Service & Skilled Technician Platform",
    description:
      "A comprehensive home services and technician platform bridging local skilled blue-collar workers with residential customers for seamless booking, transparent communication, and reliable task execution.",
    techStack: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://github.com/Rishabh-Dubey56",
    repoUrl: "https://github.com/Rishabh-Dubey56",
    featured: true,
    sortOrder: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "medinexus-ai",
    title: "MediNexus AI",
    tagline: "AI-Powered Clinical Diagnostics & Triage Assistant",
    description:
      "An intelligent medical diagnosis and healthcare decision-support system designed to assist with preliminary clinical assessment, symptom triage, and health information guidance.",
    techStack: ["Python", "FastAPI", "PyTorch", "React", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://github.com/Rishabh-Dubey56",
    repoUrl: "https://github.com/Rishabh-Dubey56",
    featured: true,
    sortOrder: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "wikiclub-tech-uu",
    title: "WikiClub Tech UU",
    tagline: "Student Technical Community & Knowledge Hub",
    description:
      "The dedicated technology, workshop, and open-source resource platform for the WikiClub tech initiative at United University, Prayagraj, fostering peer learning and collaborative software development.",
    techStack: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GitHub Pages"],
    liveUrl: "https://github.com/Rishabh-Dubey56",
    repoUrl: "https://github.com/Rishabh-Dubey56",
    featured: true,
    sortOrder: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

projectsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (projects && projects.length > 0) {
      res.json(projects);
      return;
    }
  } catch (err) {
    // Database may not be configured yet, use fallback
  }

  res.json(FALLBACK_PROJECTS);
});
