import LeaveModel from "@/models/Leave";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  const { id, status } = await req.json();
  const leave = await LeaveModel.findByIdAndUpdate(id, { status });
  if (!leave) {
    return NextResponse.json({ message: "Leave not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "Leave updated", leave },
    { status: 200 },
  );
}
