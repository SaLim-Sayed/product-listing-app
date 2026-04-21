"use client";

import { MarketlyFooter } from "@/components/ui/footer";

export function StoreShell({ children }: { children: React.ReactNode }) {
 
  return (
    <div className="app-shell">
      <main className="flex-1">{children}</main>
      <MarketlyFooter />
    </div>
  );
}
