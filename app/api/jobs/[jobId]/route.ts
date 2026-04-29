import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/utils/response";

export async function GET(_: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      owner: { select: { name: true, phone: true } },
      applications: { include: { worker: { select: { name: true } } } }
    }
  });

  if (!job) return fail("Job not found", 404);
  return ok(job);
}
