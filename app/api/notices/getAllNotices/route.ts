import Notice from "@/models/Notice";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const notices = await Notice.find();
  if (!notices) {
    return NextResponse.json({ message: "No notices found" }, { status: 404 });
  } else {
    return NextResponse.json({ notices }, { status: 200 });
  }
}
