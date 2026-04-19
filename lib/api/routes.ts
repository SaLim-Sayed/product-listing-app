/** Paths relative to `getPublicApiBaseUrl()` (Fake Store: https://fakestoreapi.com). */
export const routes = {
  products: {
    collection: "/products",
    item: (id: string) => `/products/${encodeURIComponent(id)}`,
  },
} as const;
