import Link from "next/link";
import { Container } from "@/features/products/components/Container";
import {
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoInstagram,
  BiLogoGithub,
} from "react-icons/bi";

export function MarketlyFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white">
      <div className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-2">
              <Link
                href="/"
                className="text-xl font-bold tracking-tighter text-zinc-900"
              >
                MARKETLY<span className="text-violet-600">.</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
                A premium e-commerce demonstration platform built with Next.js
                and HeroUI. Sourcing quality data from the Fake Store API.
              </p>
              <div className="mt-6 flex gap-4">
                <a
                  href="#"
                  className="text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  <BiLogoFacebook className="size-5" />
                </a>
                <a
                  href="#"
                  className="text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  <BiLogoTwitter className="size-5" />
                </a>
                <a
                  href="#"
                  className="text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  <BiLogoInstagram className="size-5" />
                </a>
                <a
                  href="#"
                  className="text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  <BiLogoGithub className="size-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                Shop
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-zinc-500">
                <li>
                  <Link
                    href="/shop"
                    className="hover:text-violet-600 transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?category=electronics"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?category=jewelery"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Jewelery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?category=men's clothing"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Men&apos;s Clothing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                Company
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-zinc-500">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-violet-600 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                Legal
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-zinc-500">
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      <div className="border-t border-zinc-100 py-8 text-center text-xs text-zinc-400">
        <Container>
          <p>
            © {currentYear} Marketly. Built for demonstration purposes using
            Fake Store API.
          </p>
        </Container>
      </div>
    </footer>
  );
}
