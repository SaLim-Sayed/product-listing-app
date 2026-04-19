"use client";

import { skipToken, useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/lib/api/products";
import { queryKeys } from "@/lib/query/keys";

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey:
      id !== undefined
        ? queryKeys.products.detail(id)
        : (["products", "detail", "idle"] as const),
    queryFn:
      id !== undefined
        ? () => fetchProductById(id)
        : skipToken,
  });
}
