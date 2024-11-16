import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// In-memory cache for storing user data based on token
const tokenCache: { [token: string]: { data: any; expiry: number } } = {};

// Function to verify token using API
const verifyToken = async (token: string) => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/verfiytoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      console.log("Error verifying token:", response.statusText);
      return null;
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error("Response was not JSON");
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};

// Middleware function
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

  // Check cache for token
  if (tokenCache[token]) {
    const cachedData = tokenCache[token];
    if (Date.now() < cachedData.expiry) {
      const { role, isAdminApproved } = cachedData.data;

      if (isPublicPath) {
        return handleRedirect(role, isAdminApproved, req);
      }

      if (!isRoleAuthorized(role, pathname)) {
        return NextResponse.redirect(
          new URL(`/${role}/dashboard`, req.nextUrl.origin)
        );
      }

      if (!isAdminApproved) {
        return NextResponse.redirect(
          new URL("/not-approved", req.nextUrl.origin)
        );
      }

      return NextResponse.next();
    }
  }

  if (token) {
    const user = await verifyToken(token);
    if (user) {
      const { role, isAdminApproved, expiresIn } = user.data;
      const expiryTime = Date.now() + expiresIn * 1000;
      tokenCache[token] = {
        data: { role, isAdminApproved },
        expiry: expiryTime,
      };

      if (isPublicPath) {
        return handleRedirect(role, isAdminApproved, req);
      }

      if (!isRoleAuthorized(role, pathname)) {
        return NextResponse.redirect(
          new URL(`/${role}/dashboard`, req.nextUrl.origin)
        );
      }

      if (!isAdminApproved) {
        return NextResponse.redirect(
          new URL("/not-approved", req.nextUrl.origin)
        );
      }

      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next();
}

function handleRedirect(
  role: string,
  isAdminApproved: boolean,
  req: NextRequest
) {
  const paths = {
    student: "/student/dashboard",
    teacher: "/teacher/dashboard",
    hod: "/hod/dashboard",
    admin: "/admin/dashboard",
    "lg-coordinator": "/lg-coordinator/dashboard",
  };

  const redirectPath = isAdminApproved ? paths[role] || "/" : "/not-approved";
  return NextResponse.redirect(new URL(redirectPath, req.nextUrl.origin));
}

function isRoleAuthorized(role: string, pathname: string) {
  const roleBasedPaths: { [key: string]: RegExp } = {
    student: /^\/student/,
    teacher: /^\/teacher/,
    hod: /^\/hod/,
    admin: /^\/admin/,
    "lg-coordinator": /^\/lg-coordinator/,
  };

  return roleBasedPaths[role]?.test(pathname) || false;
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/contact",
    "/about",
    "/not-found",
    // "/not-approved",
    "/student/:path*",
    "/teacher/:path*",
    "/hod/:path*",
    "/admin/:path*",
    "/lg-coordinator/:path*",
  ],
};
