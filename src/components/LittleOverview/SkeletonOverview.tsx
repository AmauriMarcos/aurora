import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDemo() {
    return (
      <div className="space-y-2 mt-4 ">
        <Skeleton className="my-6 w-3/4 h-6" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
      </div>
    );
  }
  