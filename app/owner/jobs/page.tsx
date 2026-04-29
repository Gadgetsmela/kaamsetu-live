export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";

export default async function OwnerJobsPage() {
  const jobs = await prisma.job.findMany({ include: { applications: true }, orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">My Posted Jobs</h2>
      {jobs.map((job) => (
        <div className="rounded-xl bg-white p-3" key={job.id}>
          <p className="font-medium">{job.title}</p>
          <p className="text-sm text-slate-600">Applicants: {job.applications.length}</p>
        </div>
      ))}
    </div>
  );
}
