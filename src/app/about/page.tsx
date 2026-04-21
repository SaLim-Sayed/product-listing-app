import type { Metadata } from "next";
import { StoreShell } from "@/components/layouts/store-shell";
import { Container } from "@/features/products/components/Container";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Marketly and our mission to provide quality products via the Fake Store API.",
};

export default function AboutPage() {
  return (
    <StoreShell>
      <div className="bg-zinc-50 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              About Marketly
            </h1>
            <p className="mt-6 text-xl text-zinc-600 leading-relaxed">
              Marketly is a premium e-commerce demonstration platform built with 
              modern web technologies. We believe that shopping should be fast, 
              beautiful, and intuitive.
            </p>
            
            <div className="mt-12 space-y-12 border-t border-zinc-200 pt-12">
              <section>
                <h2 className="text-2xl font-bold text-zinc-900">Our Mission</h2>
                <p className="mt-4 text-zinc-600">
                  Our goal is to showcase how powerful modern frameworks like 
                  Next.js and UI libraries like HeroUI can be when combined to 
                  create a seamless shopping experience. We focus on performance, 
                  accessibility, and a clean aesthetic to ensure that users can 
                  find what they need with zero friction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900">Technology</h2>
                <p className="mt-4 text-zinc-600">
                  This project utilizes the <strong>Fake Store API</strong> to 
                  provide real-world data in a controlled demo environment. 
                  Key features include:
                </p>
                <ul className="mt-4 list-inside list-disc space-y-2 text-zinc-600">
                  <li>Static Site Generation (SSG) for instant product pages</li>
                  <li>Client-side filtering and search</li>
                  <li>Optimized image loading and skeletons</li>
                  <li>Robust error boundary handling</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900">Open Source</h2>
                <p className="mt-4 text-zinc-600">
                  Marketly is built as an open-source project to help developers 
                  understand the best practices of modern web development and 
                  Next.js 15 architectures.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </div>
    </StoreShell>
  );
}
