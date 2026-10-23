"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { checkoutEnabled, placeOrder, type CheckoutForm } from "@/lib/checkout";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { FREE_SHIPPING_THRESHOLD, formatPrice } from "@/lib/utils";
import { SnackImage } from "../art/SnackImage";
import { ButtonEl } from "../ui/Button";
import { QuantityControl } from "../shop/QuantityControl";

export function CartDrawer() {
  const { open, setOpen, lines, subtotal, count, setQty, remove, clear } = useCart();
  const { push } = useToast();
  const close = () => setOpen(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<CheckoutForm>({ name: "", phone: "", email: "", address: "", notes: "", event_date: "" });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const r = await placeOrder(lines, form);
      clear();
      setCheckingOut(false);
      close();
      push(`Order ${r.number} received — we'll contact you to confirm.`);
    } catch (err) {
      push(err instanceof Error ? err.message : "Something went wrong");
    }
    setBusy(false);
  };
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[75]">
          <motion.button aria-label="Close cart" onClick={close} className="absolute inset-0 cursor-default bg-crust/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-crust/10 px-6 py-5">
              <h2 className="text-2xl font-extrabold tracking-tight">
                Your bag <span className="font-head font-extrabold text-tomato">({count})</span>
              </h2>
              <button onClick={close} aria-label="Close cart" className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-crust/10">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M5 5l14 14M19 5L5 19" /></svg>
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <h3 className="font-head text-3xl font-bold">Your bag is empty.</h3>
                <p className="mt-2 text-crust/60">Add something tasty from the menu.</p>
                <Link href="/shop" onClick={close} className="mt-6 rounded-full bg-tomato px-7 py-3 font-semibold text-paper transition hover:bg-crust">Browse the menu</Link>
              </div>
            ) : (
              <>
                <div className="border-b border-crust/10 px-6 py-4 text-sm">
                  {remaining > 0 ? (
                    <p>Add <strong>{formatPrice(remaining)}</strong> for free delivery</p>
                  ) : (
                    <p className="font-semibold text-tomato">🎉 You&apos;ve unlocked free delivery</p>
                  )}
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-crust/10">
                    {/* scaleX (composited) instead of width (layout) — same fill effect, no layout recalculation per frame */}
                    <motion.div className="h-full w-full origin-left rounded-full bg-tomato" animate={{ scaleX: Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD) }} transition={{ duration: 0.3, ease: [0.2, 0.7, 0.1, 1] }} />
                  </div>
                </div>
                <ul className="flex-1 space-y-1 overflow-y-auto px-6 py-4">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li key={l.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex gap-4 border-b border-crust/10 py-4 last:border-0">
                        <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                          {l.art && <SnackImage src={l.image} alt={l.name} art={l.art} sizes="96px" />}
                        </span>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            {l.slug ? <Link href={`/product/${l.slug}`} onClick={close} className="font-semibold leading-tight hover:text-tomato">{l.name}</Link> : <span className="font-semibold leading-tight">{l.name}</span>}
                            <span className="font-semibold">{formatPrice(l.price * l.qty)}</span>
                          </div>
                          {l.note && <p className="mt-0.5 text-sm text-crust/55">{l.note}</p>}
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <QuantityControl value={l.qty} onChange={(q) => setQty(l.id, q)} label={l.name} size="sm" />
                            <button onClick={() => remove(l.id)} className="text-sm text-crust/50 underline-offset-4 transition hover:text-crust hover:underline">Remove</button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <footer className="space-y-3 border-t border-crust/10 bg-sauce/60 px-6 py-5">
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-medium">Subtotal</span>
                    <motion.span key={subtotal} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-extrabold">{formatPrice(subtotal)}</motion.span>
                  </div>
                  <p className="text-xs text-crust/55">Delivery and taxes are confirmed when we call you.</p>
                  {checkingOut ? (
                    <form onSubmit={submit} className="space-y-2">
                      {([["name", "Your name", true], ["phone", "Phone / WhatsApp", true], ["email", "Email (optional)", false], ["address", "Delivery address", true]] as const).map(([k, label, req]) => (
                        <input key={k} required={req} placeholder={label} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="w-full rounded-xl border border-crust/15 bg-paper px-4 py-2.5 text-sm" />
                      ))}
                      <input type="date" aria-label="Needed by" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} className="w-full rounded-xl border border-crust/15 bg-paper px-4 py-2.5 text-sm" />
                      <textarea placeholder="Notes (optional)" rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full rounded-xl border border-crust/15 bg-paper px-4 py-2.5 text-sm" />
                      <ButtonEl size="lg" className="w-full" type="submit" disabled={busy}>{busy ? "Sending…" : "Place order"}</ButtonEl>
                      <button type="button" onClick={() => setCheckingOut(false)} className="w-full text-center text-sm text-crust/50 hover:text-crust">Back</button>
                    </form>
                  ) : (
                    <ButtonEl size="lg" className="w-full" onClick={() => (checkoutEnabled ? setCheckingOut(true) : push("Checkout is a demo — no payment taken."))}>
                      Checkout
                    </ButtonEl>
                  )}
                  <button onClick={() => { clear(); push("Bag emptied"); }} className="w-full text-center text-sm text-crust/50 transition hover:text-crust">Clear bag</button>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
