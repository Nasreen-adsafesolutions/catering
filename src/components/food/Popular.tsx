import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductCard } from "../shop/ProductCard";
import { Reveal } from "./Reveal";

export function Popular({ products }: { products: Product[] }) {
  return (
    <section id="popular" className="relative bg-paper pb-36 md:pb-44">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-tomato">Popular right now</p>
            <h2 className="mt-3 max-w-xl font-head text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">What everyone’s ordering.</h2>
          </div>
          <Link href="/shop" className="group inline-flex items-center gap-2 rounded-full border-2 border-crust px-6 py-3 font-bold transition hover:bg-crust hover:text-paper">
            See the full menu <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>

        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <li key={p.id} className={i % 2 === 1 ? "lg:translate-y-12" : ""}>
              <ProductCard product={p} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
