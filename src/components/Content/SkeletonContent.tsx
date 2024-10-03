import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonContent() {
  return (
    <div className="flex flex-col gap-10 py-4 px-8 md:p-4 min-h-screen md:min-h-0 md:h-full ml-11">
      <div className="mt-[2.5rem]">
        <Skeleton className="w-[100px] h-[35px]" />
      </div>
      <div className="flex flex-col gap-4 mt-[4rem]">
        <Skeleton className="w-[100px] h-[20px]" />
        <Skeleton className="w-[230px] h-[170px]" />
        <div className="space-y-2 mt-4 ">
          <Skeleton className="my-6 w-[450px] h-6" />
          <Skeleton className="w-[330px] h-4" />
          <Skeleton className="w-[250px] h-4" />
          <Skeleton className="w-[300px] h-4" />
          <Skeleton className="w-[330px] h-4" />
          <Skeleton className="w-[230px] h-4" />
          <Skeleton className="w-[360px] h-4" />
        </div>
      </div>
      <div className="mt-5 flex w-full gap-4 justify-between">
        <Skeleton className="w-[202px] h-[172px]" />
        <Skeleton className="w-[202px] h-[172px]" />
        <Skeleton className="w-[202px] h-[172px]" />
        <Skeleton className="w-[202px] h-[172px]" />
        <Skeleton className="w-[202px] h-[172px]" />
        <Skeleton className="w-[202px] h-[172px]" />
      </div>
    </div>
  );
}
