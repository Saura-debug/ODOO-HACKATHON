import { Router } from "express";
import {
  createExpenseController,
  getExpensesController,
} from "./expense.controller";

import { authenticate } from "../../middlewares/ auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "FLEET_MANAGER"),
  createExpenseController
);

router.get(
  "/",
  authenticate,
  getExpensesController
);

export default router;