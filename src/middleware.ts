import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {  
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/deal", request.url));
  }
  return NextResponse.next();
}

// Apply middleware only to specific paths
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
