"use client";

import { CategoryFilter } from "@/features/products/components/Filters/CategoryFilter";
import { PriceFilter } from "@/features/products/components/Filters/PriceFilter";
import { InputGroup } from "@heroui/react";
import { BiSearch } from "react-icons/bi";
import type { useProductsListing } from "@/features/products/ProductListing/useProductsListing";

type Props = {
  logic: ReturnType<typeof useProductsListing>;
  afterCategoryNavigate?: () => void;
};

export function FiltersBody({ logic, afterCategoryNavigate }: Props) {
  const { filters, isCategoryRoute, categorySlug, categoriesQuery } = logic;

  return (
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
            value={filters.searchQuery}
            onChange={(e) => filters.setSearchQuery(e.target.value)}
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
        <CategoryFilter
          chips={filters.chips}
          isCategoryRoute={isCategoryRoute}
          categorySlug={categorySlug}
          homeSelectedSlug={filters.homeSelectedSlug}
          onHomeCategorySelect={filters.setHomeSelectedSlug}
          categoriesLoading={categoriesQuery.isPending}
          categoriesError={
            categoriesQuery.isError ? categoriesQuery.error : null
          }
          afterNavigate={afterCategoryNavigate}
        />
      </section>

      <PriceFilter
        priceBounds={filters.priceBounds}
        priceMin={filters.priceMin}
        priceMax={filters.priceMax}
        onPriceChange={(min, max) => {
          filters.setPriceMin(min);
          filters.setPriceMax(max);
        }}
        onResetPrice={() => {
          filters.setPriceMin(filters.priceBounds.min);
          filters.setPriceMax(filters.priceBounds.max);
        }}
        listingEmpty={filters.searchAndCategoryList.length === 0}
        sliderClassName="max-w-none"
      />
    </div>
  );
}
