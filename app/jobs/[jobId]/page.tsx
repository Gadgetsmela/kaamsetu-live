"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  location: string;
  owner: { name: string };
}

export default function JobDetailPage() {
  const params = useParams(); // useParams is synchronous in client components
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`/api/jobs/${params.jobId}`);
      const data = await res.json();
      setJob(data.data || data);
      setLoading(false);
    };
    fetchJob();
  }, [params.jobId]);

  const applyForJob = async () => {
    setApplying(true);
    const res = await fetch(`/api/jobs/${params.jobId}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coverMessage: "I am interested in this job" }),
    });
    const data = await res.json();
    setMessage(data.success ? "Application sent!" : data.message || "Failed to apply");
    setApplying(false);
    if (data.success) setTimeout(() => router.push("/worker/applications"), 1500);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!job) return <div className="p-4">Job not found</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-700">{job.description}</p>
      <p className="text-lg font-semibold">Budget: ₹{job.budget}</p>
      <p className="text-gray-500">Location: {job.location || "Remote/Onsite"}</p>
      <p className="text-sm text-gray-400">Posted by {job.owner.name}</p>

      {message && <div className="rounded bg-blue-100 p-2 text-blue-800">{message}</div>}

      <button
        onClick={applyForJob}
        disabled={applying}
        className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700 disabled:bg-gray-400"
      >
        {applying ? "Applying..." : "Apply for this job"}
      </button>
    </div>
  );
}