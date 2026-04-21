"use client";

import { toast, useOverlayState } from "@heroui/react";
import { useCartStore } from "@/lib/cart/cart-store";
import { promoListAndSave } from "@/lib/cart/promo-pricing";
import type { Product } from "@/features/products/types";

export function useAddToCartModalLogic(product: Product | null, onClose: () => void) {
  const addItem = useCartStore((s) => s.addItem);
  
  const state = useOverlayState({
    isOpen: product != null,
    onOpenChange: (open) => {
      if (!open) onClose();
    },
  });

  const handleConfirm = () => {
    if (product) {
      addItem(product);
      toast.success("Added to cart", {
        description: `${product.title} has been added to your cart.`,
      });
      state.close();
    }
  };

  const promoData = product ? promoListAndSave(product.price) : { youSave: 0 };
  const lineTotal = product ? product.price : 0;

  return {
    state,
    promoData,
    lineTotal,
    handleConfirm,
  };
}
