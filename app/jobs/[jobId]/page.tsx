"use client";

import { useEffect, useState } from "react";

export default function JobDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  const [job, setJob] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    params.then(async ({ jobId }) => {
      const res = await fetch(`/api/jobs/${jobId}`);
      const data = await res.json();
      setJob(data.data);
    });
  }, [params]);

  const apply = async () => {
    const res = await fetch(`/api/jobs/${job.id}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coverMessage: "I can do this work", proposedWage: job.budgetMin })
    });
    const data = await res.json();
    setMessage(data.success ? "Applied successfully" : data.message);
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-sm text-slate-600">{job.description}</p>
      <div className="flex flex-wrap gap-2 text-xs">
        {job.skillRequirement.map((skill: string) => <span key={skill} className="rounded-full bg-slate-100 px-2 py-1">{skill}</span>)}
      </div>
      <button className="rounded bg-brand-500 px-3 py-2 text-white" onClick={apply}>Apply / Book</button>
      <a href={`https://wa.me/${job.owner.phone?.replace(/[^\d]/g, "") || ""}`} className="block rounded border p-2 text-center">WhatsApp Owner</a>
      <p className="text-sm">{message}</p>
    </div>
  );
}
