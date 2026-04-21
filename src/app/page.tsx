import type { Metadata } from "next";
import { HomeScreen } from "@/features/home";

export const metadata: Metadata = {
  title: "Welcome",
  description:
    "Marketly — explore deals and jump into the full product catalog.",
};

export default function Home() {
  return <HomeScreen />;
}
