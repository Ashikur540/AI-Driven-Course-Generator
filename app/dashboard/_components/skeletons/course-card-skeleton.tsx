import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[200px] w-[280px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[50px]" />
        <Skeleton className="h-3 w-[250px]" />
        <Skeleton className="h-3 w-[200px]" />
      </div>
    </div>
  );
}
