import { NextRequest, NextResponse } from "next/server";
import HOD from "@/models/HOD";
import dbConfig from "@/middlewares/db.config";

dbConfig();

export async function PUT(req: NextRequest) {
  const { _id, isApproved } = await req.json();
  try {
    const hod = await HOD.findById(_id);
    if (!hod) {
      return NextResponse.json({
        message: "HOD not found",
        success: false,
      });
    }
    hod.isAdminApproved = isApproved;
    const updatedHod = await hod.save();
    if (updatedHod) {
      return NextResponse.json({
        message: "HOD updated successfully",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Error updating HOD",
        success: false,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Error updating HOD",
      success: false,
    });
  }
}
