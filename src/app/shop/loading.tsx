export default function Loading() {
  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-28 pt-32 md:px-10 md:pt-40" aria-busy="true" aria-label="Loading snacks">
      <div className="mb-10 h-20 w-72 animate-pulse rounded-lg bg-choc/10 md:h-28 md:w-[28rem]" />
      <div className="mb-10 h-12 animate-pulse rounded-full bg-choc/10" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-[14px] bg-cream-2">
            <div className="aspect-[4/4.4] animate-pulse bg-choc/10" />
            <div className="space-y-3 p-6">
              <div className="h-6 w-3/4 animate-pulse rounded bg-choc/10" />
              <div className="h-4 w-full animate-pulse rounded bg-choc/10" />
              <div className="h-11 w-40 animate-pulse rounded-full bg-choc/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
