"use client";
import { useState } from "react";
import { Student } from "@/types/student";
import axios from "axios";
import { ArrowDown, ArrowUp } from "lucide-react";

let StudentPromise: Promise<Student[]> | null = null;
let cachedStudent: Student[] | null = null;

const fetchStudent = (): Student[] => {
  if (cachedStudent) {
    return cachedStudent;
  }
  if (!StudentPromise) {
    StudentPromise = axios
      .get("/api/users/students/getAllStudents")
      .then((res) => {
        cachedStudent = res.data.students;
        return res.data.students;
      })
      .catch((err) => {
        console.error("Error fetching students", err);
        return [];
      });
  }
  throw StudentPromise;
};

const Promote = () => {
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>("computer");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // State to track sort order
  const students = fetchStudent();

  const departments = [
    "computer",
    "aiml",
    "ds",
    "entc",
    "mechanical",
    "electrical",
    "civil",
    "cs",
    "aid",
    "it",
    "research",
    "mca",
  ];

  const filterStudents = (department: string): Student[] => {
    return students.filter(
      (student) => student.department.toLowerCase() === department.toLowerCase()
    );
  };

  // Sorting function
  const sortStudentsByPRN = (students: Student[], order: "asc" | "desc") => {
    return students.sort((a, b) => {
      const prnA = Number(a.prn);
      const prnB = Number(b.prn);

      if (order === "asc") {
        return prnA - prnB;
      } else {
        return prnB - prnA;
      }
    });
  };

  // Toggle sorting order when the PRN header is clicked
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const isBTech = (student: Student) => {
    return student.year === "btech";
  };

  return (
    <div className="p-6 bg-base-200 shadow-md rounded-lg overflow-x-auto">
      <div role="tablist" className="tabs tabs-boxed">
        {departments.map((department) => (
          <>
            <button
              key={department}
              className={`tab text-base uppercase ${
                selectedDepartment === department ? "tab-active" : ""
              }`}
              onClick={() => setSelectedDepartment(department)}
              role="tab"
            >
              {department}
            </button>
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6 mt-4"
            >
              <table className="table w-full">
                <thead>
                  <tr className="bg-base text-base">
                    <th
                      className="cursor-pointer w-20 flex justify-center items-center"
                      onClick={toggleSortOrder}
                    >
                      PRN{" "}
                      {sortOrder === "asc" ? (
                        <ArrowUp size={24} />
                      ) : (
                        <ArrowDown size={24} />
                      )}{" "}
                    </th>
                    <th>Name</th>
                    <th className="text-center">Department</th>
                    <th className="text-center">Year</th>
                    <th className="text-center">Division</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (
                    sortStudentsByPRN(
                      filterStudents(selectedDepartment),
                      sortOrder
                    ).map((student) => (
                      <tr key={student.prn}>
                        <td>{student.prn}</td>
                        <td className="capitalize">{student.name}</td>
                        <td className="uppercase text-center">
                          {student.department}
                        </td>
                        <td className="uppercase text-center">
                          {student.year}
                        </td>
                        <td className="uppercase text-center">
                          {student.division}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            disabled={isBTech(student)}
                          >
                            Promote
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No students found for {selectedDepartment} department.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Promote;
