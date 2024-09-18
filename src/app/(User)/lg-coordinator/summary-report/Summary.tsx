import { teacher } from "@/types/teacher";
import { User } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";

var teacherPromise: Promise<teacher[]> | null = null;
var cachedTeacher: teacher[] | null = null;

const fetchTeacher = (user: User): teacher[] => {
  if (cachedTeacher) {
    return cachedTeacher;
  }

  if (!teacherPromise) {
    teacherPromise = axios
      .post("/api/localguardian/getAllLGByDepartment", {
        department: user.department,
      })
      .then((res) => {
        cachedTeacher = res.data;
        return res.data;
      });
  }
  throw teacherPromise;
};

const Summary = ({ user }: { user: User }) => {
  const teachers = fetchTeacher(user);
  const [sybtech, setSYBTech] = useState<teacher[]>([]);
  const [tybtech, setTYBTech] = useState<teacher[]>([]);
  const [btech, setBTech] = useState<teacher[]>([]);

  useEffect(() => {
    // Filter teachers based on the year
    const sybtechTeachers = teachers.filter((t) => t.year === "sy");
    setSYBTech(sybtechTeachers);

    const tybtechTeachers = teachers.filter((t) => t.year === "ty");
    setTYBTech(tybtechTeachers);

    const btechTeachers = teachers.filter((t) => t.year === "btech");
    setBTech(btechTeachers);
  }, [teachers]);

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead className="bg-base-200">
          <tr>
            <td
              colSpan={7}
              className="font-bold text-center text-xl border-b-2 border-base-content"
            >
              Department of {user.department} Engineering
            </td>
          </tr>
          <td
            colSpan={7}
            className="font-bold text-center text-base border-b-2 border-base-content"
          >
            LG Summary {new Date().getFullYear()} -{" "}
            {new Date().getFullYear() + 1}
          </td>
          <tr>
            <th className="text-center">#</th>
            <th>SY BTech</th>
            <th className="text-center">Count</th>
            <th>TY BTech</th>
            <th className="text-center">Count</th>
            <th>BTech</th>
            <th className="text-center">Count</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop over the longest list of teachers from the three categories */}
          {Array.from({
            length: Math.max(sybtech.length, tybtech.length, btech.length),
          }).map((_, index) => (
            <tr key={index}>
              {/* Serial Number */}
              <td className="text-center">{index + 1}</td>

              {/* SY BTech Teacher and Student Count */}
              <td>{sybtech[index] ? sybtech[index].name : "-"}</td>
              <td className="text-center">
                {sybtech[index] ? sybtech[index].studentUnder.length : "-"}
              </td>

              {/* TY BTech Teacher and Student Count */}
              <td>{tybtech[index] ? tybtech[index].name : "-"}</td>
              <td className="text-center">
                {tybtech[index] ? tybtech[index].studentUnder.length : "-"}
              </td>

              {/* BTech Teacher and Student Count */}
              <td>{btech[index] ? btech[index].name : "-"}</td>
              <td className="text-center">
                {btech[index] ? btech[index].studentUnder.length : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Summary;
