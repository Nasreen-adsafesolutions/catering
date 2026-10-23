import type { CartLine } from "./types";

const API = (process.env.NEXT_PUBLIC_CMS_API_URL || "").replace(/\/$/, "");
export const checkoutEnabled = !!API;

export interface CheckoutForm { name: string; phone: string; email: string; address: string; notes: string; event_date: string }

/** Sends the bag to the CMS as a new order. Catalogue items are re-priced server-side. */
export async function placeOrder(lines: CartLine[], f: CheckoutForm): Promise<{ number: string; total: number }> {
  const res = await fetch(`${API}/api/public/orders`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      customer: { name: f.name, phone: f.phone, email: f.email, address: f.address },
      notes: f.notes,
      event_date: f.event_date,
      items: lines.map((l) => (l.slug ? { slug: l.slug, qty: l.qty } : { name: l.name, price: l.price, qty: l.qty, note: l.note })),
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Could not place the order");
  return data;
}
