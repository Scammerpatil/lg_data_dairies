import dbConfig from "@/middlewares/db.config";
import Teacher from "@/models/Teacher";
import Student from "@/models/Student";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

dbConfig();
export async function POST(req: NextRequest) {
  try {
    const { to, from, _id } = await req.json();

    // Find the teacher
    const teacher = await Teacher.findById(_id);
    if (!teacher) {
      return new NextResponse("Teacher not found", { status: 404 });
    }

    // Validate range
    if (to < from) {
      return new NextResponse(
        "Invalid range. 'to' should be greater than 'from'.",
        { status: 400 }
      );
    }

    // Fetch existing students in the range
    const students = await Student.find({
      _id: { $gte: from, $lte: to },
    });

    // Identify missing students
    const studentIds = students.map((student) => student._id.toString());
    const allIdsInRange = Array.from({ length: to - from + 1 }, (_, i) =>
      (from + i).toString()
    );
    const missingIds = allIdsInRange.filter((id) => !studentIds.includes(id));

    if (students.length === 0) {
      return new NextResponse("No students were updated", { status: 400 });
    }

    if (missingIds.length > 0) {
      console.warn(`Missing students in range: ${missingIds.join(", ")}`);
    }

    // Update students
    await Student.updateMany(
      { _id: { $in: students.map((s) => s._id) } },
      { $set: { lgTeacher: teacher._id } }
    );

    // Update teacher's list of students
    if (teacher.studentUnder) {
      teacher.studentUnder = teacher.studentUnder.concat(students);
    } else {
      teacher.studentUnder = students;
    }
    await teacher.save();

    return new NextResponse("Students successfully assigned to the teacher", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
