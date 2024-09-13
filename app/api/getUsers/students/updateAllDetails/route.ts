import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/middlewares/db.config";
import Student from "@/models/Student";

dbConfig();

export async function PUT(req: NextRequest, res: NextResponse) {
  const { student, _id } = await req.json();
  const oldStudent = await Student.findByIdAndUpdate(_id, student);
  if (!oldStudent) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "Student updated successfully", student: oldStudent },
    { status: 200 },
  );
}
