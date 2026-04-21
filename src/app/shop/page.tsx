import type { Metadata } from "next";
import { Suspense } from "react";
import Products from "@/features/products/ProductListing/ProductListing";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse Marketly — filter by category and price (Fake Store API demo).",
};

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
