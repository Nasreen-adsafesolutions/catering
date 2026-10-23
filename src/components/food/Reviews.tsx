import type { Review } from "@/lib/types";
import { Reveal } from "./Reveal";

const COLORS = ["bg-tomato", "bg-basil", "bg-crust"];

export function Reviews({ items, rating }: { items: Review[]; rating: number }) {
  if (!items.length) return null;
  return (
    <section id="reviews" className="relative z-40 -mt-16 rounded-t-[2.5rem] bg-butter pb-32 pt-20 md:-mt-20 md:rounded-t-[4rem] md:pb-40 md:pt-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <Reveal className="grid items-end gap-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-tomato">Loved by hungry people</p>
            <h2 className="mt-3 font-head text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">Straight from our customers.</h2>
          </div>
          <dl className="flex gap-10 md:justify-end">
            <div><dt className="sr-only">Average rating</dt><dd className="font-head text-5xl font-extrabold">{rating.toFixed(1)}<span className="text-tomato">★</span></dd><p className="text-sm font-semibold text-crust/60">average rating</p></div>
          </dl>
        </Reveal>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {items.slice(0, 6).map((r, i) => (
            <li key={r.id} className={i % 3 === 1 ? "md:translate-y-8" : ""}>
              <Reveal delay={(i % 3) * 0.1} className="h-full">
                <figure className="flex h-full flex-col rounded-[2rem] bg-paper p-8 transition-transform duration-300 hover:-translate-y-1.5">
                  <p aria-label={`${r.rating} out of 5 stars`} className="tracking-widest text-tomato">{"★".repeat(Math.round(r.rating))}</p>
                  <blockquote className="mt-4 flex-1 font-head text-xl font-semibold leading-snug">“{r.quote}”</blockquote>
                  <figcaption className="mt-8 flex items-center gap-3">
                    <span aria-hidden className={`grid h-11 w-11 place-items-center rounded-full font-head font-extrabold text-white ${COLORS[i % COLORS.length]}`}>{r.name[0]}</span>
                    <span><span className="block font-bold">{r.name}</span><span className="text-sm text-crust/55">{[r.city, r.product].filter(Boolean).join(" · ")}</span></span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
