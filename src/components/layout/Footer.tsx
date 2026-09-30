import Link from "next/link";
import { Piece } from "../art/Pieces";
import { Logo } from "./Logo";
import { NewsletterForm } from "../ui/NewsletterForm";
import { SplitText } from "../ui/SplitText";

const cols = [
  { title: "Shop", links: [["All snacks", "/shop"], ["Popcorn", "/shop?cat=Popcorn"], ["Chips & nachos", "/shop?cat=Chips"], ["Snack boxes", "/shop?cat=Boxes"]] },
  { title: "Company", links: [["About", "/about"], ["Contact", "/contact"], ["FAQs", "/faqs"]] },
  { title: "Help", links: [["Shipping", "/shipping"], ["Returns", "/returns"], ["Privacy", "/privacy"], ["Terms", "/terms"]] },
];
const socials = ["Instagram", "TikTok", "YouTube", "X"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-cream-2 text-choc">
      <div className="mx-auto max-w-[1500px] px-5 pb-8 pt-20 md:px-10 md:pt-28">
        <h2 className="text-[clamp(2.75rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
          <SplitText words text="Stay hungry." />
          <br />
          <SplitText words text="Stay crunchy." delay={0.3} className="font-serif font-normal italic text-orange" />
        </h2>

        <div className="mt-16 grid gap-12 border-t border-choc/12 pt-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-choc/60">Chips, popcorn, nuts and chocolate. A few cupboard essentials.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s}>
                  <a href="#" aria-label={`${s} (demo link)`} className="inline-flex items-center gap-1 rounded-full border border-choc/20 px-4 py-2 text-sm transition hover:border-orange hover:bg-orange hover:text-cream">
                    {s} <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-4">
            {cols.map((c) => (
              <div key={c.title}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-choc/45">{c.title}</h3>
                <ul className="space-y-2.5">
                  {c.links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="inline-block transition hover:translate-x-1 hover:text-orange">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className="lg:col-span-4">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-choc/45">Snack Club</h3>
            <p className="mb-4 text-choc/60">New flavours and shop news, now and then.</p>
            <NewsletterForm stacked />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-choc/12 pt-6 text-sm text-choc/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Crunch &amp; Co. A fictional snack brand.</p>
          <p className="flex items-center gap-2">
            Made with crumbs <Piece kind="chip" className="h-5 w-5" />
          </p>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none select-none whitespace-nowrap text-center text-[22vw] font-extrabold leading-[0.75] tracking-[-0.06em] text-choc/[0.05]">CRUNCH&amp;CO</p>
    </footer>
  );
}
