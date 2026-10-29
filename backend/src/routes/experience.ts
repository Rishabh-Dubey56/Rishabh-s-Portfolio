import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const experienceRouter = Router();

const FALLBACK_EXPERIENCES = [
  {
    id: "exp-1",
    role: "Full-Stack Software Developer & Project Lead",
    company: "Independent Projects & Freelance",
    startDate: "2024-01-01",
    description:
      "Designing and architecting modern web platforms, full-stack web applications (Swadesh, Fixora), and AI-integrated services.",
    type: "internship",
    sortOrder: 1,
  },
  {
    id: "exp-2",
    role: "AI & Software Lead / Contributor",
    company: "MediNexus AI & Research Initiatives",
    startDate: "2024-06-01",
    endDate: "2025-05-31",
    description:
      "Led development of the MediNexus AI platform, exploring deep learning models and intelligent assistance systems.",
    type: "academic",
    sortOrder: 2,
  },
  {
    id: "exp-3",
    role: "Technical Coordinator & Contributor",
    company: "WikiClub Tech UU · United University",
    startDate: "2024-08-01",
    description:
      "Organizing technical sessions, mentoring fellow students in web development, and driving open-source project initiatives.",
    type: "academic",
    sortOrder: 3,
  },
];

experienceRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (experiences && experiences.length > 0) {
      res.json(experiences);
      return;
    }
  } catch (err) {
    // Database may not be configured yet, use fallback
  }

  res.json(FALLBACK_EXPERIENCES);
});
