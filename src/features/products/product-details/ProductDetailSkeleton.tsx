"use client";

import { Card, Skeleton } from "@heroui/react";

export function ProductDetailSkeleton() {
  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div className="h-4 w-32">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>

      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-start">
        <div className="flex justify-center md:justify-start">
          <Card className="relative flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
            <Skeleton className="size-full rounded-lg" />
          </Card>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-20 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-2/3 rounded-lg" />
          </div>

          <Skeleton className="h-8 w-24 rounded-lg" />

          <Skeleton className="h-4 w-40 rounded-lg" />

          <Skeleton className="h-12 w-full max-w-xs rounded-lg" />

          <div className="border-t border-zinc-200 pt-6 dark:border-zinc-800 space-y-3">
            <Skeleton className="h-4 w-24 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full rounded-lg" />
              <Skeleton className="h-3 w-full rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
