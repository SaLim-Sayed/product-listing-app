import type { Metadata } from "next";
import { MarketlyShopLayout } from "@/components/marketly/marketly-shop-layout";

export const metadata: Metadata = {
  title: "Products | Marketly",
  description: "Browse the full catalog.",
};

export default function ProductsPage() {
  return <MarketlyShopLayout />;
}
