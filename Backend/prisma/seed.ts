import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Roles
  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: {
      name: "ADMIN",
      description: "System Administrator",
    },
  });

  await prisma.role.upsert({
    where: { name: "FLEET_MANAGER" },
    update: {},
    create: {
      name: "FLEET_MANAGER",
    },
  });

  await prisma.role.upsert({
    where: { name: "DRIVER" },
    update: {},
    create: {
      name: "DRIVER",
    },
  });

  await prisma.role.upsert({
    where: { name: "SAFETY_OFFICER" },
    update: {},
    create: {
      name: "SAFETY_OFFICER",
    },
  });

  await prisma.role.upsert({
    where: { name: "FINANCIAL_ANALYST" },
    update: {},
    create: {
      name: "FINANCIAL_ANALYST",
    },
  });

  // Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@transitops.com",
    },
    update: {},
    create: {
      name: "Admin",
      email: "admin@transitops.com",
      password: hashedPassword,
      roleId: adminRole.id,
    },
  });

  console.log("✅ Database Seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });