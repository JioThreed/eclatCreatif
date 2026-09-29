import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(
  request: NextRequest
) {
  if (
    request.nextUrl.pathname.startsWith(
      "/admin"
    )
  ) {
    const token =
      await getToken({
        req: request,
      });

    if (!token) {
      return NextResponse.redirect(
        new URL(
          "/",
          request.url
        )
      );
    }
  }

  const response =
    NextResponse.next();

  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval'
    https://challenges.cloudflare.com
    https://accounts.google.com;

    style-src 'self' 'unsafe-inline';

    img-src 'self' data: https:;

    font-src 'self' data:;

    connect-src 'self'
    https://challenges.cloudflare.com
    https://accounts.google.com;

    frame-src
    https://challenges.cloudflare.com
    https://accounts.google.com;
  `
    .replace(/\n/g, " ")
    .trim();

  response.headers.set(
    "Content-Security-Policy",
    csp
  );

  response.headers.set(
    "X-Frame-Options",
    "DENY"
  );

  response.headers.set(
    "X-Content-Type-Options",
    "nosniff"
  );

  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );

  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};