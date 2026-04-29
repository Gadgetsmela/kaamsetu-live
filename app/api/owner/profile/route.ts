import { NextRequest } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { ownerProfileSchema } from "@/lib/validations/profile";
import { fail, ok } from "@/lib/utils/response";

export async function PUT(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session || session.role !== "OWNER") return fail("Unauthorized", 401);

  const parsed = ownerProfileSchema.safeParse(await request.json());
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Invalid input");

  const profile = await prisma.ownerProfile.upsert({
    where: { userId: session.userId },
    create: { userId: session.userId, ...parsed.data },
    update: parsed.data
  });

  return ok(profile);
}
