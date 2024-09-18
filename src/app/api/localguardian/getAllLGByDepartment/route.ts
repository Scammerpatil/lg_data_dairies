import dbConfig from "@/middlewares/db.config";
import Teacher from "@/models/Teacher";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const { department } = await req.json();
  if (!department) {
    return NextResponse.json(
      { message: "Department is required" },
      { status: 400 }
    );
  }
  try {
    const lg = await Teacher.find({ department }).populate("studentUnder");
    if (!lg) {
      return NextResponse.json({ message: "No LG found" }, { status: 404 });
    }
    return NextResponse.json(lg, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
