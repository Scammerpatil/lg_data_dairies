import dbConfig from "@/middlewares/db.config";
import AcademicStructure from "@/models/AcademicStructure";
import { NextResponse } from "next/server";

dbConfig();

export async function GET() {
  const something = await AcademicStructure.find().populate(
    "semesters.subjects"
  );
  if (!something) {
    return NextResponse.json({ message: "No data found" }, { status: 404 });
  }
  return NextResponse.json(something, { status: 200 });
}
