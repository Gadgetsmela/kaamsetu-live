export const dynamic = 'force-dynamic';

import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function WorkerDashboard() {
  const jobs = await prisma.job.findMany({ take: 6, orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Worker Dashboard</h2>
      <div className="grid grid-cols-2 gap-2">
        <Link href="/jobs" className="rounded-xl bg-brand-500 p-3 text-center text-white">Browse Jobs</Link>
        <Link href="/worker/profile" className="rounded-xl border bg-white p-3 text-center">Complete Profile</Link>
      </div>
      <p className="text-sm font-medium">Latest jobs</p>
      <div className="grid gap-2">
        {jobs.map((job) => (
          <Link key={job.id} href={`/jobs/${job.id}`} className="rounded-xl bg-white p-3">{job.title}</Link>
        ))}
      </div>
    </div>
  );
}
