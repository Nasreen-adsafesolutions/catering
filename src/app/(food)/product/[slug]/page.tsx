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
    <div className="mb-1.5 flex justify-between text-sm font-medium"><span>{label}</span><span className="text-crust/50">{value}/5</span></div>
    <div className="flex gap-1.5" role="img" aria-label={`${label}: ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => <span key={i} className={`h-2 flex-1 rounded-full ${i <= value ? "bg-tomato" : "bg-crust/10"}`} />)}
    </div>
  </div>
);

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = await getProductBySlug((await params).slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product);

  return (
    <div className="mx-auto max-w-[1280px] px-5 pb-28 pt-28 md:px-8 md:pt-36">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-crust/55">
        <Link href="/" className="hover:text-tomato">Home</Link> / <Link href="/shop" className="hover:text-tomato">Shop</Link> / <span className="text-crust">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-sauce lg:sticky lg:top-28 lg:self-start">
          <SnackImage src={product.image} alt={product.name} art={product.art} priority sizes="(min-width:1024px) 50vw, 100vw" />
          {product.badge && <span className="absolute left-5 top-5 rounded-full bg-paper px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider">{product.badge}</span>}
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-tomato">{product.category} · {product.weight}</p>
          <h1 className="mt-3 text-[clamp(2.5rem,5.5vw,5rem)] font-head font-extrabold leading-[0.95] tracking-[-0.045em]">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <Stars value={product.rating} className="h-5 w-5" />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-crust/55">{product.reviewCount.toLocaleString()} reviews</span>
          </div>
          <p className="mt-6 font-head text-2xl font-bold text-crust/80">{product.tagline}</p>
          <p className="mt-6 text-4xl font-extrabold tracking-tight">{formatPrice(product.price)}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-crust/75">{product.description}</p>

          <ProductPurchase product={product} />

          <div className="mt-10 grid gap-5 rounded-[2rem] bg-sauce p-6 sm:grid-cols-3">
            <Meter label="Crunch" value={product.notes.crunch} />
            <Meter label="Heat" value={product.notes.heat} />
            <Meter label="Sweetness" value={product.notes.sweetness} />
          </div>

          <div className="mt-8 divide-y divide-crust/10 border-y border-crust/10">
            {[
              ["Ingredients", product.ingredients.join(", ") + "."],
              ["Delivery", "Free delivery on orders over ₹500. We confirm the delivery slot with you when we call about your order."],
              ["Freshness promise", "Made fresh in small batches. If anything isn’t right, tell us within 24 hours and we’ll replace it."],
            ].map(([t, body], i) => (
              <details key={t} open={i === 0} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold">
                  {t}
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-crust/20 transition-transform duration-300 group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 max-w-xl text-crust/70">{body}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-28" aria-labelledby="related">
        <h2 id="related" className="mb-10 text-4xl font-extrabold tracking-tight md:text-6xl">
          You might also <span className="text-tomato">like</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </div>
  );
}
