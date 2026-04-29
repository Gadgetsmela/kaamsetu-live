import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionFromRequest } from "@/lib/auth/session";
import { fail, ok } from "@/lib/utils/response";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string; applicationId: string }> }
) {
  const session = await getSessionFromRequest(request);
  if (!session || session.role !== "OWNER") return fail("Only owners can update applications", 403);

  const { jobId, applicationId } = await params;
  const body = await request.json();
  const status = body.status as "SHORTLISTED" | "REJECTED" | "ACCEPTED";

  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job || job.ownerId !== session.userId) return fail("Forbidden", 403);

  const application = await prisma.jobApplication.update({
    where: { id: applicationId, jobId },
    data: { status },
    include: { worker: true, job: true }
  });

  if (status === "ACCEPTED") {
    await prisma.booking.create({
      data: {
        applicationId: application.id,
        jobId: job.id,
        ownerId: session.userId,
        workerId: application.workerId,
        status: "CONFIRMED"
      }
    });
  }

  await prisma.notification.create({
    data: {
      userId: application.workerId,
      type: status === "ACCEPTED" ? "APPLICATION_ACCEPTED" : "APPLICATION_REJECTED",
      title: `Application ${status.toLowerCase()}`,
      body: `Your application for ${job.title} is ${status.toLowerCase()}`
    }
  });

  return ok(application);
}
