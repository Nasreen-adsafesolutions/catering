import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { infoPages } from "@/data/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(infoPages).map((page) => ({ page }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const p = infoPages[(await params).page];
  return p ? { title: p.title, description: p.intro } : {};
}

export default async function InfoPage({ params }: { params: Promise<{ page: string }> }) {
  const page = infoPages[(await params).page];
  if (!page) notFound();
  return (
    <article className="mx-auto max-w-3xl px-5 pb-28 pt-36 md:pt-44">
      <h1 className="text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.05em]">{page.title}</h1>
      <p className="mt-6 font-serif text-2xl italic text-choc/75">{page.intro}</p>
      <div className="mt-14 space-y-10">
        {page.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-2xl font-extrabold tracking-tight">{s.h}</h2>
            <p className="mt-2 text-lg leading-relaxed text-choc/75">{s.p}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
