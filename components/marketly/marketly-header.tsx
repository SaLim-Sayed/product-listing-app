"use client";

import { Button, InputGroup } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

export function MarketlyHeader({ searchQuery, onSearchChange }: Props) {
  const pathname = usePathname();

  const nav = (href: string, label: string) => {
    const active = pathname === href;
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
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 md:flex-nowrap md:gap-6 md:py-3.5">
        <MarketlyLogoInline />

        <nav className="order-2 flex flex-1 items-center justify-center gap-8 md:order-none md:flex-none md:justify-center">
          {nav("/", "Home")}
          {nav("/products", "Products")}
        </nav>

        <div className="order-3 min-w-0 w-full flex-1 md:order-none md:max-w-xl md:flex-1">
          <InputGroup.Root fullWidth className="rounded-full border border-zinc-200 bg-zinc-50/80 shadow-inner">
            <InputGroup.Prefix className="pl-3 text-zinc-400">
              <SearchGlyph />
            </InputGroup.Prefix>
            <InputGroup.Input
              aria-label="Search products"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400"
            />
            <InputGroup.Suffix className="pr-2 text-zinc-400">
              <span aria-hidden className="inline-block px-1 text-xs">
                ▾
              </span>
            </InputGroup.Suffix>
          </InputGroup.Root>
        </div>

        <div className="ml-auto shrink-0">
          <span className="relative inline-flex">
            <Button
              variant="secondary"
              isIconOnly
              aria-label="Shopping cart, 1 item"
              className="rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-700 shadow-none"
            >
              <CartGlyph />
            </Button>
            <span className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-violet-600 px-1 text-[11px] font-bold text-white ring-2 ring-white">
              1
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}

function MarketlyLogoInline() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <span
        className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-sky-500 text-lg font-black text-white shadow-sm"
        aria-hidden
      >
        M
      </span>
      <span className="text-xl font-bold tracking-tight text-zinc-900">
        Marketly
      </span>
    </Link>
  );
}

function SearchGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
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
