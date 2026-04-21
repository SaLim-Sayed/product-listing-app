"use client";

import { useCallback, useState } from "react";
import { AddToCartModal } from "@/components/ui/add-to-cart-modal";
import type { Product } from "@/features/products/types";
import { ProductCard } from "@/features/products/components/ProductCard";

type Props = {
  products: Product[];
};

export function ProductGrid({ products }: Props) {
  const [pendingAdd, setPendingAdd] = useState<Product | null>(null);

  const onAddIntent = useCallback((product: Product) => {
    setPendingAdd(product);
  }, []);

  const closeModal = useCallback(() => setPendingAdd(null), []);

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
