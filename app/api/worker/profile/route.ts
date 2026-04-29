import { NextRequest } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { workerProfileSchema } from "@/lib/validations/profile";
import { fail, ok } from "@/lib/utils/response";

export async function PUT(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session || session.role !== "WORKER") return fail("Unauthorized", 401);

  const parsed = workerProfileSchema.safeParse(await request.json());
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Invalid input");

  const profile = await prisma.workerProfile.upsert({
    where: { userId: session.userId },
    create: { userId: session.userId, ...parsed.data },
    update: parsed.data
  });

  return ok(profile);
}
