import Link from "next/link";

const popular = [
  "Staples",
  "Beverages",
  "Personal Care",
  "Home Care",
  "Baby Care",
  "Snacks & Branded Foods",
];

const services = [
  "About Us",
  "Terms & Conditions",
  "FAQ",
  "Privacy Policy",
  "E-waste Policy",
  "Cancellation Policy",
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-mm-primary text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:gap-8">
        <div className="space-y-4">
          <p className="text-2xl font-bold">MegaMart</p>
          <div>
            <p className="text-sm font-semibold opacity-90">Contact Us</p>
            <ul className="mt-2 space-y-2 text-sm opacity-90">
              <li className="flex items-center gap-2">
                <span aria-hidden>💬</span>
                WhatsApp
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden>📞</span>
                1800-000-0000
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold opacity-90">Download App</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-md bg-white/15 px-3 py-1.5 text-xs font-medium">
                App Store
              </span>
              <span className="rounded-md bg-white/15 px-3 py-1.5 text-xs font-medium">
                Google Play
              </span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide opacity-95">
            Most popular categories
          </p>
          <ul className="mt-4 space-y-2 text-sm opacity-90">
            {popular.map((item) => (
              <li key={item}>
                <Link href="/" className="hover:underline">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide opacity-95">
            Customer services
          </p>
          <ul className="mt-4 space-y-2 text-sm opacity-90">
            {services.map((item) => (
              <li key={item}>
                <Link href="/" className="hover:underline">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 py-4 text-center text-xs opacity-80">
        © {new Date().getFullYear()} All rights reserved. Demo storefront —
        product data from Fake Store API.
      </div>
    </footer>
  );
}
