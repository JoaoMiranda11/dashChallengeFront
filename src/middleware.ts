import { NextRequest, NextResponse } from "next/server";
import { authCookieName, verifyJwtToken } from "./utils/jwt";

const AUTH_PAGES = ["/login", "/register"];

const isAuthPages = (url: string) => AUTH_PAGES.some((page) => page.startsWith(url));

export async function middleware(req: NextRequest) {
  const { url, nextUrl, cookies } = req;
  const { value: token } = cookies.get(authCookieName) ?? { value: null };

  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  if (nextUrl.pathname == "/") {
    if (hasVerifiedToken) {
      const response = NextResponse.redirect(new URL(`/home`, url));
      return response;
    } 
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    const response = NextResponse.redirect(
      new URL(`/login?${searchParams}`, url)
    );
    response.cookies.delete("token");

    return response;
  }

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      response.cookies.delete(authCookieName);
      return response;
    }

    const response = NextResponse.redirect(new URL(`/home`, url));
    return response;
  }

  if (!hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);

    const response = NextResponse.redirect(
      new URL(`/login?${searchParams}`, url)
    );
    response.cookies.delete("token");

    return response;
  }

  return NextResponse.next();
}

export const config = { matcher: ['/home', '/login'] };
