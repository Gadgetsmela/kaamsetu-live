import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionFromRequest } from "@/lib/auth/session";
import { fail, ok } from "@/lib/utils/response";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ bookingId: string }> }) {
  const session = await getSessionFromRequest(request);
  if (!session) return fail("Unauthorized", 401);

  const { bookingId } = await params;
  const body = await request.json();

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) return fail("Not found", 404);

  const isOwner = session.role === "OWNER" && booking.ownerId === session.userId;
  const isWorker = session.role === "WORKER" && booking.workerId === session.userId;
  if (!isOwner && !isWorker) return fail("Forbidden", 403);

  const updated = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      progressNote: body.progressNote,
      status: body.status,
      completedAt: body.status === "COMPLETED" ? new Date() : null
    }
  });

  return ok(updated);
}
