import { NextResponse, NextRequest } from "next/server";
import Student from "@/models/Student";
import dbConfig from "@/middlewares/db.config";

dbConfig();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id } = body;
  const user = await Student.findById(id).populate("lgTeacher");
  if (!user) {
    return NextResponse.json({ success: false, message: "User not found" });
  } else {
    return NextResponse.json({ success: true, user });
  }
}
