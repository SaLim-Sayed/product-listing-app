"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HERO_NAVY = "#151B2D";

const SLIDES = [

  {
    eyebrow: "Premium electronics",
    title: "BIG TECH SALE",
    sub: "UP TO 60% OFF",
    src: "/landing/tv2.png",
    alt: "Acer widescreen monitor",
  },
  {
    eyebrow: "Everyday essentials",
    title: "HOME & STYLE",
    sub: "UP TO 50% OFF",
    src: "/landing/clothes.png",
    alt: "Casual outfit flat lay with t-shirt, sneakers, and denim",
  },
  {
    eyebrow: "Luxury accessories",
    title: "FINE JEWELRY.",
    sub: "NEW COLLECTION",
    src: "/landing/jewel.png",
    alt: "Silver dragon bracelet jewelry",
  },
] as const;

export function HeroCarousel() {
  return (
    <div className="landing-hero relative px-9 pt-2 pb-2 sm:px-11 md:px-14">
      <Button
        variant="ghost"
        className="hero-carousel-prev absolute left-4 top-1/2 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white  transition hover:bg-zinc-50 sm:left-8 md:size-11"
        aria-label="Previous slide"
      >
        <HiOutlineChevronLeft className="text-teal-500" />
      </Button>
      <Button
        variant="ghost"
        className="hero-carousel-next absolute right-4 top-1/2 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white transition hover:bg-zinc-50 sm:right-8 md:size-11"
        aria-label="Next slide"
      >
        <HiOutlineChevronRight className="text-teal-500 text-3xl font-bold" />
      </Button>

      <Swiper
        className="hero-swiper overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10"
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        loop
        speed={600}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".landing-hero .hero-carousel-prev",
          nextEl: ".landing-hero .hero-carousel-next",
        }}
      >
        {SLIDES.map((slide, slideIdx) => (
          <SwiperSlide key={slide.title}>
            <HeroSlide slide={slide} priority={slideIdx === 0} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

 
 
function HeroSlide({
  slide,
  priority,
}: {
  slide: (typeof SLIDES)[number];
  priority?: boolean;
}) {
  return (
    <div
      className="relative isolate min-h-[240px] overflow-hidden rounded-2xl md:min-h-[300px]"
      style={{ backgroundColor: HERO_NAVY }}
    >
      <HeroBackdrop />

      <div className="relative z-10 grid min-h-[inherit] gap-6 px-6 pb-14 pt-7 md:grid-cols-2 md:gap-8 md:px-10 md:pb-16 md:pt-10">
        <div className="flex flex-col justify-center text-left text-white">
          <p className="text-xs font-normal uppercase tracking-wide text-white/90 md:text-sm">
            {slide.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-bold uppercase leading-[1.1] tracking-tight md:text-4xl lg:text-[2.75rem]">
            {slide.title}
          </h2>
          <p className="mt-4 text-base font-normal text-white md:text-lg">{slide.sub}</p>
        </div>

        <div className="relative flex min-h-[160px] items-center justify-center md:min-h-[200px]">
          <div className="relative h-44 w-full max-w-[300px] md:h-56 md:max-w-[360px]">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-contain object-center drop-shadow-2xl"
              sizes="(max-width: 768px) 300px, 360px"
              priority={priority}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      aria-hidden
    >
      <div
        className="absolute -left-[18%] top-1/2 h-[min(120%,520px)] w-[min(120%,520px)] -translate-y-1/2 rounded-full border border-white/8"
        style={{ aspectRatio: "1" }}
      />
      <div className="absolute -right-[12%] -top-[20%] h-[min(70%,380px)] w-[min(70%,380px)] rounded-full border border-white/6" />
      <div className="absolute -bottom-[25%] right-[8%] h-[min(55%,300px)] w-[min(55%,300px)] rounded-full border border-white/5" />
    </div>
  );
}
