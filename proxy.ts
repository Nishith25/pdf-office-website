import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  ADMIN_SESSION_COOKIE,
} from "./lib/auth/constants";

export function proxy(
  request: NextRequest,
) {
  const pathname =
    request.nextUrl.pathname;

  const isAdminRoute =
    pathname ===
      "/admin" ||
    pathname.startsWith(
      "/admin/",
    );

  const isLoginRoute =
    pathname ===
    "/admin/login";

  if (
    !isAdminRoute ||
    isLoginRoute
  ) {
    return NextResponse.next();
  }

  const sessionCookie =
    request.cookies.get(
      ADMIN_SESSION_COOKIE,
    )?.value;

  if (
    !sessionCookie
  ) {
    const loginUrl =
      new URL(
        "/admin/login",
        request.url,
      );

    return NextResponse.redirect(
      loginUrl,
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};