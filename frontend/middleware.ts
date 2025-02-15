import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  const isAuth = !!session;
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/";
  const isDashboardPage = pathname.startsWith("/dashboard");

  // Redirect authenticated users away from auth pages
  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
  }

  // Redirect unauthenticated users away from protected pages
  if (!isAuth && isDashboardPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 