import { NextResponse, NextRequest } from "next/server";
import HOD from "@/models/HOD";
import dbConfig from "@/middlewares/db.config";

dbConfig();

export async function GET() {
  const hod = await HOD.find();
  if (!hod) {
    return NextResponse.json({ success: false, message: "User not found" });
  } else {
    return NextResponse.json({ success: true, hod });
  }
}
