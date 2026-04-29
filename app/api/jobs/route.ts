import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionFromRequest } from "@/lib/auth/session";
import { createJobSchema } from "@/lib/validations/job";
import { fail, ok } from "@/lib/utils/response";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const where = {
    category: searchParams.get("category") || undefined,
    location: searchParams.get("location") || undefined,
    urgency: (searchParams.get("urgency") as "LOW" | "MEDIUM" | "HIGH" | null) || undefined
  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { owner: { select: { name: true } } }
  });

  return ok(jobs);
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session || session.role !== "OWNER") return fail("Only owners can post jobs", 403);

  const body = await request.json();
  const parsed = createJobSchema.safeParse(body);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Invalid input");

  const job = await prisma.job.create({
    data: {
      ...parsed.data,
      requiredDateTime: new Date(parsed.data.requiredDateTime),
      ownerId: session.userId
    }
  });

  return ok(job, 201);
}
