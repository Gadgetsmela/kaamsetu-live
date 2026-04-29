import { prisma } from "@/lib/prisma";

export default async function ApplicationsPage() {
  const applications = await prisma.jobApplication.findMany({ include: { job: true }, orderBy: { createdAt: "desc" }, take: 20 });
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">My Applications</h2>
      {applications.map((a) => (
        <div className="rounded-xl bg-white p-3" key={a.id}>
          <p>{a.job.title}</p>
          <p className="text-xs">Status: {a.status}</p>
        </div>
      ))}
    </div>
  );
}
