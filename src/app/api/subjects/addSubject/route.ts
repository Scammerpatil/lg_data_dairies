import dbConfig from "@/middlewares/db.config";
import AcademicStructure from "@/models/AcademicStructure";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const { department, semester, subjectName, subjectType } = await req.json();

  if (!department || !semester || !subjectName || !subjectType) {
    return NextResponse.json(
      { message: "Invalid data provided" },
      { status: 400 }
    );
  }

  const semesterNumber = parseInt(semester, 10);
  let departmentExists = await AcademicStructure.findOne({
    departmentName: department,
  });
  console.log(departmentExists);

  if (!departmentExists) {
    console.log("Here we go again!!!");
    const newDepartment = new AcademicStructure({
      departmentName: department,
      semesters: [
        {
          semesterNumber: semesterNumber,
          subjects: [
            {
              name: subjectName,
              type: subjectType,
            },
          ],
        },
      ],
    });
    await newDepartment.save();
    console.log(newDepartment);
    return NextResponse.json({ message: "Subject added successfully" });
  } else {
    let semesterExists = departmentExists.semesters.find(
      (sem: any) => sem.semesterNumber === semesterNumber
    );

    if (!semesterExists) {
      departmentExists.semesters.push({
        semesterNumber: semesterNumber,
        subjects: [
          {
            name: subjectName,
            type: subjectType,
          },
        ],
      });
    } else {
      const subjectExists = semesterExists.subjects.find(
        (sub: any) => sub.name === subjectName
      );

      if (subjectExists) {
        return NextResponse.json(
          {
            message: `Subject ${subjectName} already exists in Semester ${semesterNumber}`,
          },
          { status: 409 }
        );
      }
      semesterExists.subjects.push({
        name: subjectName,
        type: subjectType,
      });
    }
    departmentExists.markModified("semesters");
    await departmentExists.save();

    return NextResponse.json({ message: "Subject added successfully" });
  }
}
