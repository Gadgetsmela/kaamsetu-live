import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(3),
  category: z.string().min(2),
  description: z.string().min(10),
  budgetMin: z.number().int().positive(),
  budgetMax: z.number().int().positive(),
  location: z.string().min(2),
  requiredDateTime: z.string().datetime(),
  workersRequired: z.number().int().positive(),
  skillRequirement: z.array(z.string().min(2)).min(1),
  contactPreference: z.string().min(2),
  urgency: z.enum(["LOW", "MEDIUM", "HIGH"]),
  imageUrls: z.array(z.string()).default([])
}).refine((v) => v.budgetMax >= v.budgetMin, {
  message: "budgetMax must be greater or equal to budgetMin",
  path: ["budgetMax"]
});

export const applyJobSchema = z.object({
  coverMessage: z.string().min(5).optional(),
  proposedWage: z.number().int().positive().optional()
});
