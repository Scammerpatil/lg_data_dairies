import Teacher from "@/models/Teacher";
import { NextResponse } from "next/server";
import dbConfig from "@/middlewares/db.config";
import { getCache, setCache } from "@/app/api/cache";

dbConfig();

export async function GET() {
  const cachedTeachers = getCache("teachers");
  if (cachedTeachers) {
    console.log("Returning cached teachers");
    return NextResponse.json({ success: true, teachers: cachedTeachers });
  }
  const teachers = await Teacher.find().populate("studentUnder");
  if (!teachers) {
    return NextResponse.json({ success: false, message: "User not found" });
  } else {
    setCache("teachers", teachers, 1000 * 60 * 60);
    return NextResponse.json({ success: true, teachers });
  }
}
