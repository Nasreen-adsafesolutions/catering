import "server-only";
import { products } from "@/data/products";
import { ingredients, moods, reviews, socialPosts } from "@/data/content";
import { resolveImage } from "./images";
import type { Ingredient, Product, SocialPost } from "./types";

/**
 * Data access layer. Every function is async and returns plain serialisable
 * objects — replace the bodies with CMS / API calls and nothing else changes.
 */

export async function getProducts(): Promise<Product[]> {
  return products.map((p) => ({ ...p, image: resolveImage(`products/${p.slug}`) }));
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
  return ingredients.map((i) => ({ ...i, image: resolveImage(`ingredients/${i.id}`) }));
}

export async function getSocialPosts(): Promise<SocialPost[]> {
  return socialPosts.map((s) => ({ ...s, image: resolveImage(`social/${s.id}`) }));
}

export async function getReviews() {
  return reviews;
}

export async function getMoods() {
  return moods;
}

export async function getSiteImages() {
  return { hero: resolveImage("hero"), story: resolveImage("story") };
}
