import { NextRequest } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/auth";
import { fail, ok } from "@/lib/utils/response";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Invalid input");

  const { role, ...data } = parsed.data;
  const exists = await prisma.user.findUnique({ where: { phone: data.phone } });
  if (exists) return fail("Phone number already registered", 409);

  const user = await prisma.user.create({
    data: {
      ...data,
      email: data.email || null,
      role,
      passwordHash: await hash(data.password, 10)
    },
    select: { id: true, name: true, role: true }
  });

  return ok(user, 201);
}
