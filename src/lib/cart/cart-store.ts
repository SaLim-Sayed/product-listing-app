import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Product } from "@/features/products/types";

export type CartLine = {
  productId: number;
  quantity: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

type CartState = {
  lines: CartLine[];
  addItem: (product: Product) => void;
  removeLine: (productId: number) => void;
  setLineQuantity: (productId: number, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addItem: (product) => {
        const lines = get().lines;
        const idx = lines.findIndex((l) => l.productId === product.id);
        if (idx >= 0) {
          const next = [...lines];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
          set({ lines: next });
          return;
        }
        set({
          lines: [
            ...lines,
            {
              productId: product.id,
              quantity: 1,
              title: product.title,
              price: product.price,
              image: product.image,
              category: product.category,
            },
          ],
        });
      },
      removeLine: (productId) =>
        set((state) => ({
          lines: state.lines.filter((l) => l.productId !== productId),
        })),
      setLineQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeLine(productId);
          return;
        }
        set((state) => ({
          lines: state.lines.map((l) =>
            l.productId === productId ? { ...l, quantity } : l,
          ),
        }));
      },
      clear: () => set({ lines: [] }),
    }),
    {
      name: "marketly-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
);

export function selectCartTotalQuantity(state: CartState): number {
  return state.lines.reduce((sum, line) => sum + line.quantity, 0);
}
