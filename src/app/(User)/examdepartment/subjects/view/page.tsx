"use client";
import { AcademicStructure } from "@/types/AcademicStructure";
import axios from "axios";
import { useEffect, useState } from "react";

const ViewSubjectsPage = () => {
  const [subjects, setSubjects] = useState<AcademicStructure[]>([]);
  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await axios.get("/api/subjects/viewAllSubject");
      setSubjects(response.data);
    };
    fetchSubjects();
  }, []);
  return (
    <div className="container">
      <h1 className="text-3xl text-center">View Subjects</h1>
      {subjects.map((subject) => (
        <div
          key={subject._id}
          className="p-6 max-w-md mx-auto bg-base-200 shadow-md rounded-lg"
        >
          <h2 className="text-xl font-bold">{subject.departmentName}</h2>
          {subject.semesters.map((semester) => (
            <div key={semester._id}>
              <h3 className="text-lg font-bold">
                Semester {semester.semesterNumber}
              </h3>
              <ul>
                {semester.subjects.map((subject) => (
                  <li key={subject._id}>{subject.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ViewSubjectsPage;
