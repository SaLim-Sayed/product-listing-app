"use client";

import type { Product } from "@/features/products/types";
import { formatCategoryLabel } from "@/features/products/utils";
import { safeImageSrc } from "@/lib/image-url";
import { productDetailPath } from "@/lib/nav/product-path";
import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { memo, useMemo } from "react";
import { BiCartAdd } from "react-icons/bi";

function snippet(text: string, max = 72) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).trim()}…`;
}

export type ProductCardProps = {
  product: Product;
  onAddIntent: (product: Product) => void;
};

export const ProductCard = memo(function ProductCard({
  product,
  onAddIntent,
}: ProductCardProps) {
  const src = useMemo(() => safeImageSrc(product.image), [product.image]);
  const catLabel = useMemo(
    () => formatCategoryLabel(product.category),
    [product.category],
  );
  const descriptionSnippet = useMemo(
    () => snippet(product.description),
    [product.description],
  );

  return (
    <Card className="group overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative">
        <Link href={productDetailPath(product.id)} className="block">
          <div className="flex aspect-square items-center justify-center bg-zinc-50 p-6">
            <Image
              src={src}
              alt={product.title}
              width={280}
              height={280}
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 280px"
              unoptimized
            />
          </div>
          <div className="space-y-2 p-4 pt-3">
            <h3 className="line-clamp-1 text-[15px] font-bold leading-snug text-zinc-900">
              {product.title}
            </h3>
            <p className="line-clamp-2 min-h-10 text-xs leading-relaxed text-zinc-500">
              {descriptionSnippet}
            </p>
            <div className="flex items-end justify-between gap-2 pt-1">
              <span className="text-marketly-price text-lg font-bold tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              <div className="max-w-[48%] text-right">
                <span className="block text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                  Category
                </span>
                <span className="line-clamp-1 text-xs font-medium capitalize text-zinc-600">
                  {catLabel}
                </span>
              </div>
            </div>
          </div>
        </Link>
        <Button
          isIconOnly
          aria-label={`Add ${product.title} to cart`}
          className="absolute right-3 top-3 z-10 size-10 min-w-10 rounded-full border-0 bg-zinc-900 text-white shadow-md hover:bg-zinc-800"
          onPress={() => onAddIntent(product)}
        >
          <BiCartAdd size={18} />
        </Button>
      </div>
    </Card>
  );
});

ProductCard.displayName = "ProductCard";
