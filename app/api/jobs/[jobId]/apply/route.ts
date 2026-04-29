import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionFromRequest } from "@/lib/auth/session";
import { applyJobSchema } from "@/lib/validations/job";
import { fail, ok } from "@/lib/utils/response";

export async function POST(request: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
  const session = await getSessionFromRequest(request);
  if (!session || session.role !== "WORKER") return fail("Only workers can apply", 403);

  const { jobId } = await params;
  const body = await request.json();
  const parsed = applyJobSchema.safeParse(body);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Invalid input");

  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) return fail("Job not found", 404);

  const existing = await prisma.jobApplication.findUnique({
    where: { jobId_workerId: { jobId, workerId: session.userId } }
  });
  if (existing) return fail("You have already applied", 409);

  const application = await prisma.jobApplication.create({
    data: { ...parsed.data, jobId, workerId: session.userId }
  });

  await prisma.notification.create({
    data: {
      userId: job.ownerId,
      type: "APPLICATION_NEW",
      title: "New application received",
      body: `${session.name} applied to ${job.title}`
    }
  });

  return ok(application, 201);
}
