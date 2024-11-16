"use client";
import DashboardSkeleton from "@/components/Common/DashboardSkeleton";
import { useUser } from "@/context/useAuth";
import { Student } from "@/types/Student";
import { Teacher } from "@/types/Teacher";
import React from "react";

const TeacherDashboard = () => {
  const { user } = useUser();
  if (!user || !(user as Teacher)._id) return <DashboardSkeleton />;
  const teacher = user as Teacher;

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-base-content">
          Welcome, {teacher.name}!
        </h1>
        <p className="text-base-content">
          Here's an overview of your classes and activities.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-3 bg-base-200 p-4 rounded-lg shadow-md h-72">
          <div className="text-center">
            <img
              src={teacher.profileImageUrl}
              alt="Teacher Avatar"
              className="mx-auto w-24 h-24 rounded-full shadow-md"
            />
            <h2 className="mt-4 text-xl font-semibold">Prof. {teacher.name}</h2>
            <p className="text-sm text-base-content">Subject Specialist</p>
          </div>

          <div className="mt-6">
            <button className="btn btn-primary w-full">View Profile</button>
          </div>
        </aside>

        {/* Main Content */}
        <section className="lg:col-span-9 grid gap-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Students */}
            <div className="card bg-primary text-primary-content">
              <div className="card-body">
                <h3 className="text-lg font-semibold">Total Students</h3>
                <p className="text-4xl font-bold">
                  {teacher.studentUnder?.length || 0}
                </p>
              </div>
            </div>

            {/* Classes This Week */}
            <div className="card bg-secondary text-secondary-content">
              <div className="card-body">
                <h3 className="text-lg font-semibold">Classes This Week</h3>
                <p className="text-4xl font-bold">5</p>
              </div>
            </div>

            {/* Ongoing Projects */}
            <div className="card bg-accent text-accent-content">
              <div className="card-body">
                <h3 className="text-lg font-semibold">Ongoing Projects</h3>
                <p className="text-4xl font-bold">2</p>
              </div>
            </div>
          </div>

          {/* Students Under Supervision */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-base-content">
                Students Under Supervision
              </h2>
              <ul className="space-y-4">
                {teacher.studentUnder && teacher.studentUnder.length > 0 ? (
                  teacher.studentUnder.map(
                    (student: Student, index: number) => (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={student.profileImageUrl}
                            alt="Student Avatar"
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <h3 className="font-semibold">{student.name}</h3>
                            <p className="text-sm text-gray-500">
                              {student.email}
                            </p>
                          </div>
                        </div>
                        <button className="btn btn-outline btn-primary btn-sm">
                          View Profile
                        </button>
                      </li>
                    )
                  )
                ) : (
                  <p className="text-gray-500">
                    No students assigned currently.
                  </p>
                )}
              </ul>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-gray-700">Upcoming Events</h2>
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <span>Department Workshop</span>
                  <span className="badge badge-info">12th Nov</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Grading Deadline</span>
                  <span className="badge badge-info">18th Nov</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Parent-Teacher Meeting</span>
                  <span className="badge badge-info">22nd Nov</span>
                </li>
              </ul>
              <button className="btn btn-outline btn-primary mt-4 w-full">
                View All Events
              </button>
            </div>
          </div>

          {/* Recent Announcements */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-gray-700">Recent Announcements</h2>
              <ul className="space-y-4">
                <li>
                  <h3 className="font-semibold">Exam Schedule</h3>
                  <p className="text-sm text-gray-500">
                    Midterm exams are scheduled for next month.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold">New Grading Policies</h3>
                  <p className="text-sm text-gray-500">
                    Updates to grading policies for this semester.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold">Course Evaluation</h3>
                  <p className="text-sm text-gray-500">
                    Please complete the course evaluation survey.
                  </p>
                </li>
              </ul>
              <button className="btn btn-outline btn-primary mt-4 w-full">
                View All Announcements
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeacherDashboard;
