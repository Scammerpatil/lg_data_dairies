"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const LeaveStatusPage: React.FC = () => {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("user") || "null");
    setStudent(student);
  }, []);

  useEffect(() => {
    if (student) {
      const fetchLeaves = async () => {
        setLoading(true);
        try {
          const response = await axios.post(
            "/api/leave/getAllLeaveForStudent",
            { studentId: student._id },
          );
          setLeaves(response.data);
        } catch (error) {
          toast.error("Error fetching leave status. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      fetchLeaves();
    }
  }, [student]);

  const handleDelete = async (leaveId: string) => {
    if (!window.confirm("Are you sure you want to delete this leave?")) return;
    try {
      await axios.delete(`/api/leave/delete`, { data: { leaveId } });
      setLeaves((prevLeaves) =>
        prevLeaves.filter((leave) => leave._id !== leaveId),
      );
      toast.success("Leave deleted successfully.");
    } catch (error) {
      toast.error("Error deleting leave. Please try again.");
    }
  };

  return (
    <div className="bg-light-gray dark:bg-dark-gray flex h-screen items-center justify-center p-4">
      <div className="dark:bg-dark-gray w-full max-w-4xl rounded-lg border border-gray-200 bg-transparent p-8 shadow-lg dark:border-gray-700 dark:text-white">
        <h1 className="mb-6 text-2xl font-semibold">Leave Status</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : leaves.length > 0 ? (
          <table className="dark:bg-dark-gray min-w-full bg-transparent">
            <thead>
              <tr>
                <th className="border-b px-6 py-3 text-left text-gray-700 dark:text-gray-300">
                  Leave Type
                </th>
                <th className="border-b px-6 py-3 text-left text-gray-700 dark:text-gray-300">
                  Start Date
                </th>
                <th className="border-b px-6 py-3 text-left text-gray-700 dark:text-gray-300">
                  End Date
                </th>
                <th className="border-b px-6 py-3 text-left text-gray-700 dark:text-gray-300">
                  Reason
                </th>
                <th className="border-b px-6 py-3 text-left text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="border-b px-6 py-3 text-left text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave._id}>
                  <td className="border-b px-6 py-4 dark:text-white">
                    {leave.leaveType}
                  </td>
                  <td className="border-b px-6 py-4 dark:text-white">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td className="border-b px-6 py-4 dark:text-white">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="border-b px-6 py-4 dark:text-white">
                    {leave.reason}
                  </td>
                  <td className="border-b px-6 py-4 dark:text-white">
                    {leave.status}
                  </td>
                  <td className="border-b px-6 py-4 dark:text-white">
                    <button
                      onClick={() => handleDelete(leave._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center dark:text-white">No leave records found.</p>
        )}
      </div>
    </div>
  );
};

export default LeaveStatusPage;
