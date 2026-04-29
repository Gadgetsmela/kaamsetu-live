import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionFromRequest } from "@/lib/auth/session";
import { fail, ok } from "@/lib/utils/response";

export async function GET(request: NextRequest, { params }: { params: Promise<{ applicationId: string }> }) {
  const session = await getSessionFromRequest(request);
  if (!session) return fail("Unauthorized", 401);

  const { applicationId } = await params;
  const application = await prisma.jobApplication.findUnique({
    where: { id: applicationId },
    include: { job: true }
  });

  if (!application) return fail("Not found", 404);
  if (session.role === "WORKER" && application.workerId !== session.userId) return fail("Forbidden", 403);
  return ok(application);
}
