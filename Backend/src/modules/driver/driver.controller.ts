import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { createDriverSchema } from "./driver.validation";
import {
  createDriver,
  getDrivers,
  getDriver,
  updateDriver,
  deleteDriver,
} from "./driver.service";

export const createDriverController = asyncHandler(async (req: Request, res: Response) => {
  const body = createDriverSchema.parse(req.body);

  const driver = await createDriver(body);

  res.status(201).json(driver);
});

export const getDriversController = asyncHandler(async (_req: Request, res: Response) => {
  res.json(await getDrivers());
});

export const getDriverController = asyncHandler(async (req: Request, res: Response) => {
  res.json(await getDriver(req.params.id as string));
});

export const updateDriverController = asyncHandler(async (req: Request, res: Response) => {
  res.json(await updateDriver(req.params.id as string, req.body));
});

export const deleteDriverController = asyncHandler(async (req: Request, res: Response) => {
  await deleteDriver(req.params.id as string);

  res.json({
    success: true,
    message: "Driver deleted successfully",
  });
});