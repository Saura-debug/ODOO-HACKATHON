import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { getDashboard } from "./dashboard.service";

export const dashboardController = asyncHandler(
  async (_: Request, res: Response) => {
    res.json(await getDashboard());
  }
);