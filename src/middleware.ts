import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.AUTH_SECRET!,
    salt:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });

  if (!session) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  const isProtectedRoute = req.nextUrl.pathname.startsWith("/admin");

  if (isProtectedRoute && session.email !== "test@example.com") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|!admin).*)",
};
