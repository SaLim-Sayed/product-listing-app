"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { isApiError } from "@/lib/api/errors";
import { safeImageSrc } from "@/lib/image-url";
import { useProduct } from "@/lib/query/hooks/use-product";

const HERO = 400;

export function ProductDetail({ id }: { id: string }) {
  const { data, isPending, isError, error, refetch } = useProduct(id);
  const [imageFailed, setImageFailed] = useState(false);

  if (isPending) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Loading product…
      </p>
    );
  }

  if (isError) {
    const status = isApiError(error) ? error.status : undefined;
    const is404 = status === 404;

    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100">
        <p className="font-medium">
          {is404 ? "Product not found" : "Could not load product"}
        </p>
        <p className="mt-2 text-sm opacity-90">{error.message}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-md bg-red-800 px-4 py-2 text-sm text-white hover:bg-red-900"
          >
            Retry
          </button>
          <Link
            href="/"
            className="rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-50 dark:border-red-800 dark:bg-zinc-900 dark:text-red-100 dark:hover:bg-zinc-800"
          >
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const p = data;
  const src = safeImageSrc(p.image);

  return (
    <article className="space-y-8">
      <Link
        href="/"
        className="inline-flex text-sm font-medium text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← All products
      </Link>

      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-start">
        <div className="flex justify-center md:justify-start">
          <div className="relative flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            {imageFailed ? (
              <span className="text-sm text-zinc-500">Image unavailable</span>
            ) : (
              <Image
                src={src}
                alt={p.title}
                width={HERO}
                height={HERO}
                sizes="(max-width: 768px) 100vw, 400px"
                className="max-h-full max-w-full object-contain"
                unoptimized
                priority
                onError={() => setImageFailed(true)}
              />
            )}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {p.category}
          </p>
          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 md:text-3xl">
            {p.title}
          </h1>
          <p className="text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
            ${p.price.toFixed(2)}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            <span className="font-medium text-amber-600 dark:text-amber-400">
              ★ {p.rating.rate.toFixed(1)}
            </span>
            <span className="mx-1.5 text-zinc-400">·</span>
            {p.rating.count} reviews
          </p>
          <div className="border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Description
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {p.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
