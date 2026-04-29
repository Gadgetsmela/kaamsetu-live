"use client";

import { useState } from "react";

export default function OwnerBookingDetails({ params }: { params: Promise<{ bookingId: string }> }) {
  const [message, setMessage] = useState("");

  const markCompleted = async () => {
    const { bookingId } = await params;
    const res = await fetch(`/api/bookings/${bookingId}/progress`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "COMPLETED", progressNote: "Owner marked complete" })
    });
    const data = await res.json();
    setMessage(data.success ? "Booking completed" : data.message);
  };

  return (
    <div className="rounded-xl bg-white p-4">
      <h2 className="text-xl font-semibold">Booking Details</h2>
      <button onClick={markCompleted} className="mt-3 rounded bg-brand-500 px-3 py-2 text-white">Mark Completed</button>
      <p>{message}</p>
    </div>
  );
}
