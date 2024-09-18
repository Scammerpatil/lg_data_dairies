import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/middlewares/db.config";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";

dbConfig();

export async function POST(request: NextRequest) {
  const { student_id, teacher_id } = await request.json();

  try {
    const student = await Student.findById(student_id);
    const teacher = await Teacher.findById(teacher_id);

    if (!student || !teacher) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Remove LG from student and remove student from teacher's list
    student.lgTeacher = null; // Use null instead of undefined
    await student.save(); // Await the save operation

    teacher.studentUnder = teacher.studentUnder.filter(
      (id: String) => id.toString() !== student_id
    );
    await teacher.save(); // Await the save operation

    // Populate the studentUnder field
    const updatedTeacher = await Teacher.findById(teacher_id).populate(
      "studentUnder"
    );

    return NextResponse.json(
      { success: true, teacher: updatedTeacher },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error unassigning LG:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
