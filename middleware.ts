import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Legacy `/products/:id` → `/product/:id` for bookmarks and old links. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = /^\/products\/([^/]+)$/.exec(pathname);
  if (match) {
    const url = request.nextUrl.clone();
    url.pathname = `/product/${match[1]}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

/** Only `/products/[id]` — not `/products` listing. */
export const config = {
  matcher: ["/products/:path+"],
};
