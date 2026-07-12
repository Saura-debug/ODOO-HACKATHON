import { z } from "zod";

export const createFuelSchema = z.object({
  liters: z.number(),
  cost: z.number(),
  date: z.coerce.date(),
  vehicleId: z.string(),
  tripId: z.string().optional(),
});