/** Hierarchical keys: invalidate `products.all` for full reset, or narrower scopes for surgical updates. */
export const queryKeys = {
  products: {
    all: ["products"] as const,
    list: () => [...queryKeys.products.all, "list"] as const,
    detail: (id: string) =>
      [...queryKeys.products.all, "detail", id] as const,
  },
};
