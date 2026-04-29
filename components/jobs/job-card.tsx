import Link from "next/link";

type JobCardProps = {
  job: {
    id: string;
    title: string;
    category: string;
    location: string;
    urgency: string;
    budgetMin: number;
    budgetMax: number;
  };
};

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.id}`} className="block rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{job.title}</h3>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{job.urgency}</span>
      </div>
      <p className="mt-1 text-sm text-slate-600">{job.category} • {job.location}</p>
      <p className="mt-2 text-sm font-medium">₹{job.budgetMin} - ₹{job.budgetMax}</p>
    </Link>
  );
}
