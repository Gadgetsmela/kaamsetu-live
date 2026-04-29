"use client";

import { useEffect, useState } from "react";

export default function ChatPage({ params }: { params: Promise<{ jobId: string }> }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [jobId, setJobId] = useState("");

  useEffect(() => {
    params.then(({ jobId }) => {
      setJobId(jobId);
      fetch(`/api/chat/${jobId}`).then((r) => r.json()).then((d) => setMessages(d.data || []));
    });
  }, [params]);

  const send = async () => {
    await fetch(`/api/chat/${jobId}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: text }) });
    const data = await (await fetch(`/api/chat/${jobId}`)).json();
    setMessages(data.data || []);
    setText("");
  };

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Chat</h2>
      <div className="space-y-2 rounded-xl bg-white p-3">
        {messages.map((m) => <p key={m.id} className="text-sm">{m.content}</p>)}
      </div>
      <div className="flex gap-2">
        <input className="flex-1 rounded border p-2" value={text} onChange={(e) => setText(e.target.value)} />
        <button className="rounded bg-brand-500 px-3 text-white" onClick={send}>Send</button>
      </div>
    </div>
  );
}
