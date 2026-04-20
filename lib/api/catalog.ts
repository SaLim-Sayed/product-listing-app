import type { Product } from "@/lib/types/product";
import { apiGet } from "@/lib/api/http";
import { routes } from "@/lib/api/routes";

export function fetchCategorySlugs(): Promise<string[]> {
  return apiGet<string[]>(routes.catalog.categories);
}

export function fetchProductsByCategory(slug: string): Promise<Product[]> {
  return apiGet<Product[]>(routes.catalog.productsByCategory(slug));
}
