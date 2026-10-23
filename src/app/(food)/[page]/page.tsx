import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/food/EnquiryForm";
import { getPages } from "@/lib/api";

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(await getPages()).map((page) => ({ page }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const p = (await getPages())[(await params).page];
  return p ? { title: p.title, description: p.intro } : {};
}

export default async function InfoPage({ params }: { params: Promise<{ page: string }> }) {
  const slug = (await params).page;
  const page = (await getPages())[slug];
  if (!page) notFound();
  return (
    <article className="mx-auto max-w-3xl px-5 pb-28 pt-36 md:px-8 md:pt-44">
      <h1 className="font-head text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">{page.title}</h1>
      <p className="mt-6 font-head text-2xl font-bold text-crust/75">{page.intro}</p>
      <div className="mt-14 space-y-10">
        {page.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-2xl font-extrabold tracking-tight">{s.h}</h2>
            <p className="mt-2 text-lg leading-relaxed text-crust/75">{s.p}</p>
          </section>
        ))}
      </div>
      {slug === "contact" && <EnquiryForm />}
    </article>
  );
}
