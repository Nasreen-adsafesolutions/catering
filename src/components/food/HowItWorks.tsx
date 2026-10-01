import { Reveal } from "./Reveal";

const STEPS = [
  { n: "01", title: "Pick your food", text: "Browse local kitchens and build your order in a few taps.", icon: <path d="M6 3v8a3 3 0 0 0 3 3v7M12 3v8M9 3v8M16 21V3c2.5 1 4 4 4 8h-4" /> },
  { n: "02", title: "We start cooking", text: "The kitchen gets your order instantly and a courier is matched nearby.", icon: <><path d="M4 11h16l-1.5 8a2 2 0 0 1-2 1.6h-9a2 2 0 0 1-2-1.6z" /><path d="M8 7c0-2 2-2 2-4M13 7c0-2 2-2 2-4" /></> },
  { n: "03", title: "Track and enjoy", text: "Watch your courier live, then meet them at the door. Eat while it’s hot.", icon: <><circle cx="6.5" cy="17" r="3" /><circle cx="18" cy="17" r="3" /><path d="M6.5 17L10 9h5l3 8M10 9L8.5 6H6" /></> },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative z-30 -mt-16 rounded-t-[2.5rem] bg-paper pb-36 pt-20 md:-mt-20 md:rounded-t-[4rem] md:pb-44 md:pt-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-tomato">How it works</p>
          <h2 className="mt-3 font-head text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">From craving to doorstep in three steps.</h2>
        </Reveal>

        <ol className="relative mt-16 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 0.1} className="h-full">
                <div className="group h-full rounded-[2rem] bg-sauce p-8 transition-transform duration-300 hover:-translate-y-1.5 md:p-9">
                  <div className="flex items-center justify-between">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-tomato text-white transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-105">
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{s.icon}</svg>
                    </span>
                    <span className="font-head text-5xl font-extrabold text-crust/15">{s.n}</span>
                  </div>
                  <h3 className="mt-10 font-head text-2xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-crust/65">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
