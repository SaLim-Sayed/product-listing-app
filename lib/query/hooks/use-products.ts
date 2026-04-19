"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api/products";
import { queryKeys } from "@/lib/query/keys";

export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products.list(),
    queryFn: fetchProducts,
  });
}
