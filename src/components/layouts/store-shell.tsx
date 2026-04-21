"use client";

import { MarketlyFooter } from "@/components/ui/footer";

export function StoreShell({ children }: { children: React.ReactNode }) {
 
  return (
    <div className="bg-marketly-page text-foreground flex min-h-full flex-col">
      <main className="flex-1">{children}</main>
      <MarketlyFooter />
    </div>
  );
}
