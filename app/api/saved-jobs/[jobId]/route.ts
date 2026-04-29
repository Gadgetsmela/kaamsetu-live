import { NextRequest } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/utils/response";

export async function POST(request: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
  const session = await getSessionFromRequest(request);
  if (!session || session.role !== "WORKER") return fail("Only workers can save jobs", 403);

  const { jobId } = await params;
  const saved = await prisma.savedJob.upsert({
    where: { workerId_jobId: { workerId: session.userId, jobId } },
    create: { workerId: session.userId, jobId },
    update: {}
  });

  return ok(saved, 201);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
  const session = await getSessionFromRequest(request);
  if (!session || session.role !== "WORKER") return fail("Only workers can unsave jobs", 403);

  const { jobId } = await params;
  await prisma.savedJob.delete({ where: { workerId_jobId: { workerId: session.userId, jobId } } });
  return ok({ removed: true });
}
