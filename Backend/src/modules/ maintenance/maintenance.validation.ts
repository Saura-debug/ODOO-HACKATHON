import { z } from "zod";

export const createMaintenanceSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  cost: z.number().optional(),
  vehicleId: z.string(),
});