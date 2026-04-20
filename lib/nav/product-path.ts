/** Product detail URL per spec: `/product/[id]` (Fake Store product id). */
export function productDetailPath(id: number | string): string {
  return `/product/${id}`;
}
