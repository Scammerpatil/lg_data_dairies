"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Student } from "@/types/Student";
import { useUser } from "@/context/useAuth";

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
  const { user } = useUser() as unknown as Student;

  const handleApplyLeave = async () => {
    if (!leaveType || !startDate || !endDate || !reason.trim()) {
      toast.error("Please fill in all the fields.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("End date should be after the start date.");
      return;
    }
    if (user.lgTeacher?._id === undefined) {
      toast.error("You don't have a teacher assigned. Please contact admin.");
      return;
    }

    // Prepare data
    const leaveData = {
      studentId: user._id,
      teacherId: user.lgTeacher?._id,
      leaveType,
      startDate,
      endDate,
      reason,
    };
    try {
      const response = axios.post("/api/leave/apply", leaveData);
      toast.promise(response, {
        loading: "Applying for leave...",
        success: () => {
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
    <div className="bg-base dark:bg-dark-gray flex items-center justify-center">
      <div className=" w-full max-w-lg rounded-lg border p-8 shadow-lg bg-base-300">
        <h1 className="mb-6 text-2xl font-semibold text-center">
          Apply for Leave
        </h1>
        <form noValidate autoComplete="off">
          <div className="mb-4">
            <label htmlFor="leaveType" className="form-control w-full my-2">
              Leave Type
              <select
                id="leaveType"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="input input-bordered w-full bg-base-200"
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
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="form-control w-full my-2">
              Start Date
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input input-bordered w-full bg-base-200"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="endDate" className="form-control w-full my-2">
              End Date
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input input-bordered w-full bg-base-200"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="reason" className="form-control w-full my-2">
              Reason
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                className="input input-bordered w-full bg-base-200 h-28 p-2 px-2"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <button
              type="button"
              onClick={handleApplyLeave}
              className="w-full rounded-md bg-blue-600 p-2 text-white shadow-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Apply For Leave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveApplicationPage;
