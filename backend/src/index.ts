import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { healthRouter } from "./routes/health.js";
import { projectsRouter } from "./routes/projects.js";
import { experienceRouter } from "./routes/experience.js";
import { contactRouter } from "./routes/contact.js";
import { achievementsRouter } from "./routes/achievements.js";
import { authRouter } from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "3001", 10);
const allowedOrigins = [
  process.env.CORS_ORIGIN || "http://localhost:3000",
  "http://localhost:3000",
  "http://localhost:3001",
];

// ── Security middleware ──
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Dev-friendly permissive origin
      }
    },
    credentials: true,
  })
);

// ── Rate limiting ──
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});
app.use(limiter);

// ── Body parsing ──
app.use(express.json({ limit: "10mb" }));

// ── Active Routes ──
app.use("/api", healthRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/achievements", achievementsRouter);
app.use("/api/contact", contactRouter);
app.use("/api/auth", authRouter);

// ── 404 handler ──
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// ── Start server with automatic port fallback if 3001 is busy ──
function startServer(port: number) {
  const server = app.listen(port, () => {
    console.log(`\n🔥 Portfolio API running on http://localhost:${port}`);
    console.log(`   Health check: http://localhost:${port}/api/health`);
    console.log(`   Projects:     http://localhost:${port}/api/projects`);
    console.log(`   Experience:   http://localhost:${port}/api/experience`);
    console.log(`   Achievements: http://localhost:${port}/api/achievements`);
    console.log(`   Contact:      http://localhost:${port}/api/contact`);
    console.log(`   Auth:         http://localhost:${port}/api/auth/login`);
    console.log(`   CORS origins: ${allowedOrigins.join(", ")}\n`);
  });

  server.on("error", (err: any) => {
    if (err.code === "EADDRINUSE" && port === 3001) {
      console.warn(`⚠️ Port 3001 is already in use (e.g. by frontend). Shifting backend to port 3002...`);
      startServer(3002);
    } else {
      console.error("Server error:", err);
    }
  });
}

startServer(PORT);

export default app;
