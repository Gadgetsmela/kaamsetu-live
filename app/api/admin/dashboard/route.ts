import { NextRequest } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/utils/response";

export async function GET(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session || session.role !== "ADMIN") return fail("Unauthorized", 401);

  const [users, jobs, applications, bookings] = await Promise.all([
    prisma.user.count(),
    prisma.job.count(),
    prisma.jobApplication.count(),
    prisma.booking.count()
  ]);

  return ok({ users, jobs, applications, bookings });
}
