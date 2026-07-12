import { Router } from "express";
import {
  createMaintenanceController,
  getMaintenancesController,
  completeMaintenanceController,
} from "./maintenance.controller";

import { authenticate } from "../../middlewares/ auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "FLEET_MANAGER"),
  createMaintenanceController
);

router.get(
  "/",
  authenticate,
  getMaintenancesController
);

router.patch(
  "/:id/complete",
  authenticate,
  authorize("ADMIN", "FLEET_MANAGER"),
  completeMaintenanceController
);

export default router;