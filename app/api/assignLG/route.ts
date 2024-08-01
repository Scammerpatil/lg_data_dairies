import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { to, from, _id } = await req.json();

    // Find the teacher
    const teacher = await Teacher.findById(_id);
    if (!teacher) {
      return new NextResponse("Teacher not found", { status: 404 });
    }

    // Validate range
    if (to <= from) {
      return new NextResponse(
        "Invalid range. 'to' should be greater than 'from'.",
        { status: 400 },
      );
    }
    const students = await Student.find({
      _id: { $gte: from, $lte: to },
    });

    if (students.length === 0) {
      return new NextResponse("No students were updated", { status: 400 });
    }
    await Student.updateMany(
      { _id: { $in: students.map((s) => s._id) } },
      { $set: { lgTeacher: teacher._id } },
    );
    if (teacher.studentUnder) {
      teacher.studentUnder = teacher.studentUnder.concat(students);
    } else {
      teacher.studentUnder = students;
    }
    await teacher.save();
    console.log(teacher);
    return new NextResponse("Students successfully assigned to the teacher", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
