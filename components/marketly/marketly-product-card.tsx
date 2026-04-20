"use client";

import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AddToCartModal } from "@/components/marketly/add-to-cart-modal";
import { safeImageSrc } from "@/lib/image-url";
import type { Product } from "@/lib/types/product";

function snippet(text: string, max = 72) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).trim()}…`;
}

export function MarketlyProductCard({ product }: { product: Product }) {
  const [confirmProduct, setConfirmProduct] = useState<Product | null>(null);
  const src = safeImageSrc(product.image);
  const cat = product.category.replace(/'/g, "’");

  return (
    <Card className="group overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-sm transition-shadow hover:shadow-md">
      <AddToCartModal
        product={confirmProduct}
        onClose={() => setConfirmProduct(null)}
      />
      <div className="relative">
        <Link href={`/products/${product.id}`} className="block">
          <div className="flex aspect-[4/3] items-center justify-center bg-zinc-50 p-6">
            <Image
              src={src}
              alt={product.title}
              width={200}
              height={200}
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 50vw, 25vw"
              unoptimized
            />
          </div>
          <div className="space-y-2 p-4 pt-3">
            <h3 className="line-clamp-1 text-[15px] font-bold leading-snug text-zinc-900">
              {product.title}
            </h3>
            <p className="line-clamp-2 min-h-[2.5rem] text-xs leading-relaxed text-zinc-500">
              {snippet(product.description)}
            </p>
            <div className="flex items-end justify-between gap-2 pt-1">
              <span className="text-marketly-price text-lg font-bold tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              <span className="max-w-[45%] truncate text-right text-xs font-medium capitalize text-zinc-400">
                {cat}
              </span>
            </div>
          </div>
        </Link>
        <Button
          isIconOnly
          aria-label={`Add ${product.title} to cart`}
          className="absolute right-3 top-3 z-10 size-10 min-w-10 rounded-full border-0 bg-zinc-900 text-white shadow-md hover:bg-zinc-800"
          onPress={() => setConfirmProduct(product)}
        >
          <MiniCart />
        </Button>
      </div>
    </Card>
  );
}

function MiniCart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6h15l-1.5 9h-12L6 6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6 6 5 3H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
