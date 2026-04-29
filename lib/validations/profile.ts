import { z } from "zod";

export const ownerProfileSchema = z.object({
  organization: z.string().min(2).optional(),
  address: z.string().min(2).optional(),
  whatsapp: z.string().min(8).optional()
});

export const workerProfileSchema = z.object({
  location: z.string().min(2),
  skills: z.array(z.string().min(2)).min(1),
  experienceYears: z.number().int().min(0),
  expectedWage: z.number().int().positive(),
  availability: z.string().min(2),
  profilePhotoUrl: z.string().optional(),
  bio: z.string().optional()
});
