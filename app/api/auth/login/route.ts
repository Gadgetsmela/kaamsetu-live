import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations/auth";
import { fail } from "@/lib/utils/response";
import { signToken } from "@/lib/auth/jwt";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Invalid input");

  const user = await prisma.user.findUnique({ where: { phone: parsed.data.phone } });
  if (!user || !(await compare(parsed.data.password, user.passwordHash))) {
    return fail("Invalid credentials", 401);
  }

  const token = await signToken({ userId: user.id, role: user.role, name: user.name });
  const response = NextResponse.json({ success: true, data: { id: user.id, role: user.role, name: user.name } });
  response.cookies.set("kaamsetu_token", token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  return response;
}
