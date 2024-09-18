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

  // Convert semester to a number if it comes as a string
  const semesterNumber = parseInt(semester, 10);

  // Find the department
  let departmentExists = await AcademicStructure.findOne({
    departmentName: department,
  });

  if (!departmentExists) {
    // Create new department if it doesn't exist
    const newDepartment = new AcademicStructure({
      departmentName: department,
      semesters: [
        {
          semesterNumber: semesterNumber, // Store as a number
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
    return NextResponse.json({ message: "Subject added successfully" });
  } else {
    // Find the semester in the existing department
    let semesterExists = departmentExists.semesters.find(
      (sem: any) => sem.semesterNumber === semesterNumber // Compare with the correct type
    );

    if (!semesterExists) {
      // If semester doesn't exist, add it
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
      // Check if the subject already exists in the semester
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

      // Add the new subject to the existing semester
      semesterExists.subjects.push({
        name: subjectName,
        type: subjectType,
      });
    }

    // Mark the modified path so Mongoose knows to update the document
    departmentExists.markModified("semesters");
    await departmentExists.save();

    return NextResponse.json({ message: "Subject added successfully" });
  }
}
