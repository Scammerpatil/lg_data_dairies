import { NextResponse } from "next/server";
import Student from "@/models/Student";
import dbConfig from "@/middlewares/db.config";
import { getCache, setCache } from "@/app/api/cache";

dbConfig();

export async function GET() {
  const cachedStudents = getCache("students");
  if (cachedStudents) {
    console.log("Returning cached students");
    return NextResponse.json({ success: true, students: cachedStudents });
  }
  const students = await Student.find().populate("lgTeacher");
  if (!students) {
    return NextResponse.json({ success: false, message: "User not found" });
  } else {
    setCache("students", students, 1000 * 60 * 60);
    return NextResponse.json({ success: true, students });
  }
}
