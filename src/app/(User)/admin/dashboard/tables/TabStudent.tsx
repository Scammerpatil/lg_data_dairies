import { Student } from "@/types/student";
import axios from "axios";
import { Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

let studentPromise: Promise<Student[]> | null = null;
let cachedStudent: Student[] | null = null;

const fetchStudent = (): Student[] => {
  if (cachedStudent) {
    return cachedStudent;
  }
  if (!studentPromise) {
    studentPromise = axios
      .get("/api/users/students/getAllStudents")
      .then((res) => {
        cachedStudent = res.data.students;
        return res.data.students;
      });
  }
  throw studentPromise;
};

const TabStudent = ({ fromStudentTab }: { fromStudentTab: Boolean }) => {
  const students = fetchStudent();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleApprovalChange = async (
    studentId: string,
    value: string,
    email: string
  ) => {
    const response = axios.put("/api/users/students/updateStudent", {
      _id: studentId,
      isApproved: value === "Approved",
    });
    toast.promise(response, {
      loading: "Updating Student...",
      success: "Student Updated Successfully",
      error: "Error Updating Student",
    });

    try {
      if ((await response) && value === "Approved") {
        const approvalEmail = axios.post("/api/approvalemail", {
          email: email,
        });
        toast.promise(approvalEmail, {
          loading: "Sending Approval Email...",
          success: "Approval Email Sent Successfully",
          error: "Error Sending Approval Email",
        });
      }
    } catch (error) {
      console.error("Error sending approval email:", error);
    }
  };

  const handleDelete = (studentId: string) => {
    const response = axios.delete("/api/deleteStudent", {
      data: { _id: studentId },
    });
    toast.promise(response, {
      loading: "Deleting Student...",
      success: "Student Deleted Successfully",
      error: "Error Deleting Student",
    });
  };

  const filteredStudents = searchTerm
    ? students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      )
    : students;

  return (
    <div className="overflow-x-auto">
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
            <th>Department</th>
            <th>Email</th>
            <th>{fromStudentTab ? "Approve" : "Status"}</th>
            {fromStudentTab ? <th>Delete</th> : null}
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index} className="text-base">
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td className="capitalize">{student.department}</td>
              <td>{student.email}</td>
              <td>
                {fromStudentTab ? (
                  <select
                    className="select select-bordered"
                    onChange={(e) =>
                      handleApprovalChange(
                        student._id,
                        e.target.value,
                        student.email
                      )
                    }
                    value={student.isAdminApproved ? "Approved" : "Pending"}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                  </select>
                ) : (
                  <span>
                    {student.isAdminApproved ? "Approved" : "Pending"}
                  </span>
                )}
              </td>
              {fromStudentTab && (
                <td>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="btn btn-error"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabStudent;
