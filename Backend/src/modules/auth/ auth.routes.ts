import { Router } from "express";
import { loginController } from "./auth.controller";

import { authenticate } from "../../middlewares/ auth.middleware";
import { meController } from "./auth.controller";


const router = Router();

router.post("/login", loginController);
router.get("/me", authenticate, meController);

export default router;