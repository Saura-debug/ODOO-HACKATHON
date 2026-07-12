import { z } from "zod";

export const createTripSchema = z.object({
  source: z.string(),
  destination: z.string(),
  cargoWeight: z.number(),
  plannedDistance: z.number(),
  vehicleId: z.string(),
  driverId: z.string(),
});