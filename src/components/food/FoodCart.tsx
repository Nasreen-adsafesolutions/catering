"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface FoodCart {
  count: number;
  total: number;
  add: (price: number) => void;
}

const Ctx = createContext<FoodCart | null>(null);

/** Tiny demo bag: just a running count and total, enough to make "Add" feel real. */
export function FoodCartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({ count: 0, total: 0 });
  const add = useCallback((price: number) => setState((s) => ({ count: s.count + 1, total: s.total + price })), []);
  const value = useMemo(() => ({ ...state, add }), [state, add]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFoodCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useFoodCart must be used inside FoodCartProvider");
  return c;
}
