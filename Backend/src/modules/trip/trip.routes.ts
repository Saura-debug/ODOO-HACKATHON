import { Router } from "express";

import {
  createTripController,
  getTripsController,
  completeTripController,
} from "./trip.controller";

import { authenticate } from "../../middlewares/ auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "FLEET_MANAGER"),
  createTripController
);

router.get(
  "/",
  authenticate,
  getTripsController
);

router.patch(
  "/:id/complete",
  authenticate,
  authorize("ADMIN", "FLEET_MANAGER"),
  completeTripController
);

export default router;