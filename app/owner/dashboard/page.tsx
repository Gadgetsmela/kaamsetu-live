import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function OwnerDashboard() {
  const jobs = await prisma.job.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, createdAt: true },
  });

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-semibold">Owner Dashboard</h2>
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="rounded-xl bg-white p-3 shadow">Total Jobs: {jobs.length}</div>
        <Link
          href="/owner/jobs/new"
          className="rounded-xl bg-blue-600 p-3 text-white hover:bg-blue-700"
        >
          Post New Job
        </Link>
      </div>

      <p className="font-medium">Recent jobs</p>
      <div className="space-y-2">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/owner/jobs/${job.id}`}
            className="block rounded-xl border bg-white p-3 shadow-sm"
          >
            {job.title}
          </Link>
        ))}
      </div>
    </div>
  );
}