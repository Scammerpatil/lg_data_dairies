import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import dbConfig from "@/middlewares/db.config";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import HOD from "@/models/HOD";

dbConfig();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, department, role, password, isVerified, prn } = body;

    if (!name || !email || !department || !role || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all the fields",
        },
        { status: 400 },
      );
    }
    // Checking if the user already exists
    const studentExists = await Student.findOne({ email });
    const teacherExists = await Teacher.findOne({ email });
    const hODExists = await HOD.findOne({ email });
    if (studentExists || teacherExists || hODExists) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 },
      );
    }

    // Hashing the password
    const hashedPassword = await bcryptjs.hash(password, 12);

    // Checking if the user is a teacher
    if (role === "teacher") {
      const teacher = new Teacher({
        name,
        email,
        department,
        role: "teacher",
        password: hashedPassword,
        isVerified,
      });
      const newTeacher = await teacher.save();
      if (newTeacher) {
        return NextResponse.json(
          {
            success: true,
            message: "User created successfully",
          },
          { status: 201 },
        );
      }
    }

    // Checking if the user is a student
    if (role === "student") {
      const student = new Student({
        name,
        email,
        department,
        role: "student",
        password: hashedPassword,
        isVerified,
        prn,
      });
      const newStudent = await student.save();
      if (newStudent) {
        return NextResponse.json(
          {
            success: true,
            message: "User created successfully",
          },
          { status: 201 },
        );
      }
    }

    if (role === "hod") {
      const hod = new HOD({
        name,
        email,
        department,
        role: "hod",
        password: hashedPassword,
        isVerified,
      });
      const newHOD = await hod.save();
      if (newHOD) {
        return NextResponse.json(
          {
            success: true,
            message: "User created successfully",
          },
          { status: 201 },
        );
      }
    }
    // If role is invalid or user creation failed
    return NextResponse.json(
      {
        success: false,
        message: "Invalid user role or user creation failed",
      },
      { status: 400 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
