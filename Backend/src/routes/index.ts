import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    success: true,
    message: "TransitOps Backend Running 🚀",
  });
});

export default router;