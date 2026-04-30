import { NextRequest } from "next/server";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations/auth";
import { fail, ok } from "@/lib/utils/response";
import { signToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Invalid input");

  const { phone, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { phone },
  });
  if (!user) return fail("Phone not registered", 401);

  const isValid = await compare(password, user.passwordHash);
  if (!isValid) return fail("Invalid credentials", 401);

  // Create token with matching SessionPayload
  const token = await signToken({
    userId: user.id,
    role: user.role as "OWNER" | "WORKER" | "ADMIN",
    name: user.name || "",
  });

  // Set HTTP-only cookie
  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return ok({ user: { id: user.id, name: user.name, role: user.role } });
}