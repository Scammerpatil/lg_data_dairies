"use client";
import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Student } from "@/types/Student";
import TableSkeleton from "@/components/Common/TableSkeleton";
import TableStudent from "./TableStudent";
import { User } from "@/types/user";

const Students = () => {
  const [user, setUser] = useState<User | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [options, setOptions] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const user = JSON.parse(localStorage.getItem("user")!);
      if (user) {
        setUser(user);
      }
      setStudents(user.studentUnder);
      const response = await axios.post(
        "/api/users/students/getStudentsByDepartment",
        { department: user.department.toLowerCase() }
      );
      const students = response.data.students.filter(
        (student: Student) => student.lgTeacher === null
      );
      setOptions(students);
    };
    fetchStudents();
  }, []);

  const handleAssignLG = async () => {
    if (!selectedStudent) {
      toast.error("Please select a student");
      return;
    }
    try {
      const response = await axios.post("/api/localguardian/assignSingleLG", {
        student_id: selectedStudent._id,
        teacher_id: user?._id,
      });
      const updatedUser = response.data.teacher;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setStudents(updatedUser.studentUnder);
      toast.success("Student assigned successfully");
    } catch (error) {
      toast.error("Error assigning student");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="mb-4 text-2xl font-bold">Approve Local Guardians</h1>
      <div className="w-ful flex flex-row gap-4">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Student Name</span>
          </div>
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => {
              const student = options.find(
                (option) => option._id === e.target.value
              );
              setSelectedStudent(student || null);
            }}
          >
            <option defaultChecked>Select</option>
            {options.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
        <button
          className="text-light bg-accent text-accent-content rounded mt-[33px] px-4 py-2 font-bold"
          onClick={handleAssignLG}
        >
          Assign
        </button>
      </div>

      <div className="flex">
        <Suspense fallback={<TableSkeleton />}>
          {user && <TableStudent user={user} />}
        </Suspense>
      </div>
    </div>
  );
};

export default Students;
