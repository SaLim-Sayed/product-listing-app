"use client";

import { ProductCardSkeleton } from "./ProductCardSkeleton";

type Props = {
  count?: number;
};

export function ProductGridSkeleton({ count = 8 }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <ProductCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
