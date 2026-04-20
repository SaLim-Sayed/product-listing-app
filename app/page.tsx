import type { Metadata } from "next";
import { HomeScreen } from "@/components/home/home-screen";

/** Listing page SEO (App Router replaces `next/head` from the Pages Router). */
export const metadata: Metadata = {
  title: "Product catalog",
  description:
    "Browse products from fakestoreapi.com — filter by category and client-side price range.",
};

export default function Home() {
  return <HomeScreen />;
}
