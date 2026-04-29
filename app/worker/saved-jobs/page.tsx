export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";

export default async function SavedJobsPage() {
  const savedJobs = await prisma.savedJob.findMany({ include: { job: true }, orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Saved Jobs</h2>
      {savedJobs.length === 0 ? <p className="rounded-xl bg-white p-3">No saved jobs.</p> : savedJobs.map((s) => (
        <div key={s.id} className="rounded-xl bg-white p-3">{s.job.title}</div>
      ))}
    </div>
  );
}
