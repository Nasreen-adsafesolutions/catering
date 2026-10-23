import Link from "next/link";
import { Reveal } from "./Reveal";

export interface CtaContent { title?: string; highlight?: string; text?: string }

export function AppCta({ content = {}, phone, whatsapp }: { content?: CtaContent; phone?: string; whatsapp?: string }) {
  return (
    <section className="relative z-40 bg-butter pb-40 md:pb-48">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-crust px-7 py-14 text-paper md:rounded-[3.5rem] md:px-14 md:py-20">
            <h2 className="max-w-3xl font-head text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">{content.title || "Hungry? Order in"} <span className="text-butter">{content.highlight || "one tap."}</span></h2>
            <p className="mt-5 max-w-md text-lg text-paper/70">{content.text || "Order from the menu, or message us for custom boxes and bulk orders."}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="rounded-full bg-tomato px-8 py-3.5 font-bold text-white transition hover:bg-butter hover:text-crust">Browse the menu</Link>
              {whatsapp && <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="rounded-full border-2 border-paper/40 px-7 py-3.5 font-bold transition hover:bg-paper hover:text-crust">WhatsApp us</a>}
              {phone && <a href={`tel:${phone.replace(/\s/g, "")}`} className="rounded-full border-2 border-paper/40 px-7 py-3.5 font-bold transition hover:bg-paper hover:text-crust">Call {phone}</a>}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
