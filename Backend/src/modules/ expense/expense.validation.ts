import { z } from "zod";

export const createExpenseSchema = z.object({
  type: z.enum(["FUEL", "TOLL", "MAINTENANCE", "OTHER"]),
  amount: z.number(),
  description: z.string().optional(),
  tripId: z.string(),
});