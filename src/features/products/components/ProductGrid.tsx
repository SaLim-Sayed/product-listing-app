"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
const AddToCartModal = dynamic(
  () =>
    import("@/components/ui/AddToCartModal/AddToCartModal").then(
      (mod) => mod.AddToCartModal,
    ),
  { ssr: false },
);
import type { Product } from "@/features/products/types";
import { ProductCard } from "@/features/products/components/ProductCard";
import { ProductGridSkeleton } from "./ProductGridSkeleton";

type Props = {
  products?: Product[];
  isLoading?: boolean;
};

export function ProductGrid({ products = [], isLoading }: Props) {
  const [pendingAdd, setPendingAdd] = useState<Product | null>(null);

  const onAddIntent = useCallback((product: Product) => {
    setPendingAdd(product);
  }, []);

  const closeModal = useCallback(() => setPendingAdd(null), []);

  if (isLoading) {
    return <ProductGridSkeleton count={8} />;
  }

  if (!products.length) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-100 p-12 text-center">
        <p className="text-sm font-medium text-zinc-500">No products found</p>
      </div>
    );
  }

  return (
    <>
      <AddToCartModal product={pendingAdd} onClose={closeModal} />
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} onAddIntent={onAddIntent} />
          </li>
        ))}
      </ul>
    </>
  );
}
