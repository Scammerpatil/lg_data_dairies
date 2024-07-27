"use client";
import axios from "axios";
import { Delete } from "lucide-react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/getUsers/teachers/getAllTeachers")
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data.teachers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
        setLoading(false);
      });
  }, []);

  const handleApprovalChange = async (_id: any, value: any, email: String) => {
    const response = axios.put("/api/getUsers/teachers/updateTeacher", {
      _id,
      isApproved: value === "Approved",
    });
    toast.promise(response, {
      loading: "Updating Teacher...",
      success: "Teacher Updated Successfully",
      error: "Error Updating Teacher",
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
    } catch (error) {}
  };

  const handleDelete = (_id) => {
    const response = axios.delete("/api/getUsers/teachers/deleteTeacher", {
      data: { _id },
    });
    toast.promise(response, {
      loading: "Deleting Teacher...",
      success: "Teacher Deleted Successfully",
      error: "Error Deleting Teacher",
    });
  };

  return (
    <div className="h-full">
      {loading && <div>Loading...</div>}
      <h1 className="pt-10 text-center text-3xl">Manage Your Teachers</h1>
      <div className="flex max-h-96 flex-col p-10">
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
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Approve
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.length > 0 ? (
                    teachers.map((teacher, index) => (
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
                        <td className="whitespace-nowrap px-6 py-4">
                          {teacher.email}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="relative h-10 w-72 min-w-[200px]">
                            <select
                              className="h-full w-full border-zinc-200 border-x-white bg-transparent px-4"
                              value={
                                teacher.isAdminApproved ? "Approved" : "Pending"
                              }
                              onChange={(e) =>
                                handleApprovalChange(
                                  teacher._id,
                                  e.target.value,
                                  teacher.email,
                                )
                              }
                            >
                              <option value="Pending">Pending</option>
                              <option value="Approved">Approved</option>
                            </select>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <button
                            className="flex items-center justify-center gap-5 rounded bg-red-500 px-4 py-2 text-white"
                            onClick={() => handleDelete(teacher._id)}
                          >
                            <Delete /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="whitespace-nowrap px-6 py-4 text-center text-red-500"
                      >
                        No Teacher Registered
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTeachers;
