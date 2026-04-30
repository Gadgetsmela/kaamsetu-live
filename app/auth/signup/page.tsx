"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", password: "", role: "WORKER" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error || data.message || "Signup failed");

    // After signup, redirect to login
    router.push("/auth/login?registered=true");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign up</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input type="text" placeholder="Full name" className="w-full border p-2 mb-2 rounded"
          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input type="tel" placeholder="Phone number" className="w-full border p-2 mb-2 rounded"
          value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
        <input type="password" placeholder="Password" className="w-full border p-2 mb-2 rounded"
          value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
        <select className="w-full border p-2 mb-4 rounded" value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="WORKER">Worker / Job Seeker</option>
          <option value="OWNER">Owner / Employer</option>
        </select>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Sign up</button>
        <p className="text-center text-sm mt-4">Already have an account? <a href="/auth/login" className="text-blue-600">Login</a></p>
      </form>
    </div>
  );
}