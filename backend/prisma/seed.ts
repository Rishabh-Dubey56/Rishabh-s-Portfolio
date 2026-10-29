import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding for Rishabh Dubey Portfolio...");

  // 1. Seed Projects
  const projects = [
    {
      id: "swadesh",
      title: "Swadesh",
      description:
        "A digital platform built to spotlight authentic Indian heritage, cultural diversity, and local indigenous artisans, connecting regional creators with an appreciative digital audience.",
      techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
      liveUrl: "https://swadeshindia.vercel.app/",
      repoUrl: "https://github.com/Rishabh-Dubey56",
      thumbnail: "/images/projects/swadesh.png",
      featured: true,
      sortOrder: 1,
    },
    {
      id: "fixora-kaamsetu",
      title: "Fixora / KaamSetu",
      description:
        "A comprehensive home services and technician platform bridging local skilled blue-collar workers with residential customers for seamless booking, transparent communication, and reliable task execution.",
      techStack: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
      liveUrl: "https://github.com/Rishabh-Dubey56",
      repoUrl: "https://github.com/Rishabh-Dubey56",
      thumbnail: "/images/projects/fixora.png",
      featured: true,
      sortOrder: 2,
    },
    {
      id: "medinexus-ai",
      title: "MediNexus AI",
      description:
        "An intelligent medical diagnosis and healthcare decision-support system designed to assist with preliminary clinical assessment, symptom triage, and health information guidance.",
      techStack: ["Python", "FastAPI", "PyTorch", "React", "PostgreSQL", "Tailwind CSS"],
      liveUrl: "https://github.com/Rishabh-Dubey56",
      repoUrl: "https://github.com/Rishabh-Dubey56",
      thumbnail: "/images/projects/medinexus.png",
      featured: true,
      sortOrder: 3,
    },
    {
      id: "wikiclub-tech-uu",
      title: "WikiClub Tech UU",
      description:
        "The dedicated technology, workshop, and open-source resource platform for the WikiClub tech initiative at United University, Prayagraj, fostering peer learning and collaborative software development.",
      techStack: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GitHub Pages"],
      liveUrl: "https://github.com/Rishabh-Dubey56",
      repoUrl: "https://github.com/Rishabh-Dubey56",
      thumbnail: "/images/projects/wikiclub.png",
      featured: true,
      sortOrder: 4,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: project,
      create: project,
    });
  }
  console.log(`✅ Seeded ${projects.length} projects`);

  // 2. Seed Experiences
  const experiences = [
    {
      id: "exp-1",
      role: "Full-Stack Software Developer & Project Lead",
      company: "Independent Projects & Freelance",
      companyUrl: "https://github.com/Rishabh-Dubey56",
      startDate: new Date("2024-01-01"),
      description:
        "Designing and architecting modern web platforms, full-stack web applications (Swadesh, Fixora), and AI-integrated services.",
      type: "internship",
      sortOrder: 1,
    },
    {
      id: "exp-2",
      role: "AI & Software Lead / Contributor",
      company: "MediNexus AI & Research Initiatives",
      companyUrl: "https://github.com/Rishabh-Dubey56",
      startDate: new Date("2024-06-01"),
      endDate: new Date("2025-05-31"),
      description:
        "Led development of the MediNexus AI platform, exploring deep learning models and intelligent assistance systems.",
      type: "academic",
      sortOrder: 2,
    },
    {
      id: "exp-3",
      role: "Technical Coordinator & Contributor",
      company: "WikiClub Tech UU · United University",
      companyUrl: "https://github.com/Rishabh-Dubey56",
      startDate: new Date("2024-08-01"),
      description:
        "Organizing technical sessions, mentoring fellow students in web development, and driving open-source project initiatives.",
      type: "academic",
      sortOrder: 3,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.upsert({
      where: { id: exp.id },
      update: exp,
      create: exp,
    });
  }
  console.log(`✅ Seeded ${experiences.length} experiences`);

  // 3. Seed Achievements
  const achievements = [
    {
      id: "ach-1",
      title: "IBM Specialization Honors — B.Tech CSE",
      description:
        "Pursuing specialized curriculum in Cloud Computing, AI & Enterprise Architecture at United University, Prayagraj.",
      date: new Date("2024-08-01"),
      category: "certification",
      url: "https://uniteduniversity.edu.in",
      sortOrder: 1,
    },
    {
      id: "ach-2",
      title: "Founder & Lead Developer — Swadesh Platform",
      description:
        "Launched digital cultural heritage platform spotlighting Indian regional arts and indigenous crafts.",
      date: new Date("2024-03-15"),
      category: "publication",
      url: "https://swadeshindia.vercel.app/",
      sortOrder: 2,
    },
    {
      id: "ach-3",
      title: "Lead Coordinator — WikiClub Tech Community",
      description:
        "Directed university-wide technical workshops, hands-on git bootcamps, and open-source project sprints.",
      date: new Date("2023-09-10"),
      category: "award",
      url: "https://github.com/Rishabh-Dubey56",
      sortOrder: 3,
    },
  ];

  for (const ach of achievements) {
    await prisma.achievement.upsert({
      where: { id: ach.id },
      update: ach,
      create: ach,
    });
  }
  console.log(`✅ Seeded ${achievements.length} achievements`);

  // 4. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "admin@rishabhdubey.dev";
  const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || "RishabhPortfolio2026!";
  const passwordHash = await bcrypt.hash(defaultPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      passwordHash,
    },
  });
  console.log(`✅ Seeded admin user (${adminEmail})`);

  console.log("\n🚀 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
