import { NextRequest, NextResponse } from "next/server";
import Student from "@/models/Student";
import dbConfig from "@/middlewares/db.config";

dbConfig();

export async function PUT(req: NextRequest) {
  const { _id, isApproved } = await req.json();
  try {
    const student = await Student.findById(_id);
    if (!student) {
      return NextResponse.json(
        {
          message: "Student not found",
          success: false,
        },
        { status: 404 },
      );
    }

    student.isApproved = isApproved;
    const updatedStudent = await student.save();

    if (updatedStudent) {
      return NextResponse.json(
        {
          message: "Student updated successfully",
          success: true,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: "Error updating Student",
          success: false,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      {
        message: "Error updating Student",
        success: false,
      },
      { status: 500 },
    );
  }
}
