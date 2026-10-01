import Image from "next/image";
import { asset } from "@/lib/utils";
import { Reveal } from "./Reveal";

function StoreButton({ top, name }: { top: string; name: string }) {
  return (
    <a href="#" aria-label={`${name} (demo link)`} className="flex items-center gap-3 rounded-2xl bg-paper px-5 py-3 text-crust transition hover:-translate-y-0.5 hover:bg-butter">
      <svg aria-hidden viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M5 3.5v17c0 .6.7.9 1.2.6l14-8.5a.7.7 0 0 0 0-1.2l-14-8.5C5.7 2.6 5 2.9 5 3.5z" /></svg>
      <span className="text-left leading-tight"><span className="block text-[11px] font-semibold uppercase tracking-wide opacity-60">{top}</span><span className="font-head text-lg font-bold">{name}</span></span>
    </a>
  );
}

export function AppCta() {
  return (
    <section className="relative z-40 bg-butter pb-40 md:pb-48">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <div className="relative grid items-center gap-10 overflow-hidden rounded-[2.5rem] bg-crust px-7 pt-12 text-paper md:grid-cols-[1.2fr_1fr] md:rounded-[3.5rem] md:px-14 md:pt-0">
            <div className="pb-4 md:py-20">
              <h2 className="font-head text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">Dinner is one tap <span className="text-butter">away.</span></h2>
              <p className="mt-5 max-w-md text-lg text-paper/70">Get the app for live courier tracking, saved favourites and app-only deals every week.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <StoreButton top="Get it on" name="App Store" />
                <StoreButton top="Get it on" name="Google Play" />
              </div>
            </div>

            <div className="relative mx-auto -mb-12 w-[250px] md:mb-0 md:mt-16 md:w-[290px]">
              <div className="rotate-[4deg] rounded-[2.5rem] border-[8px] border-paper/90 bg-paper p-3 text-crust shadow-2xl shadow-black/40 transition-transform duration-500 hover:rotate-[1deg]">
                <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-crust/15" />
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={asset("/images/food/burger.jpg")} alt="" fill sizes="260px" className="object-cover" />
                </div>
                <p className="mt-3 font-head text-lg font-bold">Your order is on its way</p>
                <p className="text-sm text-crust/55">Alley Grill · Courier: Sam</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-sauce"><div className="h-full w-3/4 rounded-full bg-tomato" /></div>
                <div className="mt-2 flex justify-between pb-6 text-xs font-bold"><span>Cooking</span><span className="text-tomato">Arriving in 8 min</span></div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
