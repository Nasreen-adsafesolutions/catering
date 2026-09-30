import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopClient } from "@/components/shop/ShopClient";
import { getMoods, getProducts } from "@/lib/api";

export const metadata: Metadata = { title: "Shop snacks", description: "Chips, popcorn, nuts, chocolate, cookies and snack boxes." };

export default async function ShopPage() {
  const [products, moods] = await Promise.all([getProducts(), getMoods()]);
  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-28 pt-32 md:px-10 md:pt-40">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-orange">The full range</p>
      <h1 className="mb-10 text-[clamp(3rem,8vw,7.5rem)] font-extrabold leading-[0.92] tracking-[-0.05em]">
        Shop <span className="font-serif font-normal italic text-orange">snacks</span>
      </h1>
      {/* useSearchParams inside ShopClient needs a Suspense boundary for the static export build */}
      <Suspense fallback={null}>
        <ShopClient products={products} moods={moods} />
      </Suspense>
    </div>
  );
}
