"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import LeaveApplication from "../components/LeaveApplication";
import toast from "react-hot-toast";

const LeaveApplicationsPage = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchApplications = async () => {
      try {
        const response = await axios.post("/api/leave/getAllLeaveForLG", {
          _id: user._id,
        });
        setApplications(response.data.applications);
      } catch (error) {
        console.error("Error fetching leave applications:", error);
      }
    };
    fetchApplications();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = axios.put("/api/leave/updateLeave", {
        id,
        status: newStatus,
      });
      toast.promise(response, {
        loading: "Updating leave application status...",
        success: "Leave application status updated successfully.",
        error: "Error updating leave application status.",
      });
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app,
        ),
      );
    } catch (error) {
      console.error("Error updating leave application status:", error);
    }
  };
  if (applications.length === 0) return <p>No leave applications found.</p>;
  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-5 text-3xl font-bold">Leave Applications</h1>
      {applications.length > 0 ? (
        applications.map((application) => (
          <LeaveApplication
            key={application._id}
            application={application}
            onStatusChange={handleStatusChange}
          />
        ))
      ) : (
        <h1 className="mt-5 text-3xl font-bold">
          No Leave Application Available
        </h1>
      )}
    </div>
  );
};

export default LeaveApplicationsPage;
