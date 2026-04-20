"use client";

import { useState } from "react";
import { MarketlyFooter } from "@/components/marketly/marketly-footer";
import { MarketlyHeader } from "@/components/marketly/marketly-header";

export function MarketlyProductShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-marketly-page text-foreground flex min-h-full flex-col">
      <MarketlyHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className="flex-1">{children}</main>
      <MarketlyFooter />
    </div>
  );
}
