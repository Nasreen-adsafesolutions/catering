import clsx, { type ClassValue } from "clsx";

export const cn = (...v: ClassValue[]) => clsx(v);

const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });
export const formatPrice = (n: number) => gbp.format(n);

export const FREE_SHIPPING_THRESHOLD = 25;

/** Prefixes a /public path with the GitHub Pages base path (empty locally). */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
