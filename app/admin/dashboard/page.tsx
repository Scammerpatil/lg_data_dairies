"use client";
import React, { useEffect, useState } from "react";

function adminDashboard() {
  const [hod, setHod] = useState([]);
  const [student, setStudent] = useState([]);
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    fetch("/api/getUsers/hods/getAllHOD")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHod(data.hod);
        }
      });
    fetch("/api/getUsers/students/getAllStudents")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStudent(data.students);
        }
      });
    fetch("/api/getUsers/teachers/getAllTeachers")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTeachers(data.teachers);
        }
      });
  }, []);
  return (
    <>
      <div className="">
        <h1 className="p-3 text-center text-2xl">Hello Admin</h1>
        <div className="flex h-full flex-col items-center justify-center gap-10">
          {/* list of HOD */}
          <div className="flex max-h-screen flex-col">
            <div className="overflow-x-auto">
              <h2 className="text-center text-xl">List of HOD</h2>
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-2">
                <div className="overflow-hidden">
                  <table className="text-surface min-w-full text-left text-sm font-light">
                    <thead className="dark:bg-body-dark border-b border-neutral-200 font-medium dark:border-white/10">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          #
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Department
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {hod.map((hod, index) => (
                        <tr
                          key={hod._id}
                          className={`border-b border-neutral-200 ${
                            index % 2 === 0
                              ? "bg-black/[0.02] dark:border-white/10"
                              : "dark:bg-body-dark bg-gray-light text-dark dark:border-white/10"
                          }`}
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {hod.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 uppercase">
                            {hod.department}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {hod.email}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {hod.isAdminApproved ? "Approved" : "Pending"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* List of Teachers */}
          <div className="flex max-h-96 flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <h2 className="text-center text-xl">List of Teachers</h2>
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="text-surface min-w-full text-left text-sm font-light">
                    <thead className="dark:bg-body-dark border-b border-neutral-200 font-medium dark:border-white/10">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          #
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Department
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers.map((teacher, index) => (
                        <tr
                          key={teacher._id}
                          className={`border-b border-neutral-200 ${
                            index % 2 === 0
                              ? "bg-black/[0.02] dark:border-white/10"
                              : "dark:bg-body-dark bg-gray-light text-dark dark:border-white/10"
                          }`}
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {teacher.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 uppercase">
                            {teacher.department}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {teacher.email}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {teacher.isAdminApproved ? "Approved" : "Pending"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* List of Students */}
          <div className="flex max-h-96 flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <h2 className="text-center text-xl">List of Students</h2>
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="text-surface min-w-full text-left text-sm font-light">
                    <thead className="dark:bg-body-dark border-b border-neutral-200 font-medium dark:border-white/10">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          #
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Department
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.map((student, index) => (
                        <tr
                          key={student._id}
                          className={`border-b border-neutral-200 ${
                            index % 2 === 0
                              ? "bg-black/[0.02] dark:border-white/10"
                              : "dark:bg-body-dark bg-gray-light text-dark dark:border-white/10"
                          }`}
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {student.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 uppercase">
                            {student.department}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {student.email}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {student.isAdminApproved ? "Approved" : "Pending"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default adminDashboard;
