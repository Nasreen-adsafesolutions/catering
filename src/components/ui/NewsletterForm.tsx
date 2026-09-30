"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "done";

export function NewsletterForm({ tone = "light", className, stacked }: { tone?: "light" | "dark"; className?: string; stacked?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const { push } = useToast();
  const id = useId();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Pop in a valid email so we can send the good stuff.");
    setError("");
    setStatus("loading");
    setTimeout(() => {
      setStatus("done");
      push("You're in the Snack Club 🎉");
    }, 900);
  };

  const dark = tone === "dark";
  return (
    <form onSubmit={submit} noValidate className={cn("w-full", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <motion.p key="done" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-2xl italic">
            Welcome to the club. First drop lands soon.
          </motion.p>
        ) : (
          <motion.div key="form" exit={{ opacity: 0, y: -10 }} className={cn("flex flex-col gap-3", !stacked && "sm:flex-row")}>
            <label htmlFor={id} className="sr-only">Email address</label>
            <input
              id={id}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-err` : undefined}
              disabled={status === "loading"}
              className={cn("h-14 flex-1 rounded-full border-2 bg-transparent px-6 text-base outline-none transition placeholder:opacity-60 focus:border-yolk", dark ? "border-cream/30 text-cream" : "border-choc/25 text-choc focus:border-orange")}
            />
            <button type="submit" disabled={status === "loading"} className={cn("relative h-14 overflow-hidden rounded-full px-8 font-semibold whitespace-nowrap transition active:scale-95 disabled:opacity-70", dark ? "bg-yolk text-choc hover:bg-cream" : "bg-orange text-cream hover:bg-choc")}>
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> Joining…
                </span>
              ) : (
                "Join the Snack Club"
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {error && <p id={`${id}-err`} role="alert" className={cn("mt-2 pl-2 text-sm font-medium", dark ? "text-yolk" : "text-choc")}>{error}</p>}
    </form>
  );
}
