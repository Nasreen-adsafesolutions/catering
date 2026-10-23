import Link from "next/link";
import { getPages, getProducts, getSiteContent } from "@/lib/api";
import { BrandLogo } from "./Logo";
import { Reveal } from "./Reveal";

export async function FoodFooter() {
  const [{ business, footer = {} }, pages, products] = await Promise.all([getSiteContent(), getPages(), getProducts()]);
  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
  const name = business.name || "Zaika Ghar";
  const socials = ([["Instagram", business.instagram], ["Facebook", business.facebook], ["YouTube", business.youtube]] as const).filter(([, u]) => u);
  const link = "inline-block transition hover:translate-x-1 hover:text-butter";

  return (
    <footer className="relative z-50 -mt-16 overflow-hidden rounded-t-[2.5rem] bg-crust pt-20 text-paper md:-mt-20 md:rounded-t-[4rem] md:pt-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <h2 className="max-w-3xl font-head text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">{footer.headline1 || "Taste the"} <span className="text-butter">{footer.headline2 || "difference."}</span></h2>
          <p className="mt-5 max-w-md text-paper/65">{footer.blurb || "Authentic homemade sweets, snacks and party platters."}</p>
        </Reveal>

        <div className="mt-20 grid gap-12 border-t border-paper/15 pt-14 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <BrandLogo name={name} light />
            {business.address && <p className="mt-4 max-w-xs whitespace-pre-line text-paper/60">{business.address}</p>}
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-paper/45">Menu</h3>
              <ul className="space-y-2.5">
                <li><Link href="/shop" className={link}>All items</Link></li>
                {categories.map((c) => <li key={c}><Link href={`/shop?cat=${encodeURIComponent(c)}`} className={link}>{c}</Link></li>)}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-paper/45">Info</h3>
              <ul className="space-y-2.5">
                {Object.entries(pages).map(([slug, p]) => <li key={slug}><Link href={`/${slug}`} className={link}>{p.title}</Link></li>)}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-paper/45">Get in touch</h3>
              <ul className="space-y-2.5">
                {business.phone && <li><a href={`tel:${business.phone.replace(/\s/g, "")}`} className={link}>{business.phone}</a></li>}
                {business.whatsapp && <li><a href={`https://wa.me/${business.whatsapp}`} className={link}>WhatsApp</a></li>}
                {business.email && <li><a href={`mailto:${business.email}`} className={link}>{business.email}</a></li>}
                {socials.map(([s, u]) => <li key={s}><a href={u} target="_blank" rel="noreferrer" className={link}>{s} ↗</a></li>)}
              </ul>
            </div>
          </nav>
        </div>

        <p className="mt-16 border-t border-paper/15 pt-6 text-sm text-paper/45">© {new Date().getFullYear()} {name}. All rights reserved.</p>
      </div>
      <p aria-hidden className="pointer-events-none select-none whitespace-nowrap pt-6 text-center font-head text-[20vw] font-extrabold leading-[0.72] tracking-[-0.06em] text-paper/[0.06]">{name.toLowerCase()}</p>
    </footer>
  );
}
