import { NextRequest } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/utils/response";

export async function GET(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session) return fail("Unauthorized", 401);

  const notifications = await prisma.notification.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" }
  });

  return ok(notifications);
}
