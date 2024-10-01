import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonAirPollution() {
    return (
      <div className="space-y-2 mt-4 ">
        <Skeleton className="w-[350px] h-4" />
        <Skeleton className="w-[340px] h-4" />
        <Skeleton className="w-[320px] h-4" />
        <Skeleton className="w-[330px] h-4" />
      </div>
    );
  }
  