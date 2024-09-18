"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircleCheck, Eye, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Student } from "@/types/student";

type OptionType = {
  value: string;
  label: number;
  color?: string;
  isDisabled?: boolean;
};

const AssignLG = () => {
  const [studentsData, setStudentsData] = useState<Student[]>([]);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [teacher, setTeacher] = useState<any[]>([]);
  const [teacherOptions, setTeacherOptions] = useState<OptionType[]>([]);
  const [from, setFrom] = useState<OptionType | null>(null);
  const [to, setTo] = useState<OptionType | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<OptionType | null>(
    null
  );
  const [allOptionsSelected, setAllOptionsSelected] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const department = user.department.toLowerCase();
        const response = await axios.post(
          "/api/users/students/getStudentsByDepartment",
          { department }
        );
        if (response.data.error) {
          toast.error(response.data.error);
          return;
        }
        setStudentsData(response.data.students || []);

        const response2 = await axios.post(
          "/api/users/teachers/getTeacherByDepartment",
          { department }
        );
        if (response2.data.error) {
          toast.error(response2.data.error);
          return;
        }
        setTeacher(response2.data.teachers || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch data");
      }
    };
    fetchStudentData();
  }, []);

  useEffect(() => {
    const studentOptions: OptionType[] = studentsData
      .filter((student) => student.lgTeacher === null)
      .map((student) => ({
        value: student._id,
        label: student.prn,
      }));
    setOptions(studentOptions);

    if (teacher.length > 0) {
      const teacherOptions: OptionType[] = teacher
        .filter((t) => t.isLG && t.studentUnder.length === 0)
        .map((t) => ({
          value: t._id,
          label: t.name,
        }));
      setTeacherOptions(teacherOptions);
    }
  }, [studentsData, teacher]);

  useEffect(() => {
    if (from !== null && to !== null && selectedTeacher !== null) {
      setAllOptionsSelected(true);
    } else {
      setAllOptionsSelected(false);
    }
  }, [from, to, selectedTeacher]);

  const handleAssignLG = async () => {
    if (!from || !to || !selectedTeacher) return;

    const data = {
      to: to?.value,
      from: from?.value,
      _id: selectedTeacher?.value,
    };

    if (to.label <= from.label) {
      toast.error(
        `Invalid range. 'To' (${to.label}) should be greater than 'From' (${from.label}).`
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
      await response;
    } catch (error) {
      console.error(error);
      toast.error("Failed to assign local guardians");
    }
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="mb-4 text-2xl font-bold">Approve Local Guardians</h1>
      <div className="w-full flex flex-row gap-4">
        <div className="flex w-1/3 flex-row items-center justify-center">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Starting From</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs"
              onChange={(e) => {
                const selectedOption = options.find(
                  (option) => option.value === e.target.value
                );
                setFrom(selectedOption || null);
              }}
            >
              <option disabled selected>
                Select
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex w-1/3 flex-row items-center justify-center">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Ending At</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs"
              onChange={(e) => {
                const selectedOption = options.find(
                  (option) => option.value === e.target.value
                );
                setTo(selectedOption || null);
              }}
            >
              <option disabled selected>
                Select
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex w-1/3 flex-row items-center justify-center">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Select Local Guardian Teacher</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs"
              onChange={(e) => {
                const selectedOption = teacherOptions.find(
                  (option) => option.value === e.target.value
                );
                setSelectedTeacher(selectedOption || null);
              }}
            >
              <option disabled selected>
                Select
              </option>
              {teacherOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <button
            className={`btn btn-primary mt-[34px] ${
              !allOptionsSelected ? "btn-disabled" : ""
            }`}
            disabled={!allOptionsSelected}
            onClick={handleAssignLG}
          >
            {"Assign"}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto mt-10 overflow-y-auto h-screen">
        <table className="table table-zebra">
          <thead className="bg-base-300 text-base">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>PRN</th>
              <th>Local Guardian</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {studentsData.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={`https://img.daisyui.com/images/profile/demo/${
                            index + 1
                          }@94.webp`}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{student.name}</div>
                      <div className="text-sm opacity-50">
                        {student.personalDetails?.domicile}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{student.email}</td>
                <td>{student.prn}</td>
                <td>{student.lgTeacher?.name || "Pending"}</td>
                <td>
                  <button className="btn btn-sm btn-secondary">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignLG;
