"use client";

import { useState } from "react";

const initial = {
  title: "",
  category: "",
  description: "",
  budgetMin: 0,
  budgetMax: 0,
  location: "",
  requiredDateTime: "",
  workersRequired: 1,
  skillRequirement: "",
  contactPreference: "Phone",
  urgency: "MEDIUM",
  imageUrls: [] as string[]
};

export default function CreateJobPage() {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");

  const submit = async () => {
    const payload = { ...form, skillRequirement: form.skillRequirement.split(",").map((s) => s.trim()).filter(Boolean) };
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    setMessage(data.success ? "Job posted" : data.message);
  };

  return (
    <div className="space-y-2 rounded-xl bg-white p-4">
      <h2 className="text-xl font-semibold">Create Job</h2>
      {Object.entries(form).filter(([k]) => !["imageUrls", "skillRequirement"].includes(k)).map(([key, value]) => (
        <input
          key={key}
          className="w-full rounded border p-2"
          placeholder={key}
          value={String(value)}
          onChange={(e) => setForm({ ...form, [key]: ["budgetMin", "budgetMax", "workersRequired"].includes(key) ? Number(e.target.value) : e.target.value })}
        />
      ))}
      <input className="w-full rounded border p-2" placeholder="skillRequirement comma separated" onChange={(e) => setForm({ ...form, skillRequirement: e.target.value })} />
      <button className="w-full rounded bg-brand-500 p-2 text-white" onClick={submit}>Post Job</button>
      <p>{message}</p>
    </div>
  );
}
