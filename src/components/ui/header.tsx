"use client";

import { CartDrawer } from "@/components/ui/CartDrawer/CartDrawer";
import { selectCartTotalQuantity, useCartStore } from "@/lib/cart/cart-store";
import { Button, useOverlayState } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiCart } from "react-icons/bi";

export function MarketlyHeader() {
  const pathname = usePathname();
  const cartCount = useCartStore(selectCartTotalQuantity);
  const cartDrawer = useOverlayState();

  const nav = (href: string, label: string) => {
    const active =
      href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`);
    return (
      <Link
        href={href}
        className={
          active
            ? "text-marketly-price text-sm font-semibold"
            : "text-zinc-600 text-sm font-medium hover:text-zinc-900"
        }
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <CartDrawer state={cartDrawer} />
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white shadow-sm">
        {/* Mobile: logo + cart row, then full-width nav. md+: single 3-column row. */}
        <div
          className="
            mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] grid-rows-[auto_auto]
            gap-x-3 gap-y-2 px-4 py-3
            md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:grid-rows-1 md:gap-y-0 md:gap-x-6 md:py-3.5
          "
        >
          <div className="col-start-1 row-start-1 min-w-0 justify-self-start self-center">
            <MarketlyLogoInline />
          </div>

          <nav
            className="
              col-span-2 row-start-2 flex items-center justify-center gap-8 border-t border-zinc-100 pt-3
              md:col-span-1 md:col-start-2 md:row-start-1 md:border-0 md:pt-0 md:gap-8
            "
          >
            {nav("/", "Home")}
            {nav("/shop", "Shop")}
          </nav>

          <div className="col-start-2 row-start-1 justify-self-end self-center md:col-start-3">
            <span className="relative inline-flex">
              <Button
                variant="secondary"
                isIconOnly
                aria-label={
                  cartCount === 0
                    ? "Shopping cart, empty"
                    : `Shopping cart, ${cartCount} items`
                }
                className="rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-700 shadow-none"
                onPress={() => cartDrawer.open()}
              >
                <BiCart />
              </Button>
              {cartCount > 0 ? (
                <span
                  className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-violet-600 px-1 text-[11px] font-bold text-white ring-2 ring-white"
                  suppressHydrationWarning
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              ) : null}
            </span>
          </div>
        </div>
      </header>
    </>
  );
}

function MarketlyLogoInline() {
  return (
    <Link
      href="/"
      className="flex min-w-0 max-w-full shrink items-center gap-2 sm:gap-2.5"
    >
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-sky-500 text-lg font-black text-white shadow-sm"
        aria-hidden
      >
        M
      </span>
      <span className="truncate text-lg font-bold tracking-tight text-zinc-900 sm:text-xl">
        Marketly
      </span>
    </Link>
  );
}
