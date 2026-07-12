import { Router } from "express";
import {
  createDriverController,
  deleteDriverController,
  getDriverController,
  getDriversController,
  updateDriverController,
} from "./driver.controller";

import { authenticate } from "../../middlewares/ auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "FLEET_MANAGER"),
  createDriverController
);

router.get("/", authenticate, getDriversController);

router.get("/:id", authenticate, getDriverController);

router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN", "FLEET_MANAGER"),
  updateDriverController
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteDriverController
);

export default router;