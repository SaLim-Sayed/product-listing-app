/** Display Fake Store category slugs (e.g. `men's clothing`) in title case. */
export function formatCategoryLabel(slug: string): string {
  return slug
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
