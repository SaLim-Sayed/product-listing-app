import type { Metadata } from "next";
import { Suspense } from "react";
import Products from "@/features/products/ProductListing/ProductListing";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}): Promise<Metadata> {
  const { category } = await searchParams;
  const categoryLabel = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "";

  return {
    title: categoryLabel ? `${categoryLabel}` : "Shop",
    description: categoryLabel
      ? `Browse our ${categoryLabel} collection at Marketly.`
      : "Browse the full Marketly catalog — filter by category and price.",
  };
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20 text-sm text-zinc-500">
          Loading catalog…
        </div>
      }
    >
      <Products />
    </Suspense>
  );
}
