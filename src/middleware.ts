import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

export function middleware() {
  return NextResponse.next();
}

// Apply middleware only to specific paths
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
