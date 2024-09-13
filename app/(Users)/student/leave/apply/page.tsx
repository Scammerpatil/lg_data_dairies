"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const leaveTypes = [
  { value: "Sick", label: "Sick Leave" },
  { value: "Casual", label: "Casual Leave" },
  { value: "Academic", label: "Academic Leave" },
  { value: "onDuty", label: "On Duty Leave" },
  { value: "Other", label: "Other" },
];

const LeaveApplicationPage: React.FC = () => {
  const [leaveType, setLeaveType] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("user") || "null");
    setStudent(student);
  }, []);

  const handleApplyLeave = async () => {
    if (!leaveType || !startDate || !endDate || !reason.trim()) {
      toast.error("Please fill in all the fields.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("End date should be after the start date.");
      return;
    }

    // Prepare data
    const leaveData = {
      studentId: student._id,
      teacherId: student.lgTeacher,
      leaveType,
      startDate,
      endDate,
      reason,
    };

    try {
      setLoading(true);
      const response = axios.post("/api/leave/apply", leaveData);
      toast.promise(response, {
        loading: "Applying for leave...",
        success: () => {
          setLoading(false);
          return "Leave applied successfully";
        },
        error: "Error applying for leave. Please try again.",
      });
    } catch (error) {
      toast.error("Error applying for leave. Please try again.");
      console.error("Error applying for leave:", error);
    }
  };

  return (
    <div className="bg-light-gray dark:bg-dark-gray flex h-screen items-center justify-center p-4">
      <div className="dark:bg-dark-gray w-full max-w-lg rounded-lg border border-gray-200  p-8 shadow-lg dark:border-gray-700 dark:text-white">
        <h1 className="mb-6 text-2xl font-semibold">Apply for Leave</h1>
        <form noValidate autoComplete="off" className="dark:text-white">
          <div className="mb-4">
            <label
              htmlFor="leaveType"
              className="mb-2 block text-gray-700 dark:text-gray-300"
            >
              Leave Type
            </label>
            <select
              id="leaveType"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="dark:bg-dark-gray w-full rounded-md border border-gray-300 bg-transparent p-2 dark:border-gray-600"
              required
            >
              <option value="">Select Leave Type</option>
              {leaveTypes.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="text-dark"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="mb-2 block text-gray-700 dark:text-gray-300"
            >
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="dark:bg-dark-gray w-full rounded-md border border-gray-300 bg-transparent p-2 dark:border-gray-600"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="mb-2 block text-gray-700 dark:text-gray-300"
            >
              End Date
            </label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="dark:bg-dark-gray w-full rounded-md border border-gray-300 bg-transparent p-2 dark:border-gray-600"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="reason"
              className="mb-2 block text-gray-700 dark:text-gray-300"
            >
              Reason
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="dark:bg-dark-gray w-full rounded-md border border-gray-300 bg-transparent p-2 dark:border-gray-600"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="button"
              onClick={handleApplyLeave}
              className="w-full rounded-md bg-blue-600 p-2 text-white shadow-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              {loading ? "Applying..." : "Apply For Leave"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveApplicationPage;
