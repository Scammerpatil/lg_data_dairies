import LeaveModel from "@/models/Leave";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { leaveId } = await req.json();
  console.log(leaveId);
  await LeaveModel.deleteOne({ _id: leaveId });
  return NextResponse.json({ message: "Leave deleted successfully." });
}
