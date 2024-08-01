import Teacher from "@/models/Teacher";
import { NextResponse } from "next/server";
import dbConfig from "@/middlewares/db.config";

dbConfig();

export async function GET() {
  const teachers = await Teacher.find().populate("studentUnder");
  if (!teachers) {
    return NextResponse.json({ success: false, message: "User not found" });
  } else {
    return NextResponse.json({ success: true, teachers });
  }
}
