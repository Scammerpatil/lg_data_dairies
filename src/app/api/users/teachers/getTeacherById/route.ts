import { NextRequest, NextResponse } from "next/server";
import Teacher from "@/models/Teacher";
import dbConfig from "@/middlewares/db.config";

dbConfig();

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  try {
    const teacher = await Teacher.findById(id).populate("studentUnder");
    console.log(teacher);
    if (!teacher) {
      return NextResponse.json({
        message: "Teacher not found",
        success: false,
      });
    }
    if (teacher) {
      return NextResponse.json(
        {
          message: "Teacher Found",
          success: true,
          teacher: teacher,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: "Error finding teacher",
          success: false,
        },
        { status: 404 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: `Something went wrong ${error}`,
        success: false,
      },
      { status: 500 },
    );
  }
}
