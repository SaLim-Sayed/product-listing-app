import type { CartLine } from "@/lib/cart/cart-store";

/** Display “list” and “save” amounts (same idea as product deal cards). */
export function promoListAndSave(unitPrice: number) {
  const list = Math.round(unitPrice * 1.38 * 100) / 100;
  const youSave = Math.round((list - unitPrice) * 100) / 100;
  return { listPrice: list, youSave };
}

/** Footer rollup: MSRP-style subtotal, savings, sale total. */
export function cartRollup(lines: CartLine[]) {
  let subtotalList = 0;
  let totalSale = 0;
  for (const line of lines) {
    const { listPrice } = promoListAndSave(line.price);
    subtotalList += listPrice * line.quantity;
    totalSale += line.price * line.quantity;
  }
  const discount = subtotalList - totalSale;
  return { subtotalList, discount, totalSale };
}
