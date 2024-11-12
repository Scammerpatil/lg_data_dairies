import { Teacher } from "@/types/Teacher";
import axios from "axios";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const fetchTeacher = async (): Promise<Teacher[]> => {
  const response = await axios.get("/api/users/teachers/getAllTeachers");
  return response.data.teachers;
};

const TabTeacher = ({ fromTeacherTab }: { fromTeacherTab: Boolean }) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const data = await fetchTeacher();
        setTeachers(data);
      } catch (error) {
        toast.error("Failed to load teachers");
      }
    };
    loadTeachers();
  }, []);

  const handleApprovalChange = async (
    _id: string,
    value: string,
    email: string
  ) => {
    try {
      const response = axios.put("/api/users/teachers/updateTeacher", {
        _id,
        isApproved: value === "Approved",
      });
      toast.promise(response, {
        loading: "Updating Teacher...",
        success: () => {
          setTeachers((prev) =>
            prev.map((teacher) =>
              teacher._id === _id
                ? { ...teacher, isAdminApproved: value === "Approved" }
                : teacher
            )
          );
          approvalEmail(email, value);
          return "Teacher Updated Successfully";
        },
        error: "Error Updating Teacher",
      });
    } catch (error) {
      console.error("Error updating teacher approval:", error);
      toast.error("Failed to update teacher");
    }
  };

  const approvalEmail = (email: string, value: string) => {
    if (value === "Approved") {
      const approvalEmail = axios.post("/api/helper/approvalemail", {
        email,
      });
      toast.promise(approvalEmail, {
        loading: "Sending Approval Email...",
        success: "Approval Email Sent Successfully",
        error: "Error Sending Approval Email",
      });
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      const response = axios.delete("/api/getUsers/teachers/deleteTeacher", {
        data: { _id },
      });
      toast.promise(response, {
        loading: "Deleting Teacher...",
        success: "Teacher Deleted Successfully",
        error: "Error Deleting Teacher",
      });
    } catch (error) {
      console.error("Error deleting teacher:", error);
      toast.error("Failed to delete teacher");
    }
  };

  // Filter teachers based on search input
  const filteredTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div className="overflow-x-auto">
      <div className="my-4">
        <label className="input input-bordered flex items-center gap-2">
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
        <thead className="text-base bg-base-300">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>{fromTeacherTab ? "Approve" : "Status"}</th>
            {fromTeacherTab && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher, index) => (
              <tr key={index} className="text-base">
                <td>{index + 1}</td>
                <td>{teacher.name}</td>
                <td className="capitalize">{teacher.department}</td>
                <td>{teacher.email}</td>
                <td>
                  {fromTeacherTab ? (
                    <select
                      className="select select-bordered"
                      value={teacher.isAdminApproved ? "Approved" : "Pending"}
                      onChange={(e) =>
                        handleApprovalChange(
                          teacher._id,
                          e.target.value,
                          teacher.email
                        )
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                    </select>
                  ) : (
                    <span>
                      {teacher.isAdminApproved ? "Approved" : "Pending"}
                    </span>
                  )}
                </td>
                {fromTeacherTab && (
                  <td>
                    <button
                      onClick={() => handleDelete(teacher._id)}
                      className="btn btn-error"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No teachers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TabTeacher;
