import "server-only";
import { products as localProducts } from "@/data/products";
import { ingredients, moods, reviews, socialPosts, infoPages } from "@/data/content";
import { cms, type SiteData } from "./cms";
import { resolveImage } from "./images";
import type { Ingredient, Mood, Product, Review, SocialPost } from "./types";

/**
 * Data access layer. Content comes from the CMS API (CMS_API_URL); when it is
 * not configured or unreachable the bundled data in src/data is used instead.
 */

const site = () => cms<SiteData>("/site");

export async function getProducts(): Promise<Product[]> {
  const remote = await cms<Product[]>("/products");
  if (remote) return remote.map((p) => ({ ...p, image: p.image ?? resolveImage(`products/${p.slug}`) }));
  return localProducts.map((p) => ({ ...p, image: resolveImage(`products/${p.slug}`) }));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.featured);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}

export async function getRelatedProducts(product: Product, limit = 3): Promise<Product[]> {
  const all = await getProducts();
  return all
    .filter((p) => p.id !== product.id)
    .map((p) => ({ p, score: p.moods.filter((m) => product.moods.includes(m)).length + (p.category === product.category ? 2 : 0) }))
    .sort((a, b) => b.score - a.score || b.p.rating - a.p.rating)
    .slice(0, limit)
    .map((x) => x.p);
}

export async function getIngredients(): Promise<Ingredient[]> {
  const s = await site();
  const remote = s?.collections.ingredients as unknown as Ingredient[] | undefined;
  if (remote?.length) return remote;
  return ingredients.map((i) => ({ ...i, image: resolveImage(`ingredients/${i.id}`) }));
}

export async function getSocialPosts(): Promise<SocialPost[]> {
  const s = await site();
  const remote = s?.collections.social as unknown as SocialPost[] | undefined;
  if (remote?.length) return remote;
  return socialPosts.map((p) => ({ ...p, image: resolveImage(`social/${p.id}`) }));
}

export async function getReviews(): Promise<Review[]> {
  const s = await site();
  const remote = s?.collections.reviews as unknown as Review[] | undefined;
  return remote?.length ? remote : reviews;
}

export async function getMoods(): Promise<Mood[]> {
  const s = await site();
  const remote = s?.collections.moods as unknown as Mood[] | undefined;
  return remote?.length ? remote : moods;
}

export async function getSiteImages() {
  const s = await site();
  return { hero: s?.content.hero?.image || resolveImage("hero"), story: s?.content.story?.image || resolveImage("story") };
}

export async function getSiteContent() {
  const s = await site();
  return { business: s?.business ?? {}, ...(s?.content ?? {}) };
}

export async function getPages() {
  const s = await site();
  return s && Object.keys(s.pages).length ? s.pages : infoPages;
}
