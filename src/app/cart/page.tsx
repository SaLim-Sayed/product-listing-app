"use client";

import { Button, Card } from "@heroui/react";
import Link from "next/link";
import { BiShoppingBag, BiArrowBack } from "react-icons/bi";
import { CartLineRow } from "@/components/ui/CartDrawer/CartDrawer";
import { StoreShell } from "@/components/layouts/store-shell";
import { cartRollup } from "@/lib/cart/promo-pricing";
import { useCartStore } from "@/lib/cart/cart-store";
import { SHOP_PATH } from "@/lib/nav/shop-path";

export default function CartPage() {
  const lines = useCartStore((s) => s.lines);
  const setLineQuantity = useCartStore((s) => s.setLineQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const { subtotalList, discount, totalSale } = cartRollup(lines);

  const isEmpty = lines.length === 0;

  return (
    <StoreShell>
      <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
              Shopping Cart
            </h1>
            <p className="mt-2 text-zinc-500">
              {isEmpty
                ? "Your cart is currently empty."
                : `You have ${lines.length} ${
                    lines.length === 1 ? "item" : "items"
                  } in your cart.`}
            </p>
          </div>
          <Link
            href={SHOP_PATH}
            className="group inline-flex items-center text-sm font-semibold text-violet-600 hover:text-violet-700"
          >
            <BiArrowBack className="mr-2 transition-transform group-hover:-translate-x-1" />
            Continue Shopping
          </Link>
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-100 bg-zinc-50/50 py-20 text-center">
            <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-zinc-100 text-3xl text-zinc-400">
              <BiShoppingBag />
            </div>
            <h2 className="text-xl font-bold text-zinc-900">
              Your cart is empty
            </h2>
            <p className="mt-2 max-w-xs text-zinc-500">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link href={SHOP_PATH}>
              <Button
                variant="primary"
                className="mt-8 bg-violet-600 px-8 font-semibold text-white shadow-lg shadow-violet-200 hover:bg-violet-700"
              >
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <div className="divide-y divide-zinc-100 px-6">
                  {lines.map((line) => (
                    <CartLineRow
                      key={line.productId}
                      line={line}
                      onQtyChange={(q) => setLineQuantity(line.productId, q)}
                      onRemove={() => removeLine(line.productId)}
                    />
                  ))}
                </div>
              </Card>
            </div>

            <aside className="lg:col-span-1">
              <Card className="sticky top-24 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-zinc-900">
                  Order Summary
                </h2>
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-zinc-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-zinc-900 tabular-nums">
                      ${subtotalList.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>Shipping</span>
                    <span className="font-medium text-emerald-600 uppercase tracking-wide text-xs">
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>Discount</span>
                    <span className="font-medium text-emerald-600 tabular-nums">
                      −${discount.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-zinc-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-zinc-900">
                      <span>Total</span>
                      <span className="tabular-nums">
                        ${totalSale.toFixed(2)}
                      </span>
                    </div>
                    <p className="mt-1 text-right text-xs text-zinc-400">
                      Including VAT
                    </p>
                  </div>
                </div>
                <Button className="mt-8 w-full bg-violet-600 py-6 text-lg font-bold text-white shadow-xl shadow-violet-200 hover:bg-violet-700">
                  Checkout Now
                </Button>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <div className="size-1 rounded-full bg-emerald-500" />
                    Secure checkout powered by Stripe
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <div className="size-1 rounded-full bg-emerald-500" />
                    Free shipping on all orders
                  </div>
                </div>
              </Card>
            </aside>
          </div>
        )}
      </div>
    </StoreShell>
  );
}
