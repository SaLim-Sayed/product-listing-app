/** Paths relative to `getPublicApiBaseUrl()` (Fake Store: https://fakestoreapi.com). */
export const routes = {
  products: {
    collection: "/products",
    item: (id: string) => `/products/${encodeURIComponent(id)}`,
  },
  catalog: {
    categories: "/products/categories",
    productsByCategory: (slug: string) =>
      `/products/category/${encodeURIComponent(slug)}`,
  },
} as const;
