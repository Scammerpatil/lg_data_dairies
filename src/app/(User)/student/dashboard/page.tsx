"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/useAuth";
import DashboardSkeleton from "@/components/Common/DashboardSkeleton";
import { Semester, Student } from "@/types/Student";

const StudentDashboard = () => {
  const { user }: Student = useUser();

  if (!user) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-base-content">
          Welcome, {user.name || "Student"}!
        </h1>
        <p className="text-base-content">
          Here's an overview of your academic journey.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-3 bg-base-200 p-4 rounded-lg shadow-md h-72">
          <div className="text-center">
            <img
              src={user.profileImageUrl || "/default-avatar.png"}
              alt="Student Avatar"
              className="mx-auto w-24 h-24 rounded-full shadow-md"
            />
            <h2 className="mt-4 text-xl font-semibold">{user.name || "N/A"}</h2>
            <p className="text-sm text-base-content">
              PRN: {user.prn || "N/A"}
            </p>
            <p className="text-sm text-base-content">
              Program:{" "}
              <span className="capitalize">{user.department || "N/A"}</span>
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <section className="lg:col-span-9 grid gap-6">
          {/* Academic Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-primary text-primary-content">
              <div className="card-body">
                <h3 className="text-lg font-semibold">Current CGPA</h3>
                <p className="text-4xl font-bold">
                  {user.engineeringDetails.cgpa || "N/A"}
                </p>
              </div>
            </div>
            <div className="card bg-secondary text-secondary-content">
              <div className="card-body">
                <h3 className="text-lg font-semibold">Attendance</h3>
                <p className="text-4xl font-bold">
                  {user.engineeringDetails.attendance || "N/A"}%
                </p>
              </div>
            </div>
            <div className="card bg-accent text-accent-content">
              <div className="card-body">
                <h3 className="text-lg font-semibold">Total Credits</h3>
                <p className="text-4xl font-bold">
                  {user.engineeringDetails.totalCredits || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Semester Data */}
          <div className="card bg-base-300 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-base-content">Semester Data</h2>
              <ul className="space-y-4">
                {user.engineeringDetails.semesters.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {user.engineeringDetails.semesters.map(
                      (semester: Semester) => (
                        <div
                          key={semester.semesterNumber}
                          className="card bg-base-100 shadow-md"
                        >
                          <div className="card-body">
                            <h3 className="card-title text-lg font-semibold">
                              Semester {semester.semesterNumber}
                            </h3>
                            <p>
                              <strong>SGPA:</strong> {semester.sgpa || "N/A"}
                            </p>
                            <p>
                              <strong>CGPA:</strong> {semester.cgpa || "N/A"}
                            </p>
                            <p>
                              <strong>Attendance:</strong>{" "}
                              {semester.attendance || "N/A"}%
                            </p>
                            <p>
                              <strong>Total Credits:</strong>{" "}
                              {semester.totalCredits || "N/A"}
                            </p>
                            <div className="mt-4">
                              <h4 className="font-semibold">Subjects:</h4>
                              <ul className="list-disc ml-5">
                                {semester.subjects.map((subject) => (
                                  <li key={subject._id}>
                                    {subject.name} - {subject.endSemesterMarks}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">
                    No semester data available.
                  </p>
                )}
              </ul>
            </div>
          </div>

          {/* Personal Information */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-gray-700">Personal Information</h2>
              <p>
                <strong>Email:</strong> {user.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                {user.personalDetails?.mobileNumber || "N/A"}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {user.personalDetails?.permanentAddress || "N/A"}
              </p>
              <p>
                <strong>Gender:</strong> {user.personalDetails?.gender || "N/A"}
              </p>
              <p>
                <strong>DOB:</strong>{" "}
                {user.personalDetails?.dob
                  ? new Date(user.personalDetails?.dob).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Health Information */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-gray-700">
                Health & Emergency Info
              </h2>
              <p>
                <strong>Blood Group:</strong>{" "}
                {user.personalDetails?.bloodGroup || "N/A"}
              </p>
              <p>
                <strong>Health Issues:</strong>{" "}
                {user.healthDetails?.majorHealthProblem || "None"}
              </p>
              <p>
                <strong>Doctor's Contact:</strong>{" "}
                {user.healthDetails?.treatment?.contactNumber || "N/A"}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
