import type { Metadata } from "next";
import { StoreShell } from "@/components/layouts/store-shell";
import { Container } from "@/features/products/components/Container";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Marketly's terms and conditions for using our platform.",
};

export default function TermsPage() {
  return (
    <StoreShell>
      <div className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl prose prose-zinc">
            <h1 className="text-3xl font-bold text-zinc-900">Terms of Service</h1>
            <p className="mt-4 text-zinc-500 italic text-sm">Last Updated: April 21, 2026</p>
            
            <div className="mt-10 space-y-8">
              <section>
                <h2 className="text-xl font-bold text-zinc-900">1. Acceptance of Terms</h2>
                <p className="mt-2 text-zinc-600">
                  By accessing and using Marketly (the &quot;Site&quot;), you agree to comply 
                  with and be bound by these Terms of Service. This is a demo 
                  application, and no real transactions are processed.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-zinc-900">2. Use of License</h2>
                <p className="mt-2 text-zinc-600">
                  Permission is granted to temporarily download one copy of the 
                  materials on Marketly for personal, non-commercial transitory 
                  viewing only.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-zinc-900">3. Disclaimer</h2>
                <p className="mt-2 text-zinc-600">
                  The materials on Marketly are provided on an &quot;as is&quot; basis. 
                  Marketly makes no warranties, expressed or implied, and hereby 
                  disclaims and negates all other warranties including, without 
                  limitation, implied warranties or conditions of merchantability.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-zinc-900">4. Limitations</h2>
                <p className="mt-2 text-zinc-600">
                  In no event shall Marketly or its suppliers be liable for any 
                  damages arising out of the use or inability to use the materials 
                  on the Site.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </div>
    </StoreShell>
  );
}
