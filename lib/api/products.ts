import type { Product } from "@/lib/types/product";
import { apiGet } from "@/lib/api/http";
import { routes } from "@/lib/api/routes";

export function fetchProducts(): Promise<Product[]> {
  return apiGet<Product[]>(routes.products.collection);
}

export function fetchProductById(id: string): Promise<Product> {
  return apiGet<Product>(routes.products.item(id));
}
