import { Router } from "express";
import {
  createVehicleController,
  deleteVehicleController,
  getAllVehiclesController,
  getVehicleByIdController,
  updateVehicleController,
} from "./vehicle.controller";

import { authenticate } from "../../middlewares/ auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "FLEET_MANAGER"),
  createVehicleController
);

router.get("/", authenticate, getAllVehiclesController);

router.get("/:id", authenticate,  getVehicleByIdController);

router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN", "FLEET_MANAGER"),
  updateVehicleController
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteVehicleController
);

export default router;