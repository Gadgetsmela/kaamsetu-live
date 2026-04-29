"use client";

import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/notifications").then((r) => r.json()).then((d) => setItems(d.data || []));
  }, []);

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Notifications</h2>
      {items.length === 0 ? <p className="rounded-xl bg-white p-3">No notifications yet.</p> : items.map((n) => (
        <div key={n.id} className="rounded-xl bg-white p-3">
          <p className="font-medium">{n.title}</p><p className="text-sm">{n.body}</p>
        </div>
      ))}
    </div>
  );
}
