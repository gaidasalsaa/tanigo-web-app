import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { Role } from "@prisma/client"

// Define protected routes
const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/cart",
  "/orders",
  "/seller",
  "/admin"
]

const sellerRoutes = [
  "/seller"
]

const adminRoutes = [
  "/admin"
]

const authRoutes = [
  "/auth/signin",
  "/auth/register"
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = await auth()

  // Redirect authenticated users away from auth pages
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (isProtectedRoute && !session) {
    const signInUrl = new URL("/signin", request.url)
    signInUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Check seller routes
  const isSellerRoute = sellerRoutes.some(route => pathname.startsWith(route))
  if (isSellerRoute && session) {
    // This would require a database call, so we'll handle it in the page component
    // For now, just let it pass through
    return NextResponse.next()
  }

  // Check admin routes
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
  if (isAdminRoute && session) {
    // This would require a database call, so we'll handle it in the page component
    // For now, just let it pass through
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}