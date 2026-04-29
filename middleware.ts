import { NextRequest, NextResponse } from "next/server";

const protectedPrefixes = ["/owner", "/worker", "/admin"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (!protectedPrefixes.some((prefix) => path.startsWith(prefix))) return NextResponse.next();

  const token = request.cookies.get("kaamsetu_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/owner/:path*", "/worker/:path*", "/admin/:path*"]
};
