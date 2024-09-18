import { NextResponse, NextRequest } from "next/server";
import Student from "@/models/Student";
import dbConfig from "@/middlewares/db.config";

dbConfig();

export async function POST(req: NextRequest) {
  const { department } = await req.json();
  if (!department) {
    return NextResponse.json(
      { success: false, message: "Department is required" },
      { status: 400 }
    );
  }
  const students = await Student.find({ department }).populate("lgTeacher");
  if (!students) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  } else {
    return NextResponse.json({ students }, { status: 200 });
  }
}
