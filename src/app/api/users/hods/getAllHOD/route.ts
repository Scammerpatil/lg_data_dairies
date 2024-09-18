import { NextResponse, NextRequest } from "next/server";
import HOD from "@/models/HOD";
import dbConfig from "@/middlewares/db.config";
import { getCache, setCache } from "@/app/api/cache";

dbConfig();

export async function GET() {
  const cachedHOD = getCache("hod");
  if (cachedHOD) {
    return NextResponse.json({ success: true, hod: cachedHOD });
  }
  const hod = await HOD.find();
  if (!hod) {
    return NextResponse.json({ success: false, message: "User not found" });
  } else {
    setCache("hod", hod, 1000 * 60 * 60);
    return NextResponse.json({ success: true, hod });
  }
}
