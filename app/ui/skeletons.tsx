const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="h-96"></div>

      <div className="flex flex-col gap-2 items-start justify-center truncate rounded-xl bg-white p-4 relative">
        <div className="h-3 w-[80%] rounded-md bg-gray-200" />
        <div className="h-3 w-[60%] rounded-md bg-gray-200" />

        <div className="bg-gray-200 h-6 w-6 absolute bottom-2 right-2 rounded-[50%]"></div>
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </>
  );
}
