"use client";

import { skipToken, useQuery } from "@tanstack/react-query";
import {
  fetchCategorySlugs,
  fetchProductById,
  fetchProducts,
  fetchProductsByCategory,
} from "@/features/products/services/products.service";
import { queryKeys } from "@/features/products/query-keys";

export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products.list(),
    queryFn: fetchProducts,
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey:
      id !== undefined
        ? queryKeys.products.detail(id)
        : (["products", "detail", "idle"] as const),
    queryFn:
      id !== undefined ? () => fetchProductById(id) : skipToken,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.catalog.categories,
    queryFn: fetchCategorySlugs,
  });
}

export function useCategoryProducts(slug: string | undefined) {
  return useQuery({
    queryKey:
      slug !== undefined
        ? queryKeys.products.category(slug)
        : (["products", "category", "idle"] as const),
    queryFn:
      slug !== undefined ? () => fetchProductsByCategory(slug) : skipToken,
  });
}
