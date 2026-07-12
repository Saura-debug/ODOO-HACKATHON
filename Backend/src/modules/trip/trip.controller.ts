import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { createTripSchema } from "./trip.validation";
import {
  completeTrip,
  createTrip,
  getTrips,
} from "./trip.service";

export const createTripController = asyncHandler(
  async (req: Request, res: Response) => {

    const body = createTripSchema.parse(req.body);

    const trip = await createTrip(body);

    res.status(201).json(trip);

  }
);

export const getTripsController = asyncHandler(
  async (_req: Request, res: Response) => {

    res.json(await getTrips());

  }
);

export const completeTripController = asyncHandler(
  async (req: Request, res: Response) => {

    await completeTrip(
      req.params.id as string,
      req.body.endOdometer
    );

    res.json({
      success: true,
      message: "Trip Completed",
    });

  }
);