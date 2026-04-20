"use client";

import { buttonVariants, cn } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { MarketlyFooter } from "@/components/marketly/marketly-footer";
import { MarketlyHeader } from "@/components/marketly/marketly-header";
import { useCategories } from "@/lib/query/hooks/use-categories";
import { formatCategoryLabel } from "@/lib/format-category";
export function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: categories } = useCategories();

  const quickCategories = (categories ?? []).slice(0, 4);

  return (
    <div className="bg-marketly-page text-foreground flex min-h-full flex-col">
      <MarketlyHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showProductSearch={false}
      />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl space-y-12 px-4 py-8 md:space-y-16 md:py-12">
          <HeroCarousel />

          <section className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
              Discover products you&apos;ll love
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-zinc-600">
              Browse the full catalog with category filters, search, and price
              ranges — powered by{" "}
              <span className="font-medium text-zinc-800">Fake Store API</span>
              .
            </p>
            <Link
              href="/products"
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "mt-8 inline-flex font-semibold",
              )}
            >
              Shop all products
            </Link>
          </section>

          {quickCategories.length > 0 ? (
            <section aria-labelledby="browse-categories">
              <h2
                id="browse-categories"
                className="mb-6 text-center text-xl font-bold text-zinc-900"
              >
                Shop by category
              </h2>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
                {quickCategories.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/category/${encodeURIComponent(slug)}`}
                      className="flex min-h-[4.5rem] items-center justify-center rounded-xl border border-zinc-200 bg-white p-4 text-center text-sm font-semibold text-zinc-800 shadow-sm transition hover:border-violet-300 hover:shadow-md"
                    >
                      {formatCategoryLabel(slug)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </main>

      <MarketlyFooter />
    </div>
  );
}
