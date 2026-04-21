import type { Metadata } from "next";
import { MarketlyShopLayout } from "@/components/marketly/marketly-shop-layout";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse products from fakestoreapi.com — filter by category (from /products/categories) and price on the client.",
};

export default function ProductsPage() {
  return <MarketlyShopLayout />;
}
