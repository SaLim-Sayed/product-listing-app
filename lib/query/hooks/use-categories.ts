"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCategorySlugs } from "@/lib/api/catalog";
import { queryKeys } from "@/lib/query/keys";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.catalog.categories,
    queryFn: fetchCategorySlugs,
  });
}
