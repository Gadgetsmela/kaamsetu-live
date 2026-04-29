import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal("")),
  password: z.string().min(8),
  role: z.enum(["OWNER", "WORKER", "ADMIN"])
});

export const loginSchema = z.object({
  phone: z.string().min(8),
  password: z.string().min(8)
});
