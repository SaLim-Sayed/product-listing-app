"use client";

import { Badge, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { safeImageSrc } from "@/lib/image-url";
import type { Product } from "@/lib/types/product";

function dealFromPrice(price: number) {
  const list = Math.round(price * 1.38 * 100) / 100;
  const off = Math.max(5, Math.min(80, Math.round((1 - price / list) * 100)));
  const save = Math.round((list - price) * 100) / 100;
  return { list, off, save };
}

export function ProductDealCard({ product }: { product: Product }) {
  const { list, off, save } = dealFromPrice(product.price);
  const src = safeImageSrc(product.image);

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative w-[160px] shrink-0 md:w-[180px]"
    >
      <Card className="relative flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 shadow-sm transition group-hover:border-mm-primary/40 group-hover:shadow-md">
        <Badge
          color="accent"
          size="sm"
          variant="primary"
          className="absolute top-2 right-2 z-10 font-bold"
        >
          {off}% OFF
        </Badge>
        <div className="flex h-36 items-center justify-center bg-mm-surface p-3">
          <Image
            src={src}
            alt={product.title}
            width={120}
            height={120}
            className="max-h-full max-w-full object-contain"
            sizes="120px"
            unoptimized
          />
        </div>
        <div className="flex flex-1 flex-col gap-1 p-3">
          <p className="line-clamp-2 min-h-10 text-xs font-medium leading-snug text-zinc-900">
            {product.title}
          </p>
          <div className="mt-auto flex flex-wrap items-baseline gap-1.5">
            <span className="text-sm font-bold text-zinc-900">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-zinc-400 line-through">
              ${list.toFixed(2)}
            </span>
          </div>
          <p className="text-[11px] font-semibold text-emerald-600">
            Save — ${save.toFixed(2)}
          </p>
        </div>
      </Card>
    </Link>
  );
}
