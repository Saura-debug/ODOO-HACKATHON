import { Request, Response } from "express";
import { createVehicleSchema } from "./vehicle.validation";



import {
  createVehicleService,
  deleteVehicleService,
  getAllVehiclesService,
  getVehicleByIdService,
  updateVehicleService,
} from "./vehicle.service";


export const createVehicleController = async (
  req: Request,
  res: Response
) => {
  try {
    const body = createVehicleSchema.parse(req.body);

    const vehicle = await createVehicleService(body);

    res.status(201).json(vehicle);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAllVehiclesController = async (
  _: Request,
  res: Response
) => {
  const vehicles = await getAllVehiclesService();

  res.json(vehicles);
};

export const getVehicleByIdController = async (
  req: Request,
  res: Response
) => {
  const vehicle = await getVehicleByIdService(req.params.id as string);

  res.json(vehicle);
};

export const updateVehicleController = async (
  req: Request,
  res: Response
) => {
  const vehicle = await updateVehicleService(
    req.params.id as string,
    req.body
  );

  res.json(vehicle);
};

export const deleteVehicleController = async (
  req: Request,
  res: Response
) => {
  await deleteVehicleService(req.params.id as string);

  res.json({
    message: "Vehicle Deleted Successfully",
  });
};