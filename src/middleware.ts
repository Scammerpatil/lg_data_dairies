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

    const contentType = response.headers.get("content-type");
    if (!response.ok)
      console.log("Error verifying token:", response.statusText);

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

    // Check if the cached data is still valid (not expired)
    const now = Date.now();
    if (now < cachedData.expiry) {
      const { role, isAdminApproved } = cachedData.data;

      if (!isRoleAuthorized(role, pathname)) {
        const path = role + "/dashboard";
        return NextResponse.redirect(new URL(path, req.nextUrl.origin));
      }

      if (isPublicPath) {
        return handleRedirect(role, isAdminApproved, req);
      } else {
        if (!isAdminApproved) {
          return NextResponse.redirect(
            new URL("/not-approved", req.nextUrl.origin)
          );
        }
        return NextResponse.next();
      }
    }
  }

  // If no session, verify the token
  if (token) {
    const user = await verifyToken(token);
    if (user) {
      const { role, isAdminApproved, expiresIn } = user.data;

      // Cache the user data with an expiry time (based on token expiration)
      const expiryTime = Date.now() + expiresIn * 1000; // expiresIn is in seconds
      tokenCache[token] = {
        data: { role, isAdminApproved },
        expiry: expiryTime,
      };

      if (!isRoleAuthorized(role, pathname)) {
        var path = role + "/dashboard";
        return NextResponse.redirect(new URL(path, req.nextUrl.origin));
      }

      if (isPublicPath) {
        return handleRedirect(role, isAdminApproved, req);
      } else {
        if (!isAdminApproved) {
          return NextResponse.redirect(
            new URL("/not-approved", req.nextUrl.origin)
          );
        }
        return NextResponse.next();
      }
    }

    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  // Redirect to home if not logged in and accessing a protected page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next();
}

// Helper function to handle redirection based on role
function handleRedirect(
  role: string,
  isAdminApproved: boolean,
  req: NextRequest
) {
  let redirectPath = "/";
  switch (role) {
    case "student":
      redirectPath = isAdminApproved ? "/student/dashboard" : "/not-approved";
      break;
    case "teacher":
      redirectPath = isAdminApproved ? "/teacher/dashboard" : "/not-approved";
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
}

// Function to check if the role matches the requested path
function isRoleAuthorized(role: string, pathname: string) {
  const roleBasedPaths: { [key: string]: RegExp } = {
    student: /^\/student/,
    teacher: /^\/teacher/,
    hod: /^\/hod/,
    admin: /^\/admin/,
    "lg-coordinator": /^\/lg-coordinator/,
  };

  const rolePathRegex = roleBasedPaths[role];
  return rolePathRegex ? rolePathRegex.test(pathname) : false;
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
    "/lg-coordinator/:path*",
  ],
};
