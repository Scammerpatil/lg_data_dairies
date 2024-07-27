import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublicPath =
    pathname === "/" || pathname === "/signin" || pathname === "/signup";
  const token = req.cookies.get("token")?.value || "";

  const isLoggedIn = !!token;

  if (isPublicPath && isLoggedIn) {
    try {
      const verifyUrl = process.env.DOMAIN + "/api/verfiytoken";
      const response = await fetch(verifyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const user = await response.json();
      if (response.ok) {
        let redirectPath = "/";
        if (user) {
          if (user.data.role === "student") {
            if (user.data.isAdminApproved) {
              redirectPath = "/student/dashboard";
            } else {
              redirectPath = "/not-approved";
            }
          } else if (user.data.role === "teacher") {
            if (user.data.isAdminApproved) {
              redirectPath = "/teacher/dashboard";
            } else {
              redirectPath = "/not-approved";
            }
          } else if (user.data.role === "hod") {
            if (user.data.isAdminApproved) {
              redirectPath = "/hod/dashboard";
            } else {
              redirectPath = "/not-approved";
            }
          } else if (user.data.role === "admin") {
            redirectPath = "/admin/dashboard";
          }
        }
        return NextResponse.redirect(new URL(redirectPath, req.nextUrl.origin));
      } else {
        console.log("Token verification failed or server error");
        return NextResponse.redirect(new URL("/signin", req.nextUrl.origin));
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      return NextResponse.redirect(new URL("/signin", req.nextUrl.origin));
    }
  }

  if (!isPublicPath && !isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl.origin));
  }

  if (isPublicPath && !isLoggedIn) {
    return NextResponse.next();
  }

  if (!isPublicPath && isLoggedIn) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/contact",
    "/about",
    "/student/:path*",
    "/teacher/:path*",
    "/hod/:path*",
  ],
};
