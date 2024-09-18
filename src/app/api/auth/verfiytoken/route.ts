import dbConfig from "@/middlewares/db.config";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  if (!token) {
    return NextResponse.json({ error: "No token found" });
  }
  try {
    var data = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ data, status: 200 });
  } catch (err) {
    NextResponse.json({ err });
  }
}
