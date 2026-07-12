import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { createMaintenanceSchema } from "./maintenance.validation";
import {
  createMaintenance,
  completeMaintenance,
  getMaintenances,
} from "./maintenance.service";

export const createMaintenanceController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createMaintenanceSchema.parse(req.body);

    const maintenance = await createMaintenance(body);

    res.status(201).json(maintenance);
  }
);

export const getMaintenancesController = asyncHandler(
  async (_: Request, res: Response) => {
    res.json(await getMaintenances());
  }
);

export const completeMaintenanceController = asyncHandler(
  async (req: Request, res: Response) => {
    await completeMaintenance(req.params.id as string);

    res.json({
      success: true,
      message: "Maintenance Completed",
    });
  }
);