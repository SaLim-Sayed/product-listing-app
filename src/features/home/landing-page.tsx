"use client";

import { Skeleton } from "@heroui/react";
import Link from "next/link";
import { HeroCarousel } from "./hero-carousel";
import { useCategories } from "@/features/products/hooks";
import { formatCategoryLabel } from "@/features/products/utils";
import { shopCatalogHref } from "@/lib/nav/shop-path";

export function LandingPage() {
  const { data: categories, isPending, isError } = useCategories();

  return (
    <div className="relative overflow-hidden">
      <HeroCarousel />

      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="text-center text-2xl font-bold text-zinc-900 md:text-3xl">
          Shop by category
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-zinc-600">
          Jump straight into a department — same filters and grid as the full
          catalog.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isPending
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-28 rounded-xl" />
              ))
            : null}

          {isError ? (
            <li className="col-span-full text-center text-sm text-red-600">
              Could not load categories. You can still browse from the shop.
            </li>
          ) : null}

          {!isPending && !isError && categories
            ? categories.map((slug) => (
                <li key={slug}>
                  <Link
                    href={shopCatalogHref(slug)}
                    className="group block rounded-xl border border-zinc-200/90 bg-white p-6 shadow-sm transition-all hover:border-violet-200 hover:shadow-md"
                  >
                    <span className="text-lg font-bold text-zinc-900">
                      {formatCategoryLabel(slug)}
                    </span>
                    <span className="mt-2 block text-sm font-semibold text-violet-600 group-hover:underline">
                      Browse category →
                    </span>
                  </Link>
                </li>
              ))
            : null}
        </ul>
      </section>
    </div>
  );
}
