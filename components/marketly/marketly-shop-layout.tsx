"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Button,
  Drawer,
  InputGroup,
  Spinner,
  buttonVariants,
  cn,
  Skeleton,
  useOverlayState,
} from "@heroui/react";
import { formatCategoryLabel } from "@/lib/format-category";
import { useCategories } from "@/lib/query/hooks/use-categories";
import { useCategoryProducts } from "@/lib/query/hooks/use-category-products";
import { useProducts } from "@/lib/query/hooks/use-products";
import { MarketlyFooter } from "@/components/marketly/marketly-footer";
import { MarketlyHeader } from "@/components/marketly/marketly-header";
import { MarketlyProductCard } from "@/components/marketly/marketly-product-card";
import { PriceRangeSlider } from "@/components/marketly/price-range-slider";
import { BiFilterAlt, BiSearch } from "react-icons/bi";

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

  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);

  const filterDrawer = useOverlayState();

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

  const closeMobileFilters = () => {
    filterDrawer.close();
  };

  const renderCategories = (afterNavigate?: () => void) => {
    if (categoriesQuery.isError) {
      return (
        <Alert status="danger">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Could not load categories</Alert.Title>
            <Alert.Description>
              {categoriesQuery.error.message}
            </Alert.Description>
          </Alert.Content>
        </Alert>
      );
    }

    if (categoriesQuery.isPending) {
      return (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-lg" />
          ))}
        </div>
      );
    }

    return (
      <ul className="flex flex-col gap-2">
        {chips.map((chip) => {
          const active = chipActive(chip);

          if (isCategoryRoute) {
            const href =
              chip.filterSlug == null
                ? "/products"
                : `/category/${encodeURIComponent(chip.filterSlug)}`;
            return (
              <li key={chip.id}>
                <Link
                  href={href}
                  onClick={() => afterNavigate?.()}
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      variant: active ? "primary" : "outline",
                    }),
                    "w-full justify-start rounded-lg shadow-sm",
                    !active &&
                      "border-zinc-200 bg-white font-medium text-zinc-700",
                  )}
                >
                  {chip.label}
                </Link>
              </li>
            );
          }

          return (
            <li key={chip.id}>
              <Button
                size="sm"
                variant={active ? "primary" : "outline"}
                className={cn(
                  "w-full justify-start rounded-lg shadow-sm",
                  active
                    ? ""
                    : "border-zinc-200 bg-white font-medium text-zinc-700",
                )}
                onPress={() => {
                  setHomeSelectedSlug(chip.filterSlug);
                  afterNavigate?.();
                }}
              >
                {chip.label}
              </Button>
            </li>
          );
        })}
      </ul>
    );
  };

  const filtersBody = (opts?: { afterCategoryNavigate?: () => void }) => (
    <div className="space-y-8">
      <section aria-labelledby="filter-search-label">
        <p
          id="filter-search-label"
          className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500"
        >
          Search
        </p>
        <InputGroup.Root
          fullWidth
          className="rounded-xl border border-zinc-200 bg-zinc-50/80 shadow-inner"
        >
          <InputGroup.Prefix className="pl-3 text-zinc-400">
            <BiSearch />
          </InputGroup.Prefix>
          <InputGroup.Input
            aria-label="Search products"
            placeholder="Search title or description…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400"
          />
        </InputGroup.Root>
      </section>

      <section aria-labelledby="filter-category-label">
        <p
          id="filter-category-label"
          className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500"
        >
          Category
        </p>
        {renderCategories(opts?.afterCategoryNavigate)}
      </section>

      <section aria-labelledby="filter-price-label" className="space-y-3">
        <p
          id="filter-price-label"
          className="text-xs font-semibold uppercase tracking-wide text-zinc-500"
        >
          Price
        </p>
        <PriceRangeSlider
          className="max-w-none"
          minBound={priceBounds.min}
          maxBound={priceBounds.max}
          valueMin={priceMin}
          valueMax={priceMax}
          disabled={searchAndCategoryList.length === 0}
          onChange={(min, max) => {
            setPriceMin(min);
            setPriceMax(max);
          }}
        />
        <Button
          variant="outline"
          size="sm"
          className="w-full border-zinc-200"
          isDisabled={searchAndCategoryList.length === 0}
          onPress={() => {
            setPriceMin(priceBounds.min);
            setPriceMax(priceBounds.max);
          }}
        >
          Reset price range
        </Button>
        <p className="text-xs leading-relaxed text-zinc-400">
          Visible listing ${priceBounds.min.toFixed(2)} – $
          {priceBounds.max.toFixed(2)}. Filters apply on this page only.
        </p>
      </section>
    </div>
  );

  return (
    <div className="bg-marketly-page text-foreground flex min-h-full flex-col">
      <MarketlyHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showProductSearch={false}
      />

      <Drawer state={filterDrawer}>
        <Drawer.Backdrop isDismissable>
          <Drawer.Content placement="bottom">
            <Drawer.Dialog className="flex max-h-[88dvh] max-w-full flex-col rounded-t-2xl bg-white pb-[env(safe-area-inset-bottom)]">
              <Drawer.Header className="shrink-0 border-b border-zinc-200 px-4 pb-3 pt-4">
                <div className="flex items-center justify-between gap-3">
                  <Drawer.Heading className="text-lg font-bold text-zinc-900">
                    Filters
                  </Drawer.Heading>
                  <Drawer.CloseTrigger className="shrink-0 text-zinc-500" />
                </div>
              </Drawer.Header>
              <Drawer.Body className="min-h-0 flex-1 overflow-y-auto px-4 pt-4">
                {filtersBody({ afterCategoryNavigate: closeMobileFilters })}
              </Drawer.Body>
              <Drawer.Footer className="shrink-0 border-t border-zinc-200 px-4 pb-5 pt-3">
                <Button
                  variant="primary"
                  className="w-full font-semibold"
                  onPress={() => filterDrawer.close()}
                >
                  Show results
                </Button>
              </Drawer.Footer>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>

      <div className="flex flex-1 flex-col lg:flex-row lg:items-start">
        <aside
          className="hidden w-full shrink-0 border-zinc-200 bg-white lg:block lg:sticky lg:top-14 lg:z-30 lg:max-h-[calc(100vh-3.5rem)] lg:w-72 lg:overflow-y-auto lg:border-r xl:w-80"
          aria-labelledby="shop-filters-heading"
        >
          <div className="w-full space-y-8 p-4 lg:p-6">
            <h2
              id="shop-filters-heading"
              className="text-sm font-bold uppercase tracking-wide text-zinc-500"
            >
              Filters
            </h2>
            {filtersBody()}
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 lg:py-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 lg:hidden">
              <p className="text-sm text-zinc-600">
                <span className="font-semibold tabular-nums text-zinc-900">
                  {filtered.length}
                </span>{" "}
                {filtered.length === 1 ? "product" : "products"}
              </p>
              <Button
                variant="primary"
                size="sm"
                className="shrink-0 font-semibold gap-2"
                onPress={() => filterDrawer.open()}
              >
                Filters
                <BiFilterAlt/>
              </Button>
            </div>

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
              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filtered.map((product) => (
                  <li key={product.id}>
                    <MarketlyProductCard product={product} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </main>
      </div>

      <MarketlyFooter />
    </div>
  );
}
