import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const isLogin = request.cookies.get("token");
  console.log("middle ware", request.nextUrl.pathname);
  if (!isLogin && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  } else if (
    isLogin &&
    (url.pathname === "/login" || url.pathname === "/register")
  ) {
    return NextResponse.redirect(`${request.nextUrl.origin}/`);
  }
  return NextResponse.next();
}
