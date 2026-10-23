"use client";

import { useState } from "react";

const API = (process.env.NEXT_PUBLIC_CMS_API_URL || "").replace(/\/$/, "");
const input = "w-full rounded-2xl border-2 border-crust/15 bg-white px-4 py-3 outline-none transition focus:border-tomato";

/** Contact-form → CMS "Enquiries". Hidden when no CMS API is configured. */
export function EnquiryForm() {
  const [f, setF] = useState({ name: "", phone: "", email: "", message: "" });
  const [state, setState] = useState<"idle" | "busy" | "done" | string>("idle");
  if (!API) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("busy");
    try {
      const res = await fetch(`${API}/api/public/enquiries`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(f) });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Could not send your message");
      setState("done");
    } catch (err) {
      setState(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (state === "done") return <p role="status" className="mt-16 rounded-3xl bg-basil px-7 py-5 font-bold text-white">Thank you! We’ll get back to you shortly.</p>;
  return (
    <form onSubmit={submit} className="mt-16 space-y-3 rounded-[2rem] bg-sauce p-6 md:p-8">
      <h2 className="font-head text-2xl font-extrabold">Send us a message</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <input required placeholder="Your name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={input} />
        <input placeholder="Phone / WhatsApp" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} className={input} />
      </div>
      <input type="email" placeholder="Email (optional if you gave a phone)" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={input} />
      <textarea required rows={4} placeholder="Tell us what you need — date, headcount, items…" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} className={input} />
      {state !== "idle" && state !== "busy" && <p className="text-sm font-semibold text-tomato">{state}</p>}
      <button disabled={state === "busy"} className="rounded-full bg-tomato px-8 py-3.5 font-bold text-white transition hover:bg-crust disabled:opacity-50">{state === "busy" ? "Sending…" : "Send message"}</button>
    </form>
  );
}
