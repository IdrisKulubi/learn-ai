import { auth } from "@/app/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  
  // Check if the user is authenticated for protected routes
  const isAuthRoute = request.nextUrl.pathname.startsWith("/dashboard") ||
                      request.nextUrl.pathname.startsWith("/profile");
  
  if (isAuthRoute && !session) {
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  
  // Redirect authenticated users away from auth pages
  const isLoginPage = request.nextUrl.pathname.startsWith("/auth/signin") ||
                      request.nextUrl.pathname.startsWith("/auth/signup");
  
  if (isLoginPage && session) {
    // Redirect to dashboard if already authenticated
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/auth/signin",
    "/auth/signup",
  ],
}; 