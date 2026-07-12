import { Router } from "express";
import { prisma } from "../config/prisma";
import authRoutes from "../modules/auth/ auth.routes";
import vehicleRoutes from "../modules/vehicle/vehicle.routes";
import driverRoutes from "../modules/driver/driver.routes";
import tripRoutes from "../modules/trip/trip.routes";



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
router.use("/auth", authRoutes);
router.use("/vehicles", vehicleRoutes);
router.use("/drivers", driverRoutes);
router.use("/trips", tripRoutes);

export default router;