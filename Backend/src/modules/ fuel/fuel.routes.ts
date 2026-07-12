import { Router } from "express";
import {
  createFuelController,
  getFuelLogsController,
} from "./fuel.controller";

import { authenticate } from "../../middlewares/ auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "FLEET_MANAGER"),
  createFuelController
);

router.get(
  "/",
  authenticate,
  getFuelLogsController
);

export default router;