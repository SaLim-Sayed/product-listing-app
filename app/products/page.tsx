import type { Metadata } from "next";
import { MarketlyShopLayout } from "@/components/marketly/marketly-shop-layout";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse the full Fake Store catalog.",
};

export default function ProductsPage() {
  return <MarketlyShopLayout />;
}
