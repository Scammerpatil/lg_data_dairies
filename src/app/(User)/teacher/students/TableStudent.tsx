import StudentDetails from "@/components/Dialogs/StudentDetails";
import { Student } from "@/types/student";
import { User } from "@/types/user";
import axios from "axios";
import { Eye, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

let studentPromise: Promise<Student[]> | null = null;
let cachedStudent: Student[] | null = null;

const fetchStudentsByDepartment = (user: User): Student[] => {
  if (cachedStudent) {
    return cachedStudent;
  }
  if (!studentPromise) {
    studentPromise = axios
      .post("/api/users/students/getStudentsByDepartment", {
        department: user.department.toLowerCase(),
      })
      .then((res) => {
        cachedStudent = res.data.students;
        return res.data.students;
      });
  }
  throw studentPromise;
};

const TableStudent = ({ user }: { user: User }) => {
  const students = fetchStudentsByDepartment(user);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const removeStudent = async (id: string) => {
    const response = axios.post("/api/localguardian/removeLG", {
      student_id: id,
      teacher_id: JSON.parse(localStorage.getItem("user")!)._id,
    });
    toast.promise(response, {
      loading: "Removing student...",
      success: (data) => {
        return "Student removed successfully";
      },
      error: "Error removing student",
    });
  };

  useEffect(() => {
    if (students) {
      setFilteredStudents(
        students.filter(
          (student: Student) => student.lgTeacher?._id === user._id
        )
      );
    }
  }, [students]);

  return (
    <div className="overflow-x-auto w-full">
      <div className="my-4">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Enter The Name of the Student"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search />
        </label>
      </div>
      <table className="table table-zebra">
        <thead className="text-base bg-base-300">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>PRN</th>
            <th>Email</th>
            <th>View</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {searchTerm.trim() === "" &&
            filteredStudents.map((student: Student, index: number) => (
              <tr key={index} className="text-base">
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.prn}</td>
                <td>{student.email}</td>
                <td>
                  {
                    <button
                      onClick={() => {
                        setSelectedStudent(student);
                        (
                          document.getElementById(
                            "studentDetails"
                          ) as HTMLDialogElement
                        ).showModal();
                      }}
                    >
                      <Eye />
                    </button>
                  }
                </td>
                <td className="flex items-center justify-center">
                  <button
                    onClick={() => {
                      removeStudent(student._id);
                    }}
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {selectedStudent && <StudentDetails student={selectedStudent} />}
    </div>
  );
};

export default TableStudent;
