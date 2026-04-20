import { cache } from "react";
import type { Product } from "@/lib/types/product";
import { apiGet } from "@/lib/api/http";
import { routes } from "@/lib/api/routes";

export function fetchProducts(): Promise<Product[]> {
  return apiGet<Product[]>(routes.products.collection);
}

async function fetchProductByIdUncached(id: string): Promise<Product> {
  return apiGet<Product>(routes.products.item(id));
}

/** Deduplicates with `generateMetadata` / RSC in the same request. */
export const fetchProductById = cache(fetchProductByIdUncached);
