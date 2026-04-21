"use client";

import { useEffect, useMemo, useState } from "react";
import type { CategoryChip, Product } from "@/features/products/types";
import { formatCategoryLabel } from "@/features/products/utils";

const ALL_CHIP_ID = "__all__";

type UseFiltersArgs = {
  products: Product[] | undefined;
  categorySlugs: string[];
  isCategoryRoute: boolean;
};

export function useFilters({
  products: data,
  categorySlugs,
  isCategoryRoute,
}: UseFiltersArgs) {
  const [searchQuery, setSearchQuery] = useState("");
  const [homeSelectedSlug, setHomeSelectedSlug] = useState<string | null>(null);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);

  const chips: CategoryChip[] = useMemo(() => {
    return [
      { id: ALL_CHIP_ID, label: "All", filterSlug: null },
      ...categorySlugs.map((slug) => ({
        id: slug,
        label: formatCategoryLabel(slug),
        filterSlug: slug,
      })),
    ];
  }, [categorySlugs]);

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
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync range when listing changes
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

  return {
    searchQuery,
    setSearchQuery,
    homeSelectedSlug,
    setHomeSelectedSlug,
    priceMin,
    priceMax,
    setPriceMin,
    setPriceMax,
    chips,
    searchAndCategoryList,
    priceBounds,
    filtered,
  };
}
