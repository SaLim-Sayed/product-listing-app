/** Hierarchical keys: invalidate `products.all` for full reset, or narrower scopes for surgical updates. */
export const queryKeys = {
  catalog: {
    categories: ["catalog", "categories"] as const,
  },
  products: {
    all: ["products"] as const,
    list: () => [...queryKeys.products.all, "list"] as const,
    detail: (id: string) =>
      [...queryKeys.products.all, "detail", id] as const,
    category: (slug: string) =>
      [...queryKeys.products.all, "category", slug] as const,
  },
};
