"use client";

import { isApiError } from "@/lib/api/errors";
import { ProductThumb } from "@/components/product-thumb";
import { useProducts } from "@/lib/query/hooks/use-products";

export function ProductList() {
  const { data, isPending, isError, error, refetch, isFetching } =
    useProducts();

  if (isPending) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Loading products…
      </p>
    );
  }

  if (isError) {
    const hint =
      isApiError(error) && error.status != null
        ? `HTTP ${error.status}`
        : null;

    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
        <p className="font-medium">Could not load products</p>
        <p className="mt-1 text-sm opacity-90">
          {error.message}
          {hint ? (
            <span className="ml-2 rounded bg-red-100 px-1.5 py-0.5 font-mono text-xs dark:bg-red-900/60">
              {hint}
            </span>
          ) : null}
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 rounded-md bg-red-700 px-3 py-1.5 text-sm text-white hover:bg-red-800"
        >
          Retry
        </button>
      </div>
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
          <li
            key={product.id}
            className="flex items-start gap-3 px-4 py-3 text-sm"
          >
            <ProductThumb src={product.image} alt={product.title} />
            <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <span className="line-clamp-2 font-medium text-zinc-900 dark:text-zinc-100">
                {product.title}
              </span>
              <span className="shrink-0 tabular-nums text-zinc-600 dark:text-zinc-400">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
