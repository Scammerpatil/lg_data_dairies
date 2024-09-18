import { Student } from "@/types/student";
import { useEffect, useState } from "react";
import Table from "./Table";

const LastYear = ({ students }: { students: Student[] }) => {
  const [compA, setCompA] = useState<Student[]>();
  const [compB, setCompB] = useState<Student[]>();
  const [compC, setCompC] = useState<Student[]>();
  useEffect(() => {
    setCompA(
      students.filter(
        (student) => student.year === "btech" && student.division === "a"
      )
    );
    setCompB(
      students.filter(
        (student) => student.year === "btech" && student.division === "b"
      )
    );
    setCompC(
      students.filter(
        (student) => student.year === "btech" && student.division === "c"
      )
    );
  }, [students]);
  return (
    <div
      role="tablist"
      className="tabs tabs-boxed text-base-content w-full items-center"
    >
      <input
        type="radio"
        name="btech"
        role="tab"
        className="tab"
        aria-label="B.Tech Comp-A"
        defaultChecked
      />
      <div role="tabpanel" className="tab-content rounded-box p-6">
        {compA && <Table students={compA} />}
      </div>

      <input
        type="radio"
        name="btech"
        role="tab"
        className="tab"
        aria-label="B.Tech Comp-B"
      />
      <div role="tabpanel" className="tab-content rounded-box p-6">
        {compB && <Table students={compB} />}
      </div>

      <input
        type="radio"
        name="btech"
        role="tab"
        className="tab"
        aria-label="B.Tech Comp-C"
      />
      <div role="tabpanel" className="tab-content rounded-box p-6">
        {compC && <Table students={compC} />}
      </div>
    </div>
  );
};

export default LastYear;
