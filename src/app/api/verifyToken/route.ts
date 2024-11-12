import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConfig from "@/middlewares/db.config";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import HOD from "@/models/HOD";

dbConfig();

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  }

  if (!process.env.JWT_SECRET) {
    return NextResponse.json(
      { error: "Server configuration error: JWT_SECRET missing" },
      { status: 500 }
    );
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET) as {
      role: string;
      email: string;
      [key: string]: any;
    };

    if (decodedData.role === "admin") {
      return NextResponse.json({
        data: {
          email: process.env.ADMIN_EMAIL,
          role: "admin",
          isAdminApproved: true,
          name: "Admin",
          profileImageUrl: "https://sesrcp.in/Uploads/Logo/1595215490.png",
        },
      });
    } else if (decodedData.role === "lg-coordinator") {
      return NextResponse.json({
        data: {
          email: process.env.LG_CO_ORDINATOR_EMAIL,
          role: "lgCoordinator",
          isAdminApproved: true,
          name: "LG Coordinator",
          profileImageUrl: "https://sesrcp.in/Uploads/Logo/1595215490.png",
          department: "computer",
        },
      });
    } else if (decodedData.role === "examdepartment") {
      return NextResponse.json({
        data: {
          email: process.env.EXAM_DEPARTMENT_EMAIL,
          role: "examDepartment",
          isAdminApproved: true,
          name: "Exam Department",
          profileImageUrl: "https://sesrcp.in/Uploads/Logo/1595215490.png",
        },
      });
    } else {
      if (decodedData.role === "student") {
        const student = await Student.findOne({ email: decodedData.email });
        if (!student) {
          return NextResponse.json(
            { error: "Student not found" },
            { status: 404 }
          );
        }
        return NextResponse.json(student);
      } else if (decodedData.role === "lgTeacher") {
        const teacher = await Teacher.findOne({
          email: decodedData.email,
        }).populate("studentUnder");
        return NextResponse.json(teacher);
      } else {
        const hod = await HOD.findOne({ email: decodedData.email });
        if (!hod) {
          return NextResponse.json({ error: "HOD not found" }, { status: 404 });
        }
        return NextResponse.json(hod);
      }
    }
  } catch (err: any) {
    console.error("Token verification error:", err);
    const errorMessage =
      err.name === "JsonWebTokenError"
        ? "Invalid token"
        : "Token verification failed";
    return NextResponse.json({ error: errorMessage }, { status: 403 });
  }
}
