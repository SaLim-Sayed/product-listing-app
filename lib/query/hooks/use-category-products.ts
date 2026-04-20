"use client";

import { skipToken, useQuery } from "@tanstack/react-query";
import { fetchProductsByCategory } from "@/lib/api/catalog";
import { queryKeys } from "@/lib/query/keys";

export function useCategoryProducts(slug: string | undefined) {
  return useQuery({
    queryKey:
      slug !== undefined
        ? queryKeys.products.category(slug)
        : (["products", "category", "idle"] as const),
    queryFn:
      slug !== undefined
        ? () => fetchProductsByCategory(slug)
        : skipToken,
  });
}
