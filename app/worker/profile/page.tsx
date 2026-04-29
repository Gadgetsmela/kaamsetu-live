"use client";

import { useState } from "react";

export default function WorkerProfilePage() {
  const [form, setForm] = useState({ location: "", skills: "", experienceYears: 0, expectedWage: 0, availability: "", profilePhotoUrl: "", bio: "" });
  const [message, setMessage] = useState("");

  const submit = async () => {
    const payload = { ...form, skills: form.skills.split(",").map((x) => x.trim()).filter(Boolean), experienceYears: Number(form.experienceYears), expectedWage: Number(form.expectedWage) };
    const res = await fetch("/api/worker/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    setMessage(data.success ? "Profile updated" : data.message);
  };

  return (
    <div className="space-y-2 rounded-xl bg-white p-4">
      <h2 className="text-xl font-semibold">Worker Profile</h2>
      <input className="w-full rounded border p-2" placeholder="Location" onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <input className="w-full rounded border p-2" placeholder="Skills comma separated" onChange={(e) => setForm({ ...form, skills: e.target.value })} />
      <input className="w-full rounded border p-2" placeholder="Experience years" type="number" onChange={(e) => setForm({ ...form, experienceYears: Number(e.target.value) })} />
      <input className="w-full rounded border p-2" placeholder="Expected wage" type="number" onChange={(e) => setForm({ ...form, expectedWage: Number(e.target.value) })} />
      <input className="w-full rounded border p-2" placeholder="Availability" onChange={(e) => setForm({ ...form, availability: e.target.value })} />
      <button className="w-full rounded bg-brand-500 p-2 text-white" onClick={submit}>Save</button>
      <p>{message}</p>
    </div>
  );
}
