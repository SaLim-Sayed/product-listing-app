"use client";

import { Spinner } from "@heroui/react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { AddToCartModal } from "@/components/ui/add-to-cart-modal";
import { ProductCard } from "@/features/products/components/ProductCard";
import { useCategoryProducts } from "@/features/products/hooks";
import { formatCategoryLabel } from "@/features/products/utils";
import type { Product } from "@/features/products/types";
import { shopCatalogHref } from "@/lib/nav/shop-path";

type Props = {
  categorySlug: string;
  excludeProductId: number;
};

export function RelatedProducts({ categorySlug, excludeProductId }: Props) {
  const { data, isPending, isError } = useCategoryProducts(categorySlug);
  const [pendingAdd, setPendingAdd] = useState<Product | null>(null);

  const onAddIntent = useCallback((product: Product) => {
    setPendingAdd(product);
  }, []);

  const closeModal = useCallback(() => setPendingAdd(null), []);

  const related = useMemo(() => {
    if (!data?.length) return [];
    return data.filter((p) => p.id !== excludeProductId).slice(0, 4);
  }, [data, excludeProductId]);

  const categoryHref = useMemo(
    () => shopCatalogHref(categorySlug),
    [categorySlug],
  );

  if (isPending) {
    return (
      <section
        aria-labelledby="related-heading"
        className="border-t border-zinc-200 pt-10"
      >
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <Spinner size="sm" />
          <span>Loading related products…</span>
        </div>
      </section>
    );
  }

  if (isError || related.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-heading"
      className="border-t border-zinc-200 pt-10"
    >
      <AddToCartModal product={pendingAdd} onClose={closeModal} />
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2
          id="related-heading"
          className="text-xl font-bold tracking-tight text-zinc-900"
        >
          Related products
        </h2>
        <Link
          href={categoryHref}
          className="text-marketly-price text-sm font-semibold hover:underline"
        >
          More in {formatCategoryLabel(categorySlug)}
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {related.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} onAddIntent={onAddIntent} />
          </li>
        ))}
      </ul>
    </section>
  );
}
