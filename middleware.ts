import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const verifyToken = async (token: string) => {
  try {
    const response = await fetch("http://localhost:3000/api/verfiytoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const contentType = response.headers.get("content-type");
    if (!response.ok) throw new Error("Token verification failed");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      const text = await response.text();
      throw new Error("Response was not JSON");
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublicPath = [
    "/",
    "/signin",
    "/signup",
    "/about",
    "/contact",
  ].includes(pathname);
  const token = req.cookies.get("token")?.value || "";
  const isLoggedIn = !!token;

  if (isLoggedIn) {
    const user = await verifyToken(token);
    if (user) {
      const { role, isAdminApproved } = user.data;

      if (isPublicPath) {
        let redirectPath = "/";
        switch (role) {
          case "student":
            redirectPath = isAdminApproved
              ? "/student/dashboard"
              : "/not-approved";
            break;
          case "teacher":
            redirectPath = isAdminApproved
              ? "/teacher/dashboard"
              : "/not-approved";
            break;
          case "hod":
            redirectPath = isAdminApproved ? "/hod/dashboard" : "/not-approved";
            break;
          case "admin":
            redirectPath = "/admin/dashboard";
            break;
          default:
            redirectPath = "/";
        }
        return NextResponse.redirect(new URL(redirectPath, req.nextUrl.origin));
      } else {
        if (!isAdminApproved) {
          console.log("User is not approved, redirecting to not-approved");
          return NextResponse.redirect(
            new URL("/not-approved", req.nextUrl.origin),
          );
        }
        console.log("User is approved, allowing access to the requested path");
        return NextResponse.next();
      }
    }
    console.log("User verification failed, redirecting to signin");
    return NextResponse.redirect(new URL("/signin", req.nextUrl.origin));
  }

  if (!isPublicPath && !isLoggedIn) {
    console.log("Not logged in, redirecting to signin");
    return NextResponse.redirect(new URL("/signin", req.nextUrl.origin));
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
    "/not-found",
    "/student/:path*",
    "/teacher/:path*",
    "/hod/:path*",
    "/admin/:path*",
  ],
};
