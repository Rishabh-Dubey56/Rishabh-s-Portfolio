import { prisma } from "./lib/prisma";

async function testDatabaseConnection() {
  console.log("🔍 Testing PostgreSQL database connection via Prisma...");
  try {
    await prisma.$connect();
    console.log("✅ Successfully connected to the database!");

    // Query counts to verify tables
    const projectCount = await prisma.project.count().catch(() => null);
    const experienceCount = await prisma.experience.count().catch(() => null);
    const achievementCount = await prisma.achievement.count().catch(() => null);

    console.log("📊 Database Status:");
    console.log(`   - Projects in DB: ${projectCount !== null ? projectCount : "Table not created yet"}`);
    console.log(`   - Experiences in DB: ${experienceCount !== null ? experienceCount : "Table not created yet"}`);
    console.log(`   - Achievements in DB: ${achievementCount !== null ? achievementCount : "Table not created yet"}`);

    if (projectCount === null) {
      console.log("\n💡 Tables do not appear to exist yet. Run `npm run db:push` or `npm run db:migrate` to create them.");
    }
  } catch (error) {
    console.error("❌ Database connection error:", error);
    console.log("\n💡 Make sure DATABASE_URL is configured in backend/.env");
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseConnection();
