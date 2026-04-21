"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useOverlayState } from "@heroui/react";
import {
  useCategories,
  useCategoryProducts,
  useProducts,
} from "@/features/products/hooks";
import { useFilters } from "./useFilters";

export function useProductsListing() {
  const searchParams = useSearchParams();
  
  const categorySlug = useMemo(() => {
    const raw = searchParams.get("category");
    if (raw == null || raw.trim() === "") return undefined;
    return raw.trim();
  }, [searchParams]);

  const isCategoryRoute = categorySlug !== undefined;

  const categoriesQuery = useCategories();
  const allQuery = useProducts();
  const categoryQuery = useCategoryProducts(
    isCategoryRoute ? categorySlug : undefined,
  );

  const productsQuery = isCategoryRoute ? categoryQuery : allQuery;
  const { data, isPending, isError, error, refetch } = productsQuery;

  const filters = useFilters({
    products: data,
    categorySlugs: categoriesQuery.data ?? [],
    isCategoryRoute,
  });

  const filterDrawer = useOverlayState();

  return {
    categorySlug,
    isCategoryRoute,
    categoriesQuery,
    productsQuery: {
      data,
      isPending,
      isError,
      error,
      refetch,
    },
    filters,
    filterDrawer,
  };
}
