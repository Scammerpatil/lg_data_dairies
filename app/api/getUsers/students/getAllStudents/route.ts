import { NextResponse, NextRequest } from "next/server";
import Student from "@/models/Student";
import dbConfig from "@/middlewares/db.config";

dbConfig();

export async function GET() {
  const students = await Student.find().populate("lgTeacher");
  if (!students) {
    return NextResponse.json({ success: false, message: "User not found" });
  } else {
    return NextResponse.json({ success: true, students });
  }
}
