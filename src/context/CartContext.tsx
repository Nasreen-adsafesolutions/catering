"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartLine, Product } from "@/lib/types";

interface CartState {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  hydrated: boolean;
  setOpen: (o: boolean) => void;
  addProduct: (p: Product, qty?: number) => void;
  addLine: (l: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const Ctx = createContext<CartState | null>(null);
const KEY = "crunchco.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, hydrated]);

  const addLine = useCallback((l: Omit<CartLine, "qty">, qty = 1) => {
    setLines((cur) => {
      const found = cur.find((x) => x.id === l.id);
      return found ? cur.map((x) => (x.id === l.id ? { ...x, qty: x.qty + qty } : x)) : [...cur, { ...l, qty }];
    });
  }, []);

  const addProduct = useCallback(
    (p: Product, qty = 1) => addLine({ id: p.id, name: p.name, price: p.price, image: p.image, art: p.art, slug: p.slug, note: p.weight }, qty),
    [addLine],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setLines((cur) => (qty <= 0 ? cur.filter((x) => x.id !== id) : cur.map((x) => (x.id === id ? { ...x, qty } : x))));
  }, []);
  const remove = useCallback((id: string) => setLines((cur) => cur.filter((x) => x.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartState>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.price, 0),
      open,
      hydrated,
      setOpen,
      addProduct,
      addLine,
      setQty,
      remove,
      clear,
    }),
    [lines, open, hydrated, addProduct, addLine, setQty, remove, clear],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
