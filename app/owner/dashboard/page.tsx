import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function OwnerDashboard() {
  const jobs = await prisma.job.findMany({ take: 5, orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Owner Dashboard</h2>
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="rounded-xl bg-white p-3"><p className="text-xs">Posted Jobs</p><p className="text-2xl font-bold">{jobs.length}</p></div>
        <Link href="/owner/jobs/new" className="rounded-xl bg-brand-500 p-3 text-white">Post New Job</Link>
      </div>
      <div className="space-y-2">
        {jobs.map((job) => (
          <Link key={job.id} href={`/jobs/${job.id}`} className="block rounded-xl border bg-white p-3">{job.title}</Link>
        ))}
      </div>
    </div>
  );
}
