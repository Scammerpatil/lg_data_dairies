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
import { CircleCheck, Eye, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import Select from "react-select";
import { Label } from "@radix-ui/react-dropdown-menu";
import CardDetails from "@/components/CardDetails";
type Student = {
  _id: string;
  name: string;
  email: string;
  prn: string;
  profileImageUrl: string;
  department: string;
  lgTeacher: {
    name: string;
  } | null;
};

type OptionType = {
  value: string;
  label: string;
  color?: string;
  isDisabled?: boolean;
};

const AssignLG = () => {
  const [studentsData, setStudentsData] = useState<Student[]>([]);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [teacher, setTeacher] = useState(null);
  const [teacherOptions, setTeacherOptions] = useState<OptionType[]>([]);
  const [from, setFrom] = useState<OptionType | null>(null);
  const [to, setTo] = useState<OptionType | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [allOptionsSelected, setAllOptionsSelected] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [details, setDetails] = useState(false);
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const department = user.department.toLowerCase();
        const response = await axios.post(
          "/api/getUsers/students/getStudentsByDepartment",
          { department },
        );
        if (response.data.error) {
          toast.error(response.data.error);
          return;
        }
        setStudentsData(response.data.students || []);
        const response2 = await axios.post(
          "/api/getUsers/teachers/getTeacherByDepartment",
          { department },
        );
        if (response2.data.error) {
          toast.error(response2.data.error);
          return;
        }
        setTeacher(response2.data.teachers || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch teachers data");
      }
    };
    fetchStudentData();
  }, []);

  useEffect(() => {
    const options: OptionType[] = studentsData
      .filter((student) => student.lgTeacher === null)
      .map((student) => ({
        value: student._id,
        label: student.prn,
      }));
    setOptions(options);

    if (teacher !== null) {
      const teacherOptions: OptionType[] = teacher
        .filter((t: any) => t.isLG && t.studentUnder.length === 0)
        .map((t) => ({
          value: t._id,
          label: t.name,
        }));
      console.log(teacherOptions);
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
    const data = {
      to: to?.value,
      from: from?.value,
      _id: selectedTeacher?.value,
    };
    if (to.label <= from.label) {
      toast.error(
        `Invalid range. to ${to.label} should be less than from ${from.label}.`,
      );
      return;
    }
    try {
      const response = axios.post("/api/assignLG", data);
      toast.promise(response, {
        loading: "Assigning local guardians",
        success: "Local guardians assigned successfully",
        error: "Failed to assign local guardians",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to assign local guardians");
    }
  };

  const handleSelectStudent = (student: Student) => {
    setDetails(!details);
    console.log("seleceted Student", student);
    setSelectedStudent(student);
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
            defaultValue={options[0]}
            isClearable
            isSearchable
            name="Students"
            options={options}
            onChange={(selectedOption) => setFrom(selectedOption)}
          />
        </div>
        <div className="flex w-1/3 flex-row items-center justify-center">
          <Label className="w-1/5">To :</Label>
          <Select
            className="dark:text-light ml-5 w-full bg-gray-light text-dark dark:bg-dark"
            classNamePrefix="select"
            defaultValue={options[0]}
            isClearable
            isSearchable
            name="Students"
            options={options}
            onChange={(selectedOption) => setTo(selectedOption)}
          />
        </div>
        <div className="flex w-1/3 flex-row items-center justify-center">
          <Label className="w-1/3">Assign To :</Label>
          <Select
            className="dark:text-light ml-1 w-full bg-gray-light text-dark dark:bg-dark"
            classNamePrefix="select"
            defaultValue={teacherOptions[0]}
            isClearable
            isSearchable
            name="Students"
            options={teacherOptions}
            onChange={(selectedOption) => setSelectedTeacher(selectedOption)}
          />
        </div>
        <div>
          <Button
            className={`text-light rounded bg-gray-light px-4 py-2 font-bold dark:bg-dark dark:text-gray-light hover:dark:bg-slate-800 ${
              !allOptionsSelected
                ? "cursor-not-allowed disabled:text-dark"
                : "cursor-pointer"
            }`}
            disabled={!allOptionsSelected}
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
            <TableColumn>Email</TableColumn>
            <TableColumn>Local Guardian</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {studentsData.length > 0 ? (
              studentsData.map((student, index) => (
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
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <Chip className="capitalize" size="sm" variant="flat">
                      {student.lgTeacher !== null
                        ? student.lgTeacher.name
                        : "Pending"}{" "}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tooltip content="Details">
                        <Button
                          className="text-default-400 cursor-pointer text-lg active:opacity-50"
                          color="info"
                          onClick={() => handleSelectStudent(student)}
                        >
                          <Eye />
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

export default AssignLG;
