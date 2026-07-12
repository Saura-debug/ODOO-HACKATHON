import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { createFuelSchema } from "./fuel.validation";
import {
  createFuel,
  getFuelLogs,
} from "./fuel.service";

export const createFuelController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createFuelSchema.parse(req.body);

    const fuel = await createFuel(body);

    res.status(201).json(fuel);
  }
);

export const getFuelLogsController = asyncHandler(
  async (_: Request, res: Response) => {
    res.json(await getFuelLogs());
  }
);