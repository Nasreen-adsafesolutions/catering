import clsx, { type ClassValue } from "clsx";

export const cn = (...v: ClassValue[]) => clsx(v);

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});
export const formatPrice = (n: number) => inr.format(n);

export const FREE_SHIPPING_THRESHOLD = 500;

/** Prefixes a /public path with the GitHub Pages base path (empty locally). */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
