import StudentDetails from "@/components/Dialogs/StudentDetails";
import { Student } from "@/types/Student";
import { User } from "@/types/user";
import axios from "axios";
import { Eye, Search, Trash2, ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

var studentPromise: Promise<Student[]> | null = null;
var cachedStudent: Student[] | null = null;

type OptionType = {
  value: string;
  label: number;
};

const fetchStudent = (user: User): Student[] => {
  if (cachedStudent) {
    return cachedStudent;
  }
  if (!studentPromise) {
    studentPromise = axios
      .post("/api/users/students/getStudentsByDepartment", {
        department: user.department,
      })
      .then((res) => {
        cachedStudent = res.data.students;
        return res.data.students;
      });
  }
  throw studentPromise;
};

const AllStudent = ({ user }: { user: User }) => {
  const students = fetchStudent(user);
  const [assignForm, setAssignForm] = useState({
    from: { value: "", label: 0 },
    to: { value: "", label: 0 },
    teacher: { value: "", label: 0 },
  });
  const [searchTerm, setSearchTerm] = useState<string | undefined>("");
  const [year, setYear] = useState<string | undefined>("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [teacher, setTeacher] = useState<any[]>([]);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [teacherOptions, setTeacherOptions] = useState<OptionType[]>([]);
  const [isAscending, setIsAscending] = useState(true);

  const toggleSorting = () => {
    setIsAscending((prev) => !prev);
  };

  // Fetch teachers
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.post(
          "/api/users/teachers/getTeacherByDepartment",
          { department: user.department }
        );
        if (response.data.error) {
          toast.error(response.data.error);
          return;
        }
        setTeacher(response.data.teachers || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch teachers");
      }
    };
    fetchTeacherData();
  }, [user.department]);

  // Set options for students and teachers
  useEffect(() => {
    const studentOptions: OptionType[] = students
      .filter((student) => student.lgTeacher === null) // Unassigned students
      .map((student) => ({
        value: student._id,
        label: student.prn,
      }));
    setOptions(studentOptions);

    if (teacher.length > 0) {
      const teacherOptions: OptionType[] = teacher
        .filter((t) => t.isLG) // Only LGs
        .map((t) => ({
          value: t._id,
          label: t.name,
        }));
      setTeacherOptions(teacherOptions);
    }
  }, [students, teacher]);

  const handleShowModal = (student: Student) => {
    setSelectedStudent(student);
    const studentDetailsDialog = document.getElementById(
      "studentDetails"
    ) as HTMLDialogElement;
    if (studentDetailsDialog) {
      studentDetailsDialog.showModal();
    } else {
      console.error("Dialog not found!");
    }
  };

  // Assign LG to students
  const handleAssignLG = async () => {
    if (!assignForm.from || !assignForm.to || !assignForm.teacher) {
      toast.error("Please select 'From', 'To', and 'Teacher'");
      return;
    }

    const data = {
      from: assignForm.from.value,
      to: assignForm.to.value,
      _id: assignForm.teacher.value,
    };

    if (assignForm.to.label < assignForm.from.label) {
      toast.error(
        `Invalid range. 'To' (${assignForm.to.label}) should be greater than 'From' (${assignForm.from.label}).`
      );
      return;
    }
    try {
      const response = axios.post("/api/localguardian/assignLG", data);
      toast.promise(response, {
        loading: "Assigning local guardians...",
        success: "Local guardians assigned successfully",
        error: "Failed to assign local guardians",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to assign local guardians");
    }
  };

  // Remove student from LG
  const removeStudent = async (student: Student) => {
    const response = axios.post("/api/localguardian/removeLG", {
      student_id: student._id,
      teacher_id: student.lgTeacher._id,
    });
    toast.promise(response, {
      loading: "Removing student...",
      success: (data) => {
        return "Student removed successfully";
      },
      error: "Error removing student",
    });
  };

  // Assign single student to LG
  const handleSingleAssignLG = async ({
    student,
    teacher,
  }: {
    student: Student;
    teacher: string;
  }) => {
    if (!student) {
      toast.error("Please select a student");
      return;
    }
    try {
      const response = axios.post("/api/localguardian/assignSingleLG", {
        student_id: student._id,
        teacher_id: teacher,
      });
      toast.promise(response, {
        loading: "Assigning local guardian...",
        success: "Local guardian assigned successfully",
        error: "Failed to assign local guardian",
      });
    } catch (error) {
      toast.error("Error assigning student");
      console.error(error);
    }
  };

  return (
    <>
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
        <select
          className="select select-bordered w-full"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option selected>Filter By Year</option>
          <option value={"fy"}>F.Y.BTech</option>
          <option value={"sy"}>S.Y.BTech</option>
          <option value={"ty"}>T.Y.BTech</option>
          <option value={"btech"}>BTech</option>
        </select>
      </div>

      <div className="my-4 flex flex-row gap-5">
        <select
          name="from"
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => {
            const selectedOption = options.find(
              (option) => option.value === e.target.value
            );
            setAssignForm((prev) => ({
              ...prev,
              from: selectedOption || prev.from,
            }));
          }}
        >
          <option value="">Select From</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          name="to"
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => {
            const selectedOption = options.find(
              (option) => option.value === e.target.value
            );
            setAssignForm((prev) => ({
              ...prev,
              to: selectedOption || prev.to,
            }));
          }}
        >
          <option value="">Select To</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          name="teacher"
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => {
            const selectedOption = teacherOptions.find(
              (option) => option.value === e.target.value
            );
            setAssignForm((prev) => ({
              ...prev,
              teacher: selectedOption || prev.teacher,
            }));
          }}
        >
          <option value="">Select Teacher</option>
          {teacherOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button className="btn btn-primary" onClick={handleAssignLG}>
          Assign
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra overflow-y-auto h-screen">
          <thead className="bg-base-300 text-sm">
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th className="">
                <button
                  className="btn btn-ghost w-32 flex flex-row gap-1 items-center justify-center"
                  onClick={toggleSorting}
                >
                  PRN
                  <span> {isAscending ? <ArrowUp /> : <ArrowDown />}</span>
                </button>
              </th>
              <th>Student Email</th>
              <th>Student Department</th>
              <th>Student Year</th>
              <th>Student Division</th>
              <th>Student LG</th>
              <th>View</th>
              <th>Remove LG</th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter((student) =>
                student.name.toLowerCase().includes(searchTerm?.toLowerCase()!)
              )
              .filter((student) => {
                if (year) return student.year === year;
                return true;
              })
              .filter((student) => {
                if (assignForm.from.value && assignForm.to.value) {
                  return (
                    student.prn >= assignForm.from.label &&
                    student.prn <= assignForm.to.label
                  );
                }
                return true;
              })
              .sort((a, b) => {
                if (isAscending) {
                  return a.prn - b.prn;
                } else {
                  return b.prn - a.prn;
                }
              })
              .map((student, index) => (
                <tr key={student._id} className="text-base">
                  <td>{index + 1}</td>
                  <td className="w-full">{student.name}</td>
                  <td>{student.prn}</td>
                  <td>{student.email}</td>
                  <td className="capitalize">{student.department}</td>
                  <td className="capitalize">{student.year}</td>
                  <td className="capitalize">{student?.division}</td>
                  <td>
                    {student.lgTeacher ? (
                      student.lgTeacher.name
                    ) : (
                      <select
                        className="select select-bordered w-full"
                        onChange={(e) => {
                          const teacher = e.target.value;
                          handleSingleAssignLG({ student, teacher });
                        }}
                      >
                        <option value="">Select Teacher</option>
                        {teacherOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleShowModal(student)}
                    >
                      <Eye />
                    </button>
                  </td>
                  <td className="w-full h-full flex justify-center items-center">
                    <button
                      onClick={() => {
                        removeStudent(student);
                      }}
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {selectedStudent && <StudentDetails student={selectedStudent} />}
    </>
  );
};

export default AllStudent;
