"use client";

import { Button, Card } from "@heroui/react";
import Link from "next/link";
import { CartLineRow } from "@/components/ui/CartDrawer/CartDrawer";
import { StoreShell } from "@/components/layouts/store-shell";
import { cartRollup } from "@/lib/cart/promo-pricing";
import { useCartStore } from "@/lib/cart/cart-store";

export default function CartPage() {
  const lines = useCartStore((s) => s.lines);
  const setLineQuantity = useCartStore((s) => s.setLineQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const { subtotalList, discount, totalSale } = cartRollup(lines);

  return (
    <StoreShell>
      <div className="mx-auto max-w-lg px-4 py-8">
        <h1 className="text-2xl font-bold text-zinc-900">Your cart</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Review items before checkout (demo — Fake Store prices).
        </p>

        <Card className="mt-8 rounded-xl border border-zinc-200 p-4 shadow-sm">
          {lines.length === 0 ? (
            <p className="py-6 text-center text-sm text-zinc-500">
              Nothing here yet.{" "}
              <Link
                href="/shop"
                className="font-semibold text-violet-600 hover:underline"
              >
                Browse products
              </Link>
            </p>
          ) : (
            <>
              {lines.map((line) => (
                <CartLineRow
                  key={line.productId}
                  line={line}
                  onQtyChange={(q) => setLineQuantity(line.productId, q)}
                  onRemove={() => removeLine(line.productId)}
                />
              ))}
              <div className="mt-4 space-y-2 border-t border-zinc-100 pt-4 text-sm">
                <div className="flex justify-between text-zinc-700">
                  <span>Subtotal</span>
                  <span className="tabular-nums">${subtotalList.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-emerald-600">
                  <span>Discount</span>
                  <span className="tabular-nums">−${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-zinc-100 pt-3 text-lg font-bold">
                  <span>Total</span>
                  <span className="tabular-nums">${totalSale.toFixed(2)}</span>
                </div>
              </div>
              <Button className="mt-6 w-full bg-violet-600 font-semibold text-white hover:bg-violet-700">
                Proceed to Checkout
              </Button>
            </>
          )}
        </Card>
      </div>
    </StoreShell>
  );
}
