export const SHOP_PATH = "/shop" as const;

export function shopCatalogHref(categorySlug?: string | null) {
  if (categorySlug == null || categorySlug === "") return SHOP_PATH;
  return `${SHOP_PATH}?category=${encodeURIComponent(categorySlug)}`;
}
