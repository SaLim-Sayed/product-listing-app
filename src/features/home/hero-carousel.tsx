"use client";

import { buttonVariants, cn } from "@heroui/react";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SHOP_PATH } from "@/lib/nav/shop-path";

type Slide = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  gradient: string;
};

const slides: Slide[] = [
  {
    eyebrow: "Fake Store demo",
    title: "Deals that feel personal",
    description:
      "Browse electronics, jewelry, and more — filter by category and price on the shop.",
    href: SHOP_PATH,
    cta: "Shop the catalog",
    gradient:
      "bg-gradient-to-br from-violet-900 via-violet-800 to-sky-900",
  },
  {
    eyebrow: "Curated for you",
    title: "Everyday essentials",
    description:
      "Clothing, electronics, and home picks — same grid and filters across the catalog.",
    href: SHOP_PATH,
    cta: "Start browsing",
    gradient:
      "bg-gradient-to-br from-indigo-950 via-violet-900 to-zinc-900",
  },
  {
    eyebrow: "Quick checkout",
    title: "Your cart, always ready",
    description:
      "Add items from any product page — demo pricing with promo savings.",
    href: "/cart",
    cta: "View cart",
    gradient:
      "bg-gradient-to-br from-sky-950 via-blue-950 to-violet-950",
  },
];

export function HeroCarousel() {
  return (
    <section className="relative border-b border-zinc-200/80">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div
              className={cn(
                slide.gradient,
                "flex min-h-[380px] flex-col justify-center px-6 py-16 md:min-h-[440px] md:px-12",
              )}
            >
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
                  {slide.eyebrow}
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
                  {slide.title}
                </h2>
                <p className="mt-4 text-lg text-white/85 md:text-xl">
                  {slide.description}
                </p>
                <Link
                  href={slide.href}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "mt-8 inline-flex border-white/80 bg-white/10 font-semibold text-white backdrop-blur-sm hover:border-white hover:bg-white hover:text-violet-900",
                  )}
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
