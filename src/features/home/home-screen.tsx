"use client";

import { MarketlyFooter } from "@/components/ui/footer";
import { LandingPage } from "@/features/home/landing-page";

/** Marketing landing at `/` — catalog lives at `/shop`. */
export function HomeScreen() {
  return (
    <div className="app-shell">
      <main className="flex-1">
        <LandingPage />
      </main>
      <MarketlyFooter />
    </div>
  );
}
