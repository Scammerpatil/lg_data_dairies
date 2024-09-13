"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Chip,
} from "@nextui-org/react";
import {
  CircleCheck,
  Delete,
  Eye,
  RemoveFormatting,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import Select from "react-select";
import { Label } from "@radix-ui/react-dropdown-menu";
import CardDetails from "@/components/CardDetails";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [details, setDetails] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [sortedStudents, setSortedStudents] = useState([]);

  useEffect(() => {
    if (students.length > 0) {
      const temp = [...students].sort((a, b) => {
        // Check if PRN is defined and compare
        if (a.prn && b.prn) {
          if (a.prn < b.prn) return -1;
          if (a.prn > b.prn) return 1;
        }
        return 0;
      });
      setSortedStudents(temp);
    }
  }, [students]);

  useEffect(() => {
    const fetchStudents = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setStudents(user.studentUnder);
      const response = await axios.post(
        "/api/getUsers/students/getStudentsByDepartment",
        { department: user.department.toLowerCase() },
      );
      const students = response.data.students.filter(
        (student) => student.lgTeacher === null,
      );
      setAllStudents(students);
    };
    fetchStudents();
  }, []);

  const handleAssignLG = () => {
    const response = axios.post("/api/assignSingleLG", {
      student_id: selectedStudent.value,
      teacher_id: JSON.parse(localStorage.getItem("user"))._id,
    });
    toast.promise(response, {
      loading: "Assigning Local Guardian...",
      success: (data) => {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data.data.teacher));
        setStudents(data.data.teacher.studentUnder);
        return "Student assigned successfully";
      },
      error: "Error assigning student",
    });
  };

  const removeStudent = async (id) => {
    const response = axios.post("/api/removeLG", {
      student_id: id,
      teacher_id: JSON.parse(localStorage.getItem("user"))._id,
    });
    toast.promise(response, {
      loading: "Removing student...",
      success: (data) => {
        localStorage.setItem("user", JSON.stringify(data.data.teacher));
        setStudents(data.data.teacher.studentUnder);
        return "Student removed successfully";
      },
      error: "Error removing student",
    });
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="mb-4 text-2xl font-bold">Approve Local Guardians</h1>
      <div className="w-ful flex flex-row gap-4">
        <div className="flex w-1/3 flex-row items-center justify-center">
          <Label className="w-1/5">From :</Label>
          <Select
            className="dark:text-light ml-5 w-full bg-gray-light text-dark dark:bg-dark"
            classNamePrefix="select"
            isClearable
            isSearchable
            name="Students"
            onChange={(selectedStudent) => setSelectedStudent(selectedStudent)}
            options={allStudents.map((student) => ({
              label: student.name,
              value: student._id,
            }))}
          />
        </div>
        <div>
          <Button
            className={`text-light rounded bg-gray-light px-4 py-2 font-bold dark:bg-dark dark:text-gray-light hover:dark:bg-slate-800`}
            onClick={handleAssignLG}
          >
            Assign
          </Button>
        </div>
      </div>
      <div className="flex ">
        <Table aria-label="Approve Local Guardians">
          <TableHeader>
            <TableColumn>#</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>PRN</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {sortedStudents.length > 0 ? (
              sortedStudents.map((student, index) => (
                <TableRow key={student._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <User
                      name={student.name}
                      description={student.department}
                      avatarProps={{
                        radius: "lg",
                        src:
                          student.profileImageUrl ||
                          `https://xsgames.co/randomusers/assets/avatars/female/${
                            index + 50
                          }.jpg`,
                      }}
                    />
                  </TableCell>
                  <TableCell>{student.prn}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tooltip content="Details">
                        <Button
                          className="text-default-400 cursor-pointer text-lg active:opacity-50"
                          color="info"
                          onClick={() => {
                            setSelectedStudent(student);
                            setDetails(!details);
                          }}
                        >
                          <Eye />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Remove">
                        <Button
                          className="text-default-400 cursor-pointer text-lg active:opacity-50"
                          color="info"
                          onClick={() => {
                            removeStudent(student._id);
                          }}
                        >
                          <Delete />
                        </Button>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="text-center">
                  No students to approve
                </TableCell>
                <TableCell className="text-center">
                  No students to approve
                </TableCell>
                <TableCell className="text-center">
                  No students to approve
                </TableCell>
                <TableCell className="text-center">
                  No students to approve
                </TableCell>
                <TableCell className="text-center">
                  No students to approve
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {details && selectedStudent ? (
          <CardDetails student={selectedStudent} teacher={undefined} />
        ) : null}
      </div>
    </div>
  );
};

export default Students;
