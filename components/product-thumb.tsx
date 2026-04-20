"use client";

import Image from "next/image";
import { useState } from "react";
import { safeImageSrc } from "@/lib/image-url";

const THUMB = 56;

export function ProductThumb({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  const resolved = safeImageSrc(src);

  if (failed) {
    return (
      <div
        className="flex size-14 shrink-0 items-center justify-center rounded-md bg-zinc-200 text-[10px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
        aria-hidden
      >
        Image
      </div>
    );
  }

  return (
    <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900">
      <Image
        src={resolved}
        alt={alt}
        width={THUMB}
        height={THUMB}
        sizes={`${THUMB}px`}
        className="max-h-full max-w-full object-contain p-0.5"
        unoptimized
        onError={() => setFailed(true)}
      />
    </div>
  );
}
