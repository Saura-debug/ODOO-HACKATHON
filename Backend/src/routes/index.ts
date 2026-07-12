import { Router } from "express";
import { prisma } from "../config/prisma";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    success: true,
    message: "TransitOps Backend Running 🚀",
  });
});
router.get("/health", async (_, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      database: "Connected",
    });
  } catch {
    res.status(500).json({
      success: false,
      database: "Disconnected",
    });
  }
});

export default router;