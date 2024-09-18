import { NextRequest, NextResponse } from "next/server";
import Teacher from "@/models/Teacher";
import dbConfig from "@/middlewares/db.config";

dbConfig();

export async function DELETE(req: NextRequest) {
  const { _id } = await req.json();
  try {
    const teacher = await Teacher.findByIdAndDelete(_id);
    if (!teacher) {
      return NextResponse.json({
        message: "Teacher not found",
        success: false,
      });
    }
    return NextResponse.json({
      message: "Teacher deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting Teacher",
      success: false,
    });
  }
}
