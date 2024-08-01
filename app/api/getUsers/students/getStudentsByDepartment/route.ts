import { NextResponse, NextRequest } from "next/server";
import Student from "@/models/Student";
import dbConfig from "@/middlewares/db.config";

dbConfig();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { department } = body;
  const students = await Student.find({ department }).populate("lgTeacher");
  if (!students) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 },
    );
  } else {
    return NextResponse.json({ success: true, students }, { status: 200 });
  }
}
