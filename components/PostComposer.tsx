"use client";

import { FormEvent, useState } from "react";

export function PostComposer({ userId }: { userId: string }) {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("Posting...");

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ authorId: userId, content })
    });

    if (!res.ok) {
      setStatus("Could not create post.");
      return;
    }

    setContent("");
    setStatus("Posted! Refresh to see your new update.");
  }

  return (
    <form onSubmit={onSubmit} className="card">
      <h3>Create Post</h3>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={4}
        required
        minLength={3}
        placeholder="What's happening in your niche world?"
      />
      <button type="submit">Share</button>
      <p>{status}</p>
    </form>
  );
}
