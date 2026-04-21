"use client";

import { Card, Skeleton } from "@heroui/react";

export function ProductCardSkeleton() {
  return (
    <Card className="group overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-sm">
      <div className="relative">
        <div className="flex aspect-square items-center justify-center bg-zinc-50 p-6">
          <Skeleton className="size-full rounded-lg" />
        </div>
        <div className="space-y-3 p-4 pt-4">
          <Skeleton className="h-4 w-3/4 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full rounded-lg" />
            <Skeleton className="h-3 w-5/6 rounded-lg" />
          </div>
          <div className="flex items-end justify-between gap-2 pt-2">
            <Skeleton className="h-6 w-16 rounded-lg" />
            <div className="flex flex-col items-end gap-1">
              <Skeleton className="h-2 w-10 rounded-lg" />
              <Skeleton className="h-3 w-16 rounded-lg" />
            </div>
          </div>
        </div>
        <div className="absolute right-3 top-3 z-10 size-10 rounded-full bg-zinc-100 p-2">
           <Skeleton className="size-full rounded-full" />
        </div>
      </div>
    </Card>
  );
}
