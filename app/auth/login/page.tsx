"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error || data.message || "Login failed");

    const role = data.user?.role || data.data?.role;
    if (role === "OWNER") router.push("/owner/dashboard");
    else if (role === "WORKER") router.push("/worker/dashboard");
    else router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login to KaamSetu</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="tel"
          placeholder="Phone number"
          className="w-full border p-2 mb-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
        <p className="text-center text-sm mt-4">
          No account? <a href="/role-select" className="text-blue-600">Sign up</a>
        </p>
      </form>
    </div>
  );
}