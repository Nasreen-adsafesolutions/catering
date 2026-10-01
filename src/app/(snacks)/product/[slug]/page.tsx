import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SnackImage } from "@/components/art/SnackImage";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductPurchase } from "@/components/shop/ProductPurchase";
import { Stars } from "@/components/ui/Stars";
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getProductBySlug((await params).slug);
  return p ? { title: p.name, description: p.tagline } : {};
}

const Meter = ({ label, value }: { label: string; value: number }) => (
  <div>
    <div className="mb-1.5 flex justify-between text-sm font-medium"><span>{label}</span><span className="text-choc/50">{value}/5</span></div>
    <div className="flex gap-1.5" role="img" aria-label={`${label}: ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => <span key={i} className={`h-2 flex-1 rounded-full ${i <= value ? "bg-orange" : "bg-choc/10"}`} />)}
    </div>
  </div>
);

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = await getProductBySlug((await params).slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product);

  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-28 pt-28 md:px-10 md:pt-36">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-choc/55">
        <Link href="/snacks" className="hover:text-orange">Home</Link> / <Link href="/shop" className="hover:text-orange">Shop</Link> / <span className="text-choc">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-square overflow-hidden rounded-[14px] lg:sticky lg:top-28 lg:self-start">
          <SnackImage src={product.image} alt={product.name} art={product.art} priority sizes="(min-width:1024px) 50vw, 100vw" />
          {product.badge && <span className="absolute left-5 top-5 rounded-full bg-cream px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider">{product.badge}</span>}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange">{product.category} · {product.weight}</p>
          <h1 className="mt-3 text-[clamp(2.5rem,5.5vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <Stars value={product.rating} className="h-5 w-5" />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-choc/55">{product.reviewCount.toLocaleString()} reviews</span>
          </div>
          <p className="mt-6 font-serif text-2xl italic text-choc/80">{product.tagline}</p>
          <p className="mt-6 text-4xl font-extrabold tracking-tight">{formatPrice(product.price)}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-choc/75">{product.description}</p>

          <ProductPurchase product={product} />

          <div className="mt-10 grid gap-5 rounded-xl bg-cream-2 p-6 sm:grid-cols-3">
            <Meter label="Crunch" value={product.notes.crunch} />
            <Meter label="Heat" value={product.notes.heat} />
            <Meter label="Sweetness" value={product.notes.sweetness} />
          </div>

          <div className="mt-8 divide-y divide-choc/10 border-y border-choc/10">
            {[
              ["Ingredients", product.ingredients.join(", ") + "."],
              ["Shipping", "Free UK delivery over £25. Standard 2–4 working days, tracked."],
              ["Returns", "Unopened items can be returned within 14 days of delivery."],
            ].map(([t, body], i) => (
              <details key={t} open={i === 0} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold">
                  {t}
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-choc/20 transition-transform duration-300 group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 max-w-xl text-choc/70">{body}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-28" aria-labelledby="related">
        <h2 id="related" className="mb-10 text-4xl font-extrabold tracking-tight md:text-6xl">
          You might also <span className="font-serif font-normal italic text-orange">crave</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </div>
  );
}
