"use client";

import { Button, SearchField } from "@heroui/react";
import Link from "next/link";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const RIBBON = [
  { label: "Groceries", slug: "electronics" },
  { label: "Premium Fruits", slug: "jewelery" },
  { label: "Home & Kitchen", slug: "men's clothing" },
  { label: "Fashion", slug: "women's clothing" },
  { label: "Electronics", slug: "electronics" },
  { label: "Beauty", slug: "jewelery" },
  { label: "Home Improvement", slug: "electronics" },
  { label: "Sports, Toys & Luggage", slug: "men's clothing" },
] as const;

export function MegaMartHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b border-zinc-200 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap md:gap-4">
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="ghost"
              isIconOnly
              aria-label="Menu"
              className="md:hidden"
              size="sm"
            >
              <MenuIcon />
            </Button>
            <Link
              href="/"
              className="text-mm-primary text-xl font-bold tracking-tight md:text-2xl"
            >
              MegaMart
            </Link>
          </div>

          <div className="order-3 flex w-full min-w-0 md:order-none md:flex-1">
            <SearchField
              aria-label="Search catalog"
              fullWidth
              className="md:mx-auto md:max-w-2xl"
            >
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input
                  placeholder="Search essentials, groceries and more..."
                />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
          </div>

          <nav className="ml-auto flex shrink-0 items-center gap-1 md:gap-2">
            <Link
              href="/"
              className="text-muted-foreground hover:bg-muted hover:text-foreground hidden items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-medium sm:inline-flex"
            >
              <UserIcon />
              Sign Up / Sign In
            </Link>
            <Button variant="ghost" size="sm" aria-label="Cart">
              <span className="inline-flex items-center gap-1.5">
                <CartIcon />
                <span className="hidden sm:inline">Cart</span>
              </span>
            </Button>
          </nav>
        </div>
      </div>

      <div className="bg-mm-surface/80 border-t border-zinc-100">
        <div className="mx-auto max-w-6xl py-2 md:py-2">
          <Swiper
            className="ribbon-swiper !px-2 md:!px-4"
            modules={[FreeMode]}
            slidesPerView="auto"
            spaceBetween={4}
            freeMode={{ enabled: true, momentum: true }}
          >
            {RIBBON.map((item) => (
              <SwiperSlide key={item.label} className="!w-auto">
                <Link
                  href={`/category/${encodeURIComponent(item.slug)}`}
                  className="hover:text-mm-primary flex items-center gap-0.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-white hover:shadow-sm md:text-sm"
                >
                  {item.label}
                  <span className="text-[10px] text-zinc-400">▾</span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <span className="flex flex-col gap-1" aria-hidden>
      <span className="block h-0.5 w-5 bg-current" />
      <span className="block h-0.5 w-5 bg-current" />
      <span className="block h-0.5 w-5 bg-current" />
    </span>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 20a8 8 0 0 1 16 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6h15l-1.5 9h-12L6 6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6 6 5 3H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="9" cy="20" r="1" fill="currentColor" />
      <circle cx="18" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}
