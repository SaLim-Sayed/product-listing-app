"use client";

import {
  Button,
  Drawer,
  type UseOverlayStateReturn,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { promoListAndSave } from "@/lib/cart/promo-pricing";
import {
  type CartLine,
} from "@/lib/cart/cart-store";
import { safeImageSrc } from "@/lib/image-url";
import { BsTrash } from "react-icons/bs";
import { useCartDrawerLogic } from "./useCartDrawerLogic";

type Props = {
  state: UseOverlayStateReturn;
};

export function CartDrawer({ state }: Props) {
  const {
    lines,
    heading,
    subtotalList,
    discount,
    totalSale,
    setLineQuantity,
    handleRemove,
    handleCheckout,
  } = useCartDrawerLogic(state);

  return (
    <Drawer state={state}>
      <Drawer.Backdrop isDismissable>
        <Drawer.Content placement="right">
          <Drawer.Dialog className="flex h-[100dvh] max-w-full flex-col bg-white sm:max-w-md">
            <Drawer.Header className="flex shrink-0 flex-row items-start justify-between gap-3 border-b border-zinc-200 px-4 pb-4 pt-5">
              <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
                <Drawer.Heading className="text-lg font-bold text-zinc-900">
                  {heading}
                </Drawer.Heading>
                <Link
                  href="/cart"
                  className="text-sm font-semibold text-violet-600 hover:text-violet-700"
                  onClick={() => state.close()}
                >
                  View Cart
                </Link>
              </div>
              <Drawer.CloseTrigger className="shrink-0 text-zinc-500" />
            </Drawer.Header>

            <Drawer.Body className="flex min-h-0 flex-1 flex-col gap-0 overflow-y-auto px-4 pt-2">
              {lines.length === 0 ? (
                <p className="py-8 text-center text-sm text-zinc-500">
                  Your cart is empty. Add something from the catalog.
                </p>
              ) : (
                lines.map((line) => (
                  <CartLineRow
                    key={line.productId}
                    line={line}
                    onQtyChange={(q) => setLineQuantity(line.productId, q)}
                    onRemove={() => handleRemove(line.productId, line.title)}
                  />
                ))
              )}
            </Drawer.Body>

            <Drawer.Footer className="shrink-0 border-t border-zinc-200 bg-white px-4 pb-6 pt-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-zinc-700">
                  <span>Subtotal</span>
                  <span className="tabular-nums">
                    ${subtotalList.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-medium text-emerald-600">
                  <span>Discount</span>
                  <span className="tabular-nums">
                    −${discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-zinc-100 pt-3 text-lg font-bold text-zinc-900">
                  <span>Total</span>
                  <span className="tabular-nums">${totalSale.toFixed(2)}</span>
                </div>
              </div>
              <Button
                className="mt-4 w-full bg-violet-600 font-semibold text-white hover:bg-violet-700"
                isDisabled={lines.length === 0}
                onPress={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

export function CartLineRow({
  line,
  onQtyChange,
  onRemove,
}: {
  line: CartLine;
  onQtyChange: (q: number) => void;
  onRemove: () => void;
}) {
  const { listPrice } = promoListAndSave(line.price);
  const listLine = listPrice * line.quantity;
  const saleLine = line.price * line.quantity;
  const src = safeImageSrc(line.image);

  return (
    <div className="border-b border-zinc-100 py-4 last:border-b-0">
      <div className="flex gap-3">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-zinc-50">
          <Image
            src={src}
            alt=""
            fill
            className="object-contain p-1"
            sizes="64px"
            unoptimized
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-medium leading-snug text-zinc-900">
            {line.title}
          </p>
          <p className="mt-0.5 text-xs text-zinc-400 line-through">
            ${listPrice.toFixed(2)}
          </p>
          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-0.5">
              <Button
                isIconOnly
                size="sm"
                variant="ghost"
                className="size-8 min-w-8"
                aria-label="Decrease quantity"
                onPress={() => onQtyChange(line.quantity - 1)}
              >
                −
              </Button>
              <span className="min-w-8 text-center text-sm font-semibold tabular-nums">
                {line.quantity}
              </span>
              <Button
                isIconOnly
                size="sm"
                variant="ghost"
                className="size-8 min-w-8"
                aria-label="Increase quantity"
                onPress={() => onQtyChange(line.quantity + 1)}
              >
                +
              </Button>
            </div>
            <Button
              isIconOnly
              variant="ghost"
              aria-label="Remove item"
              className="text-rose-500 hover:bg-rose-50 hover:text-rose-600"
              onPress={onRemove}
            >
              <BsTrash size={18} />
            </Button>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-bold tabular-nums text-zinc-900">
            ${saleLine.toFixed(2)}
          </p>
          <p className="text-xs text-zinc-400 line-through">
            ${listLine.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
