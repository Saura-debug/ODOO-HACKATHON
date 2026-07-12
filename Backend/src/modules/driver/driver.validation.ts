import { z } from "zod";

export const createDriverSchema = z.object({
  name: z.string().min(3),
  licenseNumber: z.string(),
  licenseCategory: z.string(),
  licenseExpiry: z.coerce.date(),
  contactNumber: z.string(),
});