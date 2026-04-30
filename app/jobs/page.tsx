import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: { owner: { select: { name: true } } },
  });

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">All Jobs</h1>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <Link key={job.id} href={`/jobs/${job.id}`}>
            <div className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition">
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-gray-600 line-clamp-2">{job.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Budget: ₹{job.budget} · Posted by {job.owner.name || "Owner"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}