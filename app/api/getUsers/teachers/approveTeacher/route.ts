import Teacher from "@/models/Teacher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, isLG } = await req.json();
  console.log(id, isLG);
  const teacher = await Teacher.findById(id);
  if (!teacher) {
    return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
  }
  teacher.isLG = isLG;
  const updatedTeacher = await teacher.save();
  if (updatedTeacher) {
    return NextResponse.json({ message: "LG approved" }, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "Failed to approve LG" },
      { status: 500 },
    );
  }
}
