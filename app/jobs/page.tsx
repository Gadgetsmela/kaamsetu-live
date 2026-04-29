import { JobCard } from "@/components/jobs/job-card";

async function getJobs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/jobs`, { cache: "no-store" });
  const data = await res.json();
  return data.data as any[];
}

export default async function JobsPage() {
  const jobs = await getJobs();
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Job Listings</h2>
      <div className="grid gap-3">
        {jobs.length === 0 ? <p className="rounded-xl bg-white p-4">No jobs found.</p> : jobs.map((job) => <JobCard key={job.id} job={job} />)}
      </div>
    </div>
  );
}
