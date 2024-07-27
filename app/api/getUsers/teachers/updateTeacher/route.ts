import { NextRequest, NextResponse } from "next/server";
import Teacher from "@/models/Teacher";
import dbConfig from "@/middlewares/db.config";

dbConfig();

export async function PUT(req: NextRequest) {
  const { _id, isApproved } = await req.json();
  try {
    const teacher = await Teacher.findById(_id);
    if (!teacher) {
      return NextResponse.json({
        message: "Teacher not found",
        success: false,
      });
    }
    teacher.isAdminApproved = isApproved;
    const updatedTeacher = await teacher.save();
    if (updatedTeacher) {
      return NextResponse.json({
        message: "Teacher updated successfully",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Error updating teacher",
        success: false,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Error updating teacher",
      success: false,
    });
  }
}
