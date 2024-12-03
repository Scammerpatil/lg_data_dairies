import LeaveModel from "@/models/Leave";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { studentId } = await req.json();
    if (!studentId) {
      return NextResponse.json(
        {
          success: false,
          message: "Student ID is required.",
        },
        { status: 400 }
      );
    }
    const leave = await LeaveModel.find({ studentId: studentId });

    if (leave.length > 0) {
      return NextResponse.json(leave, { status: 200 });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "No leave data found for this student.",
        },
        { status: 402 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching leave data. Please try again.",
      },
      { status: 500 }
    );
  }
}
