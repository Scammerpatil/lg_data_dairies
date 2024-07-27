import { NextRequest, NextResponse } from "next/server";
import approvalEmail from "@/middlewares/approvalEmail";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;
  const response = await approvalEmail(email);
  if (response) {
    return NextResponse.json({ email }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Email not found" }, { status: 404 });
  }
}
