import dbConfig from "@/middlewares/db.config";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function GET(req: NextRequest) {
  const response = NextResponse.json({
    message: "Logged out successfully",
    success: true,
  });
  response.cookies.set("token", "", { maxAge: -1 });
  return response;
}
