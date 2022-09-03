import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const userJWT = request.cookies.get("userToken");
  console.log(request)

  if (userJWT === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(
      userJWT,
      new TextEncoder().encode("secret")
    );
    console.log(payload);
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/", "/admin/:path*"],
};
