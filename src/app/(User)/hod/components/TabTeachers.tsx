import TeacherDetails from "@/components/Dialogs/TeacherDetails";
import { teacher } from "@/types/teacher";
import axios from "axios";
import { Check, Eye, Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

let teacherPromise: Promise<teacher[]> | null = null;
let cachedTeacher: teacher[] | null = null;

const fetchTeacher = async (): Promise<teacher[]> => {
  if (cachedTeacher) {
    return cachedTeacher;
  }
  if (!teacherPromise) {
    teacherPromise = axios
      .get("/api/users/teachers/getAllTeachers")
      .then((res) => {
        cachedTeacher = res.data.teachers;
        return res.data.teachers;
      })
      .catch((err) => {
        console.error("Error fetching teachers", err);
        return [];
      });
  }
  return teacherPromise;
};

const TabTeacher = () => {
  const [teachers, setTeachers] = useState<teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [teacherDetails, setTeacherDetails] = useState<teacher | null>(null);

  useEffect(() => {
    const getTeachers = async () => {
      const data = await fetchTeacher();
      setTeachers(data);
    };
    getTeachers();
  }, []);

  const handleViewDetails = (teacher: teacher): void => {
    setTeacherDetails(teacher);
    (
      document.getElementById("teacherDetails") as HTMLDialogElement
    ).showModal();
  };

  const handleReject = async (id: string) => {
    try {
      const response = axios.post("/api/users/teachers/approveTeacher", {
        id,
        isLG: false,
      });
      toast.promise(response, {
        loading: "Removing Teacher from LG...",
        success: () => {
          return `Teacher with id ${id} removed`;
        },
        error: () => {
          return `Failed to remove Teacher with id ${id}`;
        },
      });
      setTeachers((prev) =>
        prev.map((teacher) =>
          teacher._id === id ? { ...teacher, isLG: false } : teacher
        )
      );
    } catch (error) {
      toast.error(`Failed to remove Teacher with id ${id}`);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const response = axios.post("/api/users/teachers/approveTeacher", {
        id,
        isLG: true,
      });
      toast.promise(response, {
        loading: "Approving Teacher as LG...",
        success: () => {
          return `Teacher with id ${id} approved`;
        },
        error: () => {
          return `Failed to approve Teacher with id ${id}`;
        },
      });
      setTeachers((prev) =>
        prev.map((teacher) =>
          teacher._id === id ? { ...teacher, isLG: true } : teacher
        )
      );
    } catch (error) {
      toast.error(`Failed to approve Teacher with id ${id}`);
    }
  };

  const filteredTeachers = teachers.filter((tchr) =>
    tchr.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher, index) => (
              <tr key={index} className="text-base">
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={`https://img.daisyui.com/images/profile/demo/${
                            index + 2
                          }@94.webp`}
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{teacher.name}</div>
                      <div className="text-sm opacity-50"></div>
                    </div>
                  </div>
                </td>
                <td className="capitalize">{teacher.department}</td>
                <td>{teacher.email}</td>
                <td>{teacher.isLG ? "Approved" : "Pending"}</td>
                <td className="flex flex-row gap-2">
                  <button
                    onClick={() => handleViewDetails(teacher)}
                    className="btn btn-primary"
                  >
                    <Eye />
                  </button>
                  {teacher.isLG ? (
                    <button
                      onClick={() => handleReject(teacher._id)}
                      className="btn btn-error"
                    >
                      <Trash2 />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApprove(teacher._id)}
                      className="btn btn-success"
                    >
                      <Check />
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No teachers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Teacher Details Dialog */}
      {<TeacherDetails teacher={teacherDetails} />}
    </div>
  );
};

export default TabTeacher;
