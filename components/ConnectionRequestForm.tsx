"use client";

import { FormEvent, useState } from "react";

export function ConnectionRequestForm({ senderId }: { senderId: string }) {
  const [receiverId, setReceiverId] = useState("");
  const [status, setStatus] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("Sending...");

    const res = await fetch("/api/connection-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senderId, receiverId })
    });

    const payload = await res.json();
    if (!res.ok) {
      setStatus(payload.error ?? "Failed to send.");
      return;
    }

    setStatus("Connection request sent.");
    setReceiverId("");
  }

  return (
    <form onSubmit={onSubmit} className="card">
      <h3>Send Connection Request</h3>
      <input
        value={receiverId}
        onChange={(event) => setReceiverId(event.target.value)}
        placeholder="Target user ID"
        required
      />
      <button type="submit">Connect</button>
      <p>{status}</p>
    </form>
  );
}
