import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth.js";

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ error: "Invalid credentials format", details: parseResult.error.flatten() });
      return;
    }

    const { email, password } = parseResult.data;
    const secret = process.env.JWT_SECRET || "default_jwt_secret_portfolio";

    // Attempt DB lookup
    try {
      const user = await prisma.adminUser.findUnique({ where: { email } });
      if (user) {
        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
          res.status(401).json({ error: "Invalid email or password" });
          return;
        }

        const token = jwt.sign({ id: user.id, email: user.email }, secret, {
          expiresIn: "7d",
        });

        res.json({ token, user: { id: user.id, email: user.email } });
        return;
      }
    } catch {
      // Database not connected
    }

    // Dev environment fallback admin credentials if DB is offline
    if (
      process.env.NODE_ENV !== "production" &&
      email === "admin@rishabhdubey.dev" &&
      password === (process.env.ADMIN_DEFAULT_PASSWORD || "RishabhPortfolio2026!")
    ) {
      const token = jwt.sign({ id: "dev_admin_1", email }, secret, {
        expiresIn: "7d",
      });
      res.json({ token, user: { id: "dev_admin_1", email } });
      return;
    }

    res.status(401).json({ error: "Invalid email or password" });
    return;
  } catch (error) {
    console.error("Auth login error:", error);
    res.status(500).json({ error: "Internal server error during authentication" });
  }
});

authRouter.get("/me", requireAuth, (req: AuthenticatedRequest, res: Response) => {
  res.json({ user: req.user });
});
