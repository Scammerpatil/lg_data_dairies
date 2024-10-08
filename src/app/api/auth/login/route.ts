import { NextResponse, NextRequest } from "next/server";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConfig from "@/middlewares/db.config";
import HOD from "@/models/HOD";

dbConfig();

const generateToken = (data: object) => {
  return jwt.sign(data, process.env.JWT_SECRET!, { expiresIn: "1d" });
};

const setTokenCookie = (response: NextResponse, token: string) => {
  response.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      {
        message: "Please fill all the fields",
      },
      { status: 400 }
    );
  }

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const data = {
      email: process.env.ADMIN_EMAIL,
      role: "admin",
      isAdminApproved: true,
      name: "Admin",
      profileImageUrl: "https://sesrcp.in/Uploads/Logo/1595215490.png",
    };
    const token = generateToken(data);
    const response = NextResponse.json({
      route: "/admin/dashboard",
      message: "Login Success",
      success: true,
      user: {
        email: process.env.ADMIN_EMAIL,
        role: "admin",
        isAdminApproved: true,
        name: "Admin",
        profileImageUrl: "https://sesrcp.in/Uploads/Logo/1595215490.png",
      },
    });
    setTokenCookie(response, token);
    return response;
  }
  if (
    email === process.env.LG_CO_ORDINATOR_EMAIL &&
    password === process.env.LG_CO_ORDINATOR_PASSWORD
  ) {
    const data = {
      email: process.env.LG_CO_ORDINATOR_EMAIL,
      role: "lg-coordinator",
      isAdminApproved: true,
      name: "LG Coordinator",
      profileImageUrl: "https://sesrcp.in/Uploads/Logo/1595215490.png",
      department: "computer",
    };
    const token = generateToken(data);
    const response = NextResponse.json({
      route: "/lg-coordinator/dashboard",
      message: "Login Success",
      success: true,
      user: {
        email: process.env.LG_CO_ORDINATOR_EMAIL,
        role: "lgCoordinator",
        isAdminApproved: true,
        name: "LG Coordinator",
        profileImageUrl: "https://sesrcp.in/Uploads/Logo/1595215490.png",
        department: "computer",
      },
    });
    setTokenCookie(response, token);
    return response;
  }

  if (
    email === process.env.EXAM_DEPARTMENT_EMAIL &&
    password === process.env.EXAM_DEPARTMENT_PASSWORD
  ) {
    const data = {
      email: process.env.EXAM_DEPARTMENT_EMAIL,
      role: "examdepartment",
      isAdminApproved: true,
      name: "Exam Department",
      profileImageUrl: "https://sesrcp.in/Uploads/Logo/1595215490.png",
    };
    const token = generateToken(data);
    const response = NextResponse.json({
      route: "/examdepartment/dashboard",
      message: "Login Success",
      success: true,
      user: {
        email: process.env.EXAM_DEPARTMENT_EMAIL,
        role: "examDepartment",
        isAdminApproved: true,
        name: "Exam Department",
        profileImageUrl: "https://sesrcp.in/Uploads/Logo/1595215490.png",
      },
    });
    setTokenCookie(response, token);
    return response;
  }

  const findUserAndValidatePassword = async (
    Model: any,
    role: string,
    route: string
  ) => {
    const user = await Model.findOne({ email });
    if (user) {
      const isMatch = await bcryptjs.compare(password, user.password);
      if (role === "student") {
        await user.populate("lgTeacher");
      } else if (role === "teacher") {
        await user.populate("studentUnder");
      } else if (role === "hod") {
      }
      if (isMatch) {
        const data = {
          id: user._id,
          role,
          email: user.email,
          name: user.name,
          isAdminApproved: user.isAdminApproved,
        };
        const token = generateToken(data);
        const response = NextResponse.json({
          message: "Login Success",
          success: true,
          route,
          user,
        });
        setTokenCookie(response, token);
        return response;
      }
    }
    return null;
  };

  let response;

  response = await findUserAndValidatePassword(
    Student,
    "student",
    "/student/dashboard"
  );
  if (response) return response;

  response = await findUserAndValidatePassword(
    Teacher,
    "teacher",
    "/teacher/dashboard"
  );
  if (response) return response;

  response = await findUserAndValidatePassword(HOD, "hod", "/hod/dashboard");
  if (response) return response;

  return NextResponse.json(
    {
      message: "Invalid Credentials",
      error: "Invalid Credentials",
    },
    { status: 400 }
  );
}
