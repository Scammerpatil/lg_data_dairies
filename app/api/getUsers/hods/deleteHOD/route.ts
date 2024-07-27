import { NextRequest, NextResponse } from "next/server";
import HOD from "@/models/HOD";

export async function DELETE(req: NextRequest) {
  const { _id } = await req.json();
  try {
    const hod = await HOD.findByIdAndDelete(_id);
    if (!hod) {
      return NextResponse.json({
        message: "HOD not found",
        success: false,
      });
    }
    return NextResponse.json({
      message: "HOD deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting HOD",
      success: false,
    });
  }
}
