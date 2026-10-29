import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

export const achievementsRouter = Router();

const FALLBACK_ACHIEVEMENTS = [
  {
    id: "ach-1",
    title: "IBM Specialization Honors — B.Tech CSE",
    description:
      "Pursuing specialized curriculum in Cloud Computing, AI & Enterprise Architecture at United University, Prayagraj.",
    date: "2024-08-01",
    category: "certification",
    url: "https://uniteduniversity.edu.in",
    sortOrder: 1,
  },
  {
    id: "ach-2",
    title: "Founder & Lead Developer — Swadesh Platform",
    description:
      "Launched digital cultural heritage platform spotlighting Indian regional arts and indigenous crafts.",
    date: "2024-03-15",
    category: "publication",
    url: "https://swadeshindia.vercel.app/",
    sortOrder: 2,
  },
  {
    id: "ach-3",
    title: "Lead Coordinator — WikiClub Tech Community",
    description:
      "Directed university-wide technical workshops, hands-on git bootcamps, and open-source project sprints.",
    date: "2023-09-10",
    category: "award",
    url: "https://github.com/Rishabh-Dubey56",
    sortOrder: 3,
  },
];

achievementsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (achievements && achievements.length > 0) {
      res.json(achievements);
      return;
    }
  } catch {
    // Database may not be configured yet, use fallback
  }

  res.json(FALLBACK_ACHIEVEMENTS);
});

achievementsRouter.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const { title, description, date, category, url, sortOrder } = req.body;
    const achievement = await prisma.achievement.create({
      data: {
        title,
        description,
        date: new Date(date),
        category: category || "other",
        url,
        sortOrder: sortOrder || 0,
      },
    });
    res.status(201).json(achievement);
  } catch (error) {
    res.status(500).json({ error: "Failed to create achievement" });
  }
});
