import { NextRequest, NextResponse } from "next/server";
import Teacher from "@/models/Teacher";

export async function POST(req: NextRequest) {
  const { department } = await req.json();
  try {
    const teacher = await Teacher.find({ department }).populate("studentUnder");
    if (!teacher) {
      return NextResponse.json(
        {
          message: "Teacher not found",
          success: false,
        },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        message: "Teachers Found successfully",
        success: true,
        teachers: teacher,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error Fetching Teachers",
        success: false,
      },
      { status: 500 },
    );
  }
}
