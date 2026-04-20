"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Button,
  Spinner,
  buttonVariants,
  cn,
  Skeleton,
} from "@heroui/react";
import { formatCategoryLabel } from "@/lib/format-category";
import { useCategories } from "@/lib/query/hooks/use-categories";
import { useCategoryProducts } from "@/lib/query/hooks/use-category-products";
import { useProducts } from "@/lib/query/hooks/use-products";
import { MarketlyFooter } from "@/components/marketly/marketly-footer";
import { MarketlyHeader } from "@/components/marketly/marketly-header";
import { MarketlyProductCard } from "@/components/marketly/marketly-product-card";

const ALL_CHIP_ID = "__all__";

type Chip = {
  id: string;
  label: string;
  filterSlug: string | null;
};

type Props = {
  categorySlug?: string;
};

export function MarketlyShopLayout({ categorySlug }: Props) {
  const isCategoryRoute = categorySlug != null;
  const [searchQuery, setSearchQuery] = useState("");
  const [homeSelectedSlug, setHomeSelectedSlug] = useState<string | null>(
    null,
  );

  /** Client-side price range ($), synced to current listing bounds. */
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);

  const categoriesQuery = useCategories();
  const allQuery = useProducts();
  const categoryQuery = useCategoryProducts(
    isCategoryRoute ? categorySlug : undefined,
  );

  const { data, isPending, isError, error, refetch } = isCategoryRoute
    ? categoryQuery
    : allQuery;

  const chips: Chip[] = useMemo(() => {
    const slugs = categoriesQuery.data ?? [];
    return [
      { id: ALL_CHIP_ID, label: "All", filterSlug: null },
      ...slugs.map((slug) => ({
        id: slug,
        label: formatCategoryLabel(slug),
        filterSlug: slug,
      })),
    ];
  }, [categoriesQuery.data]);

  /** Category + search only (before price filter). */
  const searchAndCategoryList = useMemo(() => {
    if (!data) return [];
    let list = data;

    if (!isCategoryRoute && homeSelectedSlug) {
      list = list.filter((p) => p.category === homeSelectedSlug);
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    return list;
  }, [data, isCategoryRoute, homeSelectedSlug, searchQuery]);

  const priceBounds = useMemo(() => {
    if (searchAndCategoryList.length === 0) {
      return { min: 0, max: 0 };
    }
    const prices = searchAndCategoryList.map((p) => p.price);
    return {
      min: Math.floor(Math.min(...prices) * 100) / 100,
      max: Math.ceil(Math.max(...prices) * 100) / 100,
    };
  }, [searchAndCategoryList]);

  useEffect(() => {
    // Sync inputs when category/search yields a new price extent.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset bounds when the listing changes
    setPriceMin(priceBounds.min);
    setPriceMax(priceBounds.max);
  }, [priceBounds.min, priceBounds.max]);

  const filtered = useMemo(() => {
    const lo = Math.min(priceMin, priceMax);
    const hi = Math.max(priceMin, priceMax);
    return searchAndCategoryList.filter(
      (p) => p.price >= lo && p.price <= hi,
    );
  }, [searchAndCategoryList, priceMin, priceMax]);

  const chipActive = (chip: Chip) => {
    if (isCategoryRoute) {
      if (chip.filterSlug == null) return false;
      return chip.filterSlug === categorySlug;
    }
    if (chip.filterSlug == null) return homeSelectedSlug == null;
    return chip.filterSlug === homeSelectedSlug;
  };

  return (
    <div className="bg-marketly-page text-foreground flex min-h-full flex-col">
      <MarketlyHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          {categoriesQuery.isError ? (
            <Alert status="danger" className="max-w-lg">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Could not load categories</Alert.Title>
                <Alert.Description>
                  {categoriesQuery.error.message}
                </Alert.Description>
              </Alert.Content>
            </Alert>
          ) : categoriesQuery.isPending ? (
            <div className="flex gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-9 w-24 shrink-0 rounded-lg"
                />
              ))}
            </div>
          ) : (
            <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {chips.map((chip) => {
                const active = chipActive(chip);

                if (isCategoryRoute) {
                  const href =
                    chip.filterSlug == null
                      ? "/"
                      : `/category/${encodeURIComponent(chip.filterSlug)}`;
                  return (
                    <Link
                      key={chip.id}
                      href={href}
                      className={cn(
                        buttonVariants({
                          size: "sm",
                          variant: active ? "primary" : "outline",
                        }),
                        "shrink-0 rounded-lg shadow-sm",
                        !active &&
                          "border-zinc-200 bg-white font-medium text-zinc-700",
                      )}
                    >
                      {chip.label}
                    </Link>
                  );
                }

                return (
                  <Button
                    key={chip.id}
                    size="sm"
                    variant={active ? "primary" : "outline"}
                    className={
                      active
                        ? "shrink-0 rounded-lg shadow-sm"
                        : "shrink-0 rounded-lg border-zinc-200 bg-white font-medium text-zinc-700 shadow-sm"
                    }
                    onPress={() => setHomeSelectedSlug(chip.filterSlug)}
                  >
                    {chip.label}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Price range (USD)
          </p>
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="price-min"
                className="text-xs font-medium text-zinc-600"
              >
                Minimum
              </label>
              <input
                id="price-min"
                type="number"
                step="0.01"
                min={0}
                inputMode="decimal"
                disabled={searchAndCategoryList.length === 0}
                value={priceMin}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setPriceMin(Number.isFinite(v) ? v : 0);
                }}
                className="w-28 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="price-max"
                className="text-xs font-medium text-zinc-600"
              >
                Maximum
              </label>
              <input
                id="price-max"
                type="number"
                step="0.01"
                min={0}
                inputMode="decimal"
                disabled={searchAndCategoryList.length === 0}
                value={priceMax}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setPriceMax(Number.isFinite(v) ? v : 0);
                }}
                className="w-28 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm disabled:opacity-50"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-200"
              isDisabled={searchAndCategoryList.length === 0}
              onPress={() => {
                setPriceMin(priceBounds.min);
                setPriceMax(priceBounds.max);
              }}
            >
              Reset range
            </Button>
          </div>
          <p className="mt-2 text-xs text-zinc-400">
            Listing range ${priceBounds.min.toFixed(2)} – $
            {priceBounds.max.toFixed(2)} · Filters apply on this page only.
          </p>
        </div>
      </div>

      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {isPending ? (
            <div className="text-muted-foreground flex justify-center gap-2 py-20 text-sm">
              <Spinner size="md" />
              <span>Loading products…</span>
            </div>
          ) : null}

          {isError ? (
            <Alert status="danger" className="max-w-lg">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Could not load products</Alert.Title>
                <Alert.Description>{error.message}</Alert.Description>
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
          ) : null}

          {!isPending && !isError && filtered.length === 0 ? (
            <p className="text-center text-sm text-zinc-500">
              No products match your filters.
            </p>
          ) : null}

          {!isPending && !isError && filtered.length > 0 ? (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <li key={product.id}>
                  <MarketlyProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </main>

      <MarketlyFooter />
    </div>
  );
}
