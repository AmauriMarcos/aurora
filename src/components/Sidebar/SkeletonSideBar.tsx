import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonSidebar() {
  return (
    <div className="flex flex-col gap-10 py-4 px-8 md:p-4 min-h-screen md:min-h-0 md:h-full">
      <div className="mt-4">
        <Skeleton className="w-full h-[37px]" />
      </div>
      <div>
        <Skeleton className="w-full h-[98px]" />
      </div>
      <div>
        <Skeleton className="w-full h-[30px]" />
      </div>
      <div>
        <Skeleton className="w-full h-78px]" />
      </div>
      <div>
        <Skeleton className="w-full h-[200px]" />
      </div>
      <div className="space-y-2 mt-4 ">
        <Skeleton className="my-6 w-3/4 h-6" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
      </div>
    </div>
  );
}
