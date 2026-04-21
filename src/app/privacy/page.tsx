import type { Metadata } from "next";
import { StoreShell } from "@/components/layouts/store-shell";
import { Container } from "@/features/products/components/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Marketly handles your data in this demo application.",
};

export default function PrivacyPage() {
  return (
    <StoreShell>
      <div className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl prose prose-zinc">
            <h1 className="text-3xl font-bold text-zinc-900">Privacy Policy</h1>
            <p className="mt-4 text-zinc-500 italic text-sm">Last Updated: April 21, 2026</p>
            
            <div className="mt-10 space-y-8">
              <section>
                <h2 className="text-xl font-bold text-zinc-900">1. Data Collection</h2>
                <p className="mt-2 text-zinc-600">
                  As this is a demo application using the Fake Store API, we do 
                  not collect or store any personal information. All cart data 
                  is stored locally in your browser&apos;s memory (Zustand storage).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-zinc-900">2. Cookies</h2>
                <p className="mt-2 text-zinc-600">
                  We may use essential cookies or local storage to maintain your 
                  shopping cart state and preferences during your session.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-zinc-900">3. Third Party Services</h2>
                <p className="mt-2 text-zinc-600">
                  This site fetches data from https://fakestoreapi.com. Please 
                  refer to their terms regarding data usage when browsing the 
                  catalog.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-zinc-900">4. Security</h2>
                <p className="mt-2 text-zinc-600">
                  We prioritize the security of our demo environment and do not 
                  transmit any user data over the network.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </div>
    </StoreShell>
  );
}
