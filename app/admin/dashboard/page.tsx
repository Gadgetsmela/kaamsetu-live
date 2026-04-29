"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard").then((r) => r.json()).then((d) => setStats(d.data));
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(stats).map(([k, v]) => (
          <div key={k} className="rounded-xl bg-white p-3 text-center">
            <p className="text-xs uppercase text-slate-500">{k}</p>
            <p className="text-xl font-bold">{String(v)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
