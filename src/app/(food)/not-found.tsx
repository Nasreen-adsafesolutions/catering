import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-xl flex-col items-center justify-center px-5 pt-24 text-center">
      <h1 className="font-head text-7xl font-extrabold tracking-tight text-tomato">404</h1>
      <p className="mt-3 font-head text-2xl font-bold text-crust/70">That page isn’t on the menu.</p>
      <Link href="/shop" className="mt-8 rounded-full bg-tomato px-8 py-3.5 font-bold text-white transition hover:bg-crust">Back to the menu</Link>
    </div>
  );
}
