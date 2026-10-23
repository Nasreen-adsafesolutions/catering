import "server-only";

/**
 * Thin client for the catering CMS API (../catering-cms-api). Returns null when
 * CMS_API_URL is unset or the API is unreachable, so callers fall back to the
 * bundled data and the site still builds.
 */
const BASE = (process.env.CMS_API_URL || "").replace(/\/$/, "");

export async function cms<T>(path: string): Promise<T | null> {
  if (!BASE) return null;
  try {
    const res = await fetch(`${BASE}/api/public${path}`, { next: { revalidate: 60 } });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

export interface SiteData {
  business: { name?: string; phone?: string; email?: string; address?: string; whatsapp?: string; instagram?: string; facebook?: string; youtube?: string };
  content: {
    hero?: { badge?: string; line1?: string; line2?: string; line3?: string; text?: string; cta_label?: string; note?: string; image?: string };
    promo?: { enabled?: boolean; eyebrow?: string; title?: string; highlight?: string; text?: string; code?: string; badge?: string; button_label?: string; button_link?: string };
    how?: { eyebrow?: string; title?: string; steps?: { title: string; text: string }[] };
    cta?: { title?: string; highlight?: string; text?: string };
    footer?: { headline1?: string; headline2?: string; blurb?: string; newsletter_title?: string; newsletter_text?: string };
    announcement?: { enabled?: boolean; text?: string };
    story?: { image?: string };
  };
  collections: Record<string, Record<string, unknown>[]>;
  pages: Record<string, { title: string; intro: string; sections: { h: string; p: string }[] }>;
}
