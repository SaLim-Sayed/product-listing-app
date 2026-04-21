"use client";

import { MarketlyFooter } from "@/components/ui/footer";
import { LandingPage } from "@/features/home/landing-page";

/** Marketing landing at `/` — catalog lives at `/shop`. */
export function HomeScreen() {
  return (
    <div className="bg-marketly-page text-foreground flex min-h-full flex-col">
       <main className="flex-1">
        <LandingPage />
      </main>
      <MarketlyFooter />
    </div>
  );
}
