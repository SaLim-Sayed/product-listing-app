import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart | Marketly",
  description: "Review your shopping cart.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
