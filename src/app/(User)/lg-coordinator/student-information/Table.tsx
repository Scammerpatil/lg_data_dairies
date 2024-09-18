import { Student } from "@/types/student";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const Table = ({ students }: { students: Student[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedStudent, setSortedStudent] = useState<Student[]>(students);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    // Filter based on search term
    let filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort based on PRN
    filteredStudents = filteredStudents.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.prn - b.prn;
      } else {
        return b.prn - a.prn;
      }
    });

    setSortedStudent(filteredStudents);
  }, [searchTerm, sortOrder, students]);

  const handleSortByPRN = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="overflow-x-auto">
      <div className="my-4 flex flex-row gap-5">
        <label className="input input-bordered flex items-center gap-2 w-1/2">
          <input
            type="text"
            className="grow"
            placeholder="Enter The Name of the Teacher"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search />
        </label>
      </div>
      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-300 text-base">
            <th>#</th>
            <th>Name</th>
            <th onClick={handleSortByPRN} className="cursor-pointer">
              PRN {sortOrder === "asc" ? "↑" : "↓"}
            </th>
            <th>Local Guardian</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudent.length !== 0 ? (
            sortedStudent.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.prn}</td>
                <td>{student.lgTeacher?.name || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                No Student Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
