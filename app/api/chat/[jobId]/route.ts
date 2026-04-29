import { NextRequest } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/utils/response";

export async function GET(request: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
  const session = await getSessionFromRequest(request);
  if (!session) return fail("Unauthorized", 401);

  const { jobId } = await params;
  const messages = await prisma.message.findMany({
    where: { jobId },
    orderBy: { createdAt: "asc" }
  });
  return ok(messages);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
  const session = await getSessionFromRequest(request);
  if (!session) return fail("Unauthorized", 401);

  const { jobId } = await params;
  const body = await request.json();
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) return fail("Job not found", 404);

  const receiverId = session.userId === job.ownerId ? body.receiverId : job.ownerId;
  const message = await prisma.message.create({
    data: { jobId, senderId: session.userId, receiverId, content: body.content }
  });

  return ok(message, 201);
}
