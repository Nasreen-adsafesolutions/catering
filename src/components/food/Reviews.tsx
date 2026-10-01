import { REVIEWS } from "./data";
import { Reveal } from "./Reveal";

export function Reviews() {
  return (
    <section id="reviews" className="relative z-40 -mt-16 rounded-t-[2.5rem] bg-butter pb-32 pt-20 md:-mt-20 md:rounded-t-[4rem] md:pb-40 md:pt-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <Reveal className="grid items-end gap-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-tomato">Loved by hungry people</p>
            <h2 className="mt-3 font-head text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">2 million orders. Mostly very happy.</h2>
          </div>
          <dl className="flex gap-10 md:justify-end">
            <div><dt className="sr-only">Average rating</dt><dd className="font-head text-5xl font-extrabold">4.9<span className="text-tomato">★</span></dd><p className="text-sm font-semibold text-crust/60">average rating</p></div>
            <div><dt className="sr-only">On-time deliveries</dt><dd className="font-head text-5xl font-extrabold">96%</dd><p className="text-sm font-semibold text-crust/60">on time</p></div>
          </dl>
        </Reveal>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <li key={r.name} className={i === 1 ? "md:translate-y-8" : ""}>
              <Reveal delay={i * 0.1} className="h-full">
                <figure className="flex h-full flex-col rounded-[2rem] bg-paper p-8 transition-transform duration-300 hover:-translate-y-1.5">
                  <p aria-label="5 out of 5 stars" className="tracking-widest text-tomato">★★★★★</p>
                  <blockquote className="mt-4 flex-1 font-head text-xl font-semibold leading-snug">“{r.text}”</blockquote>
                  <figcaption className="mt-8 flex items-center gap-3">
                    <span aria-hidden className={`grid h-11 w-11 place-items-center rounded-full font-head font-extrabold text-white ${r.color}`}>{r.name[0]}</span>
                    <span><span className="block font-bold">{r.name}</span><span className="text-sm text-crust/55">{r.role}</span></span>
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
