"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("OTP/mobile auth placeholder available in UI.");

  const submit = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password })
    });
    const data = await res.json();
    if (!data.success) return setMessage(data.message);
    if (data.data.role === "OWNER") router.push("/owner/dashboard");
    else if (data.data.role === "WORKER") router.push("/worker/dashboard");
    else router.push("/admin/dashboard");
  };

  return (
    <div className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
      <h2 className="text-xl font-semibold">Login</h2>
      <input className="w-full rounded border p-2" placeholder="Mobile number" onChange={(e) => setPhone(e.target.value)} />
      <input className="w-full rounded border p-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={submit} className="w-full rounded bg-brand-500 p-2 text-white">Login</button>
      <p className="text-xs text-slate-600">{message}</p>
    </div>
  );
}
