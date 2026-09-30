"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { FREE_SHIPPING_THRESHOLD, formatPrice } from "@/lib/utils";
import { SnackImage } from "../art/SnackImage";
import { Piece } from "../art/Pieces";
import { ButtonEl } from "../ui/Button";
import { QuantityControl } from "../shop/QuantityControl";

export function CartDrawer() {
  const { open, setOpen, lines, subtotal, count, setQty, remove, clear } = useCart();
  const { push } = useToast();
  const close = () => setOpen(false);
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
          <motion.button aria-label="Close cart" onClick={close} className="absolute inset-0 cursor-default bg-choc/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-choc/10 px-6 py-5">
              <h2 className="text-2xl font-extrabold tracking-tight">
                Your bag <span className="font-serif font-normal italic text-orange">({count})</span>
              </h2>
              <button onClick={close} aria-label="Close cart" className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-choc/10">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M5 5l14 14M19 5L5 19" /></svg>
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <div className="relative mb-6 h-32 w-32">
                  <Piece kind="popcorn" className="absolute left-0 top-4 h-20 w-20 animate-float opacity-90" />
                  <Piece kind="chip" className="absolute right-0 top-0 h-20 w-20 animate-float" rotate={20} />
                  <Piece kind="choc" className="absolute bottom-0 left-8 h-16 w-16 animate-float" rotate={-12} />
                </div>
                <h3 className="font-serif text-3xl italic">Nothing crunchy here yet.</h3>
                <p className="mt-2 text-choc/60">Your bag is empty. Let&apos;s fix that.</p>
                <Link href="/shop" onClick={close} className="mt-6 rounded-full bg-orange px-7 py-3 font-semibold text-cream transition hover:bg-choc">Shop snacks</Link>
              </div>
            ) : (
              <>
                <div className="border-b border-choc/10 px-6 py-4 text-sm">
                  {remaining > 0 ? (
                    <p>Add <strong>{formatPrice(remaining)}</strong> for free shipping</p>
                  ) : (
                    <p className="font-semibold text-orange">🎉 You&apos;ve unlocked free shipping</p>
                  )}
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-choc/10">
                    {/* scaleX (composited) instead of width (layout) — same fill effect, no layout recalculation per frame */}
                    <motion.div className="h-full w-full origin-left rounded-full bg-orange" animate={{ scaleX: Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD) }} transition={{ duration: 0.3, ease: [0.2, 0.7, 0.1, 1] }} />
                  </div>
                </div>
                <ul className="flex-1 space-y-1 overflow-y-auto px-6 py-4">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li key={l.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex gap-4 border-b border-choc/10 py-4 last:border-0">
                        <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                          {l.art && <SnackImage src={l.image} alt={l.name} art={l.art} sizes="96px" />}
                        </span>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            {l.slug ? <Link href={`/product/${l.slug}`} onClick={close} className="font-semibold leading-tight hover:text-orange">{l.name}</Link> : <span className="font-semibold leading-tight">{l.name}</span>}
                            <span className="font-semibold">{formatPrice(l.price * l.qty)}</span>
                          </div>
                          {l.note && <p className="mt-0.5 text-sm text-choc/55">{l.note}</p>}
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <QuantityControl value={l.qty} onChange={(q) => setQty(l.id, q)} label={l.name} size="sm" />
                            <button onClick={() => remove(l.id)} className="text-sm text-choc/50 underline-offset-4 transition hover:text-choc hover:underline">Remove</button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <footer className="space-y-3 border-t border-choc/10 bg-cream-2/60 px-6 py-5">
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-medium">Subtotal</span>
                    <motion.span key={subtotal} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-extrabold">{formatPrice(subtotal)}</motion.span>
                  </div>
                  <p className="text-xs text-choc/55">Shipping and taxes calculated at checkout.</p>
                  <ButtonEl size="lg" className="w-full" onClick={() => { push("Checkout is a demo — no payment taken."); }}>
                    Checkout
                  </ButtonEl>
                  <button onClick={() => { clear(); push("Bag emptied"); }} className="w-full text-center text-sm text-choc/50 transition hover:text-choc">Clear bag</button>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
