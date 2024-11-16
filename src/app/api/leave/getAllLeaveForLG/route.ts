import LeaveModel from "@/models/Leave";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { _id } = await req.json();
    const applications = await LeaveModel.find({ teacherId: _id }).populate(
      "studentId"
    );

    if (applications.length === 0) {
      return NextResponse.json(
        { message: "No leave applications found." },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Leave applications found", applications },
      { status: 200 }
    );
  } catch (error) {
    // Log the error and return an error response
    console.error("Error fetching leave applications:", error);
    return NextResponse.json(
      { message: "Error fetching leave applications.", error },
      { status: 500 }
    );
  }
}
