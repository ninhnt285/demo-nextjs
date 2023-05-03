import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

const protectedRoutes = ["/blogs/add"]
const authRoutes = ["/auth/login", "auth/register"]

export function middleware(request) {
  const currentUser = request.cookies.get("currentUser")?.value

  if (protectedRoutes.includes(request.nextUrl.pathname) && !currentUser) {
    request.cookies.delete("currentUser");
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("currentUser");
    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}