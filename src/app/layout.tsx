import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/app/providers";
import "@/styles/globals.css";
import { MarketlyHeader } from "@/components/ui/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function metadataBaseFromEnv(): URL | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return undefined;
  const normalized = raw.endsWith("/") ? raw.slice(0, -1) : raw;
  try {
    return new URL(normalized);
  } catch {
    return undefined;
  }
}

const resolvedMetadataBase = metadataBaseFromEnv();

export const metadata: Metadata = {
  ...(resolvedMetadataBase ? { metadataBase: resolvedMetadataBase } : {}),
  title: {
    default: "Marketly — Fake Store demo",
    template: "%s | Marketly",
  },
  description:
    "Product listing from https://fakestoreapi.com/products — responsive grid, category filter, price range, and dynamic product pages.",
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
        <Providers>
          <MarketlyHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
