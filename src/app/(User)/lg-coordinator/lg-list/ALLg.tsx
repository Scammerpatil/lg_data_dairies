"use client";
import { teacher } from "@/types/teacher";
import { User } from "@/types/user";
import axios from "axios";
import { ArrowDown, ArrowUp, ChevronDown, Search } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

var teacherPromise: Promise<teacher[]> | null = null;
var cachedTeacher: teacher[] | null = null;

const fetchTeacher = (user: User): teacher[] => {
  if (cachedTeacher) {
    return cachedTeacher;
  }

  if (!teacherPromise) {
    teacherPromise = axios
      .post("/api/localguardian/getAllLGByDepartment", {
        department: user.department,
      })
      .then((res) => {
        cachedTeacher = res.data;
        return res.data;
      });
  }
  throw teacherPromise;
};

const ALLLG = ({ user }: { user: User }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedTeacherId, setExpandedTeacherId] = useState<string | null>(
    null
  );
  const [year, setYear] = useState<string>("");
  const [isAscending, setIsAscending] = useState(true);

  const toggleSorting = () => {
    setIsAscending((prev) => !prev);
  };

  const teacher = fetchTeacher(user);
  console.log(teacher);
  const handleExpandToggle = (id: string) => {
    setExpandedTeacherId((prevId) => (prevId === id ? null : id));
  };

  const handleYearChange = (year: string, _id: string) => {
    const response = axios.put("/api/users/teachers/updateYearOfTeacher", {
      _id,
      year,
    });
    toast.promise(response, {
      loading: "Loading...",
      success: "Year Updated Successfully",
      error: "Error Updating Year",
    });
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
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra overflow-y-auto h-full">
          <thead className="bg-base-300 text-base font-light">
            <tr>
              <th>#</th>
              <th>Teacher Name</th>
              <th>Teacher Email</th>
              <th>Teacher Is LG</th>
              <th>Year</th>
              <th>Teacher Role</th>
              <th>View Students</th>
            </tr>
          </thead>
          <tbody>
            {teacher
              .filter((teacher) =>
                teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((teacher, index) => (
                <React.Fragment key={teacher._id}>
                  <tr className="text-base">
                    <td>{index + 1}</td>
                    <td className="w-full">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={
                                teacher.profileImageUrl
                                  ? teacher.profileImageUrl
                                  : `https://i.pravatar.cc/${index + 100}`
                              }
                              alt="Avatar"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{teacher.name}</div>
                          <div className="text-sm opacity-50">
                            {teacher.department}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{teacher.email}</td>
                    <td>{teacher?.isLG ? "Yes" : "No"}</td>
                    <td className="capitalize">{teacher.role}</td>
                    <td className="capitalize text-center">
                      {teacher.year ? (
                        teacher.year.concat(" BTech")
                      ) : (
                        <select
                          className="select select-bordered w-full max-w-xs"
                          value={year}
                          onChange={(e) => {
                            handleYearChange(e.target.value, teacher._id);
                          }}
                        >
                          Choose Year
                          <option defaultChecked>Select Year</option>
                          <option value="sy">Second Year</option>
                          <option value="ty">Third Year</option>
                          <option value="btech">Last Year</option>
                        </select>
                      )}
                    </td>
                    <td>
                      <button
                        className="w-full h-full flex justify-center items-center flex-row gap-2"
                        onClick={() => handleExpandToggle(teacher._id)}
                      >
                        View <ChevronDown />
                      </button>
                    </td>
                  </tr>
                  {expandedTeacherId === teacher._id && (
                    <tr>
                      <td colSpan={6}>
                        <table className="table table-zebra overflow-y-auto h-80">
                          <thead>
                            <tr className="bg-base-300">
                              <th className="">Student Name</th>
                              <th className="">Student Email</th>
                              <th className="text-center">Student Year</th>
                              <th className="flex flex-row justify-center items-center gap-5">
                                Student PRN{" "}
                                <button onClick={toggleSorting}>
                                  {isAscending ? <ArrowDown /> : <ArrowUp />}
                                </button>
                              </th>
                              <th>Division</th>
                            </tr>
                          </thead>
                          <tbody>
                            {teacher.studentUnder
                              .sort((a, b) => {
                                if (isAscending) {
                                  return a.prn - b.prn;
                                } else {
                                  return b.prn - a.prn;
                                }
                              })
                              .map((student) => (
                                <tr key={student._id}>
                                  <td>{student.name}</td>
                                  <td>{student.email}</td>
                                  <td className="capitalize text-center">
                                    {student.year}
                                  </td>
                                  <td className="text-center">{student.prn}</td>
                                  <td className="capitalize text-center">
                                    {student?.division}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ALLLG;
