import { z } from "zod";

export const createVehicleSchema = z.object({
  registrationNumber: z.string(),
  vehicleName: z.string(),
  model: z.string(),
  type: z.string(),
  maxLoadCapacity: z.number(),
  odometer: z.number(),
  acquisitionCost: z.number(),
});