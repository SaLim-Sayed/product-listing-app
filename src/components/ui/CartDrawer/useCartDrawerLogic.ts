"use client";

import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";
import { cartRollup } from "@/lib/cart/promo-pricing";
import {
  selectCartTotalQuantity,
  useCartStore,
} from "@/lib/cart/cart-store";
import type { UseOverlayStateReturn } from "@heroui/react";

export function useCartDrawerLogic(state: UseOverlayStateReturn) {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const setLineQuantity = useCartStore((s) => s.setLineQuantity);
  const removeLine = useCartStore((s) => s.removeLine);

  const count = useCartStore(selectCartTotalQuantity);
  const { subtotalList, discount, totalSale } = cartRollup(lines);

  const heading =
    count === 0
      ? "Your Cart"
      : count === 1
        ? "Your Cart (1 item)"
        : `Your Cart (${count} items)`;

  const handleRemove = (productId: number, title: string) => {
    removeLine(productId);
    toast.warning("Removed from cart", {
      description: `${title} has been removed.`,
    });
  };

  const handleCheckout = () => {
    state.close();
    router.push("/cart");
  };

  return {
    lines,
    count,
    heading,
    subtotalList,
    discount,
    totalSale,
    setLineQuantity,
    handleRemove,
    handleCheckout,
  };
}
