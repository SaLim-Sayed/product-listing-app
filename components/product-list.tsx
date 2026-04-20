"use client";

import { Alert, Button, Spinner } from "@heroui/react";
import Link from "next/link";
import { productDetailPath } from "@/lib/nav/product-path";
import { formatCategoryLabel } from "@/lib/format-category";
import { isApiError } from "@/lib/api/errors";
import { ProductThumb } from "@/components/product-thumb";
import { useProducts } from "@/lib/query/hooks/use-products";

export function ProductList() {
  const { data, isPending, isError, error, refetch, isFetching } =
    useProducts();

  if (isPending) {
    return (
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <Spinner size="sm" />
        <span>Loading products…</span>
      </div>
    );
  }

  if (isError) {
    const hint =
      isApiError(error) && error.status != null
        ? `HTTP ${error.status}`
        : null;

    return (
      <Alert status="danger">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Could not load products</Alert.Title>
          <Alert.Description>
            {error.message}
            {hint ? (
              <span className="mt-1 inline-block rounded bg-red-100 px-1.5 py-0.5 font-mono text-xs dark:bg-red-900/60">
                {hint}
              </span>
            ) : null}
          </Alert.Description>
          <Button
            variant="danger"
            size="sm"
            className="mt-3"
            onPress={() => refetch()}
          >
            Retry
          </Button>
        </Alert.Content>
      </Alert>
    );
  }

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Products
        </h2>
        {isFetching ? (
          <span className="text-xs text-zinc-500">Refreshing…</span>
        ) : null}
      </div>
      <ul className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
        {data.map((product) => (
          <li key={product.id}>
            <Link
              href={productDetailPath(product.id)}
              className="group flex items-start gap-3 px-4 py-3 text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
            >
              <ProductThumb src={product.image} alt={product.title} />
              <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <span className="min-w-0">
                  <span className="line-clamp-2 font-medium text-zinc-900 group-hover:underline dark:text-zinc-100">
                    {product.title}
                  </span>
                  <span className="mt-0.5 block text-xs capitalize text-zinc-500">
                    {formatCategoryLabel(product.category)}
                  </span>
                </span>
                <span className="shrink-0 tabular-nums text-zinc-600 dark:text-zinc-400">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
