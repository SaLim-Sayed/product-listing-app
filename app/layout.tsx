import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/app/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Default SEO; route-level `metadata` / `generateMetadata` override per page (App Router). Pages Router used `next/head`. */
export const metadata: Metadata = {
  title: {
    default: "Marketly — Fake Store demo",
    template: "%s | Marketly",
  },
  description:
    "Products from fakestoreapi.com — listing, filters, and product detail.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} light h-full antialiased`}
      data-theme="light"
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
