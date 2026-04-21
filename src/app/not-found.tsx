"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { BiHomeAlt, BiShoppingBag } from "react-icons/bi";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-4 py-20 text-center">
      <div className="mb-8 flex size-24 items-center justify-center rounded-full bg-zinc-100 text-5xl font-black text-zinc-300 shadow-inner">
        404
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-lg text-zinc-500">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
        moved or deleted.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/shop">
          <Button
            variant="primary"
            className="bg-violet-600 font-semibold text-white shadow-lg hover:bg-violet-700"
          >
            <BiShoppingBag className="mr-2 size-5" />
            Continue Shopping
          </Button>
        </Link>
        <Link href="/">
          <Button
            variant="secondary"
            className="bg-white font-semibold text-zinc-900 border border-zinc-200 shadow-sm"
          >
            <BiHomeAlt className="mr-2 size-5" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
