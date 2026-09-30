import Link from "next/link";
import { Piece } from "@/components/art/Pieces";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-xl flex-col items-center justify-center px-5 pt-24 text-center">
      <Piece kind="cookie" className="mb-6 h-28 w-28 animate-float" rotate={20} />
      <h1 className="text-6xl font-extrabold tracking-tight">Crumbs.</h1>
      <p className="mt-3 font-serif text-2xl italic text-choc/70">That page has been eaten.</p>
      <Link href="/shop" className="mt-8 rounded-full bg-orange px-8 py-3.5 font-semibold text-cream transition hover:bg-choc">Back to snacks</Link>
    </div>
  );
}
