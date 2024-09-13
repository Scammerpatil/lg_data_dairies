import LeaveModel from "@/models/Leave";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const leave = new LeaveModel({
      studentId: body.studentId,
      teacherId: body.teacherId,
      leaveType: body.leaveType,
      startDate: body.startDate,
      endDate: body.endDate,
      reason: body.reason,
    });
    const newLeave = await leave.save();
    if (newLeave) {
      return NextResponse.json(
        {
          success: true,
          message: "Leave applied successfully",
        },
        { status: 201 },
      );
    }
  } catch (error) {
    console.error("Error applying for leave:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error applying for leave. Please try again.",
      },
      { status: 500 },
    );
  }
}
