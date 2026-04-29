"use client";

import { useState } from "react";

export default function WorkerBookingDetails({ params }: { params: Promise<{ bookingId: string }> }) {
  const [message, setMessage] = useState("");

  const markProgress = async () => {
    const { bookingId } = await params;
    const res = await fetch(`/api/bookings/${bookingId}/progress`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "IN_PROGRESS", progressNote: "Worker started site work" })
    });
    const data = await res.json();
    setMessage(data.success ? "Progress updated" : data.message);
  };

  return (
    <div className="rounded-xl bg-white p-4">
      <h2 className="text-xl font-semibold">Booking Details</h2>
      <button onClick={markProgress} className="mt-3 rounded bg-brand-500 px-3 py-2 text-white">Mark In Progress</button>
      <p>{message}</p>
    </div>
  );
}
