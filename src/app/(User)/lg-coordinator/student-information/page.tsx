"use client";
import { useEffect, useState } from "react";
import LastYear from "./LastYear";
import SecondYear from "./SecondYear";
import ThirdYear from "./ThirdYear";
import { Student } from "@/types/Student";
import axios from "axios";

const StundetInformation = () => {
  const [students, setStudents] = useState<Student[]>([]);
  useEffect(() => {
    const fetchStudents = async () => {
      await axios.get("/api/users/students/getAllStudents").then((res) => {
        setStudents(res.data.students);
      });
    };
    fetchStudents();
  }, []);

  return (
    <div
      role="tablist"
      className="tabs tabs-boxed text-base-content w-full items-center"
    >
      <input
        type="radio"
        name="main_tab"
        role="tab"
        className="tab flex-auto"
        aria-label="S.Y.B.Tech"
        defaultChecked
      />
      <div role="tabpanel" className="tab-content rounded-box p-6">
        {students && <SecondYear students={students} />}
      </div>

      <input
        type="radio"
        name="main_tab"
        role="tab"
        className="tab flex-auto"
        aria-label="T.Y.B.Tech"
      />
      <div role="tabpanel" className="tab-content rounded-box p-6">
        {students && <ThirdYear students={students} />}
      </div>

      <input
        type="radio"
        name="main_tab"
        role="tab"
        className="tab flex-auto"
        aria-label="B.Tech"
      />
      <div role="tabpanel" className="tab-content rounded-box p-6">
        {students && <LastYear students={students} />}
      </div>
    </div>
  );
};

export default StundetInformation;
