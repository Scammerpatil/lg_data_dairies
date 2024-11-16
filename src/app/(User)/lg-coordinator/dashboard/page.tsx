"use client";
import DashboardSkeleton from "@/components/Common/DashboardSkeleton";
import { useUser } from "@/context/useAuth";
import { notice } from "@/types/notice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LGCoordinatorDashboard = () => {
  const { user } = useUser();
  const [teachersCount, setTeachersCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [notices, setNotices] = useState<notice[]>([]);
  const router = useRouter();
  if (!user) return <DashboardSkeleton />;
  useEffect(() => {
    const getData = async () => {
      const teachers = await axios.post(
        "/api/users/teachers/getTeacherByDepartment",
        {
          department: user.department,
        }
      );
      setTeachersCount(teachers.data.teachers.length);
      const students = await axios.post(
        "/api/users/students/getStudentsByDepartment",
        {
          department: user.department,
        }
      );
      setStudentsCount(students.data.students.length);
      const notices = await axios.get("/api/notices/getAllNotices");
      setNotices(notices.data.notices);
    };
    getData();
  }, [user]);
  return (
    <div className="min-h-screen bg-base-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-base-content">
          LG Coordinator!
        </h1>
        <p className="text-base-content">
          Here's an overview of your activities and tasks.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 bg-base-200 p-4 rounded-lg shadow-md h-72">
          <div className="text-center">
            <img
              src={user?.profileImageUrl}
              alt="HOD Avatar"
              className="mx-auto w-24 h-24 rounded-full shadow-md"
            />
            <h2 className="mt-4 text-xl font-semibold">Mr./Ms.{user?.name}</h2>
            <p className="text-sm text-gray-500">
              LG Co-ordinator of{" "}
              <span className="capitalize">{user.department}</span>
            </p>
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
                <p className="text-4xl font-bold">{studentsCount}</p>
              </div>
            </div>

            {/* Total Faculty */}
            <div className="card bg-secondary text-secondary-content">
              <div className="card-body">
                <h3 className="text-lg font-semibold">Total Faculty</h3>
                <p className="text-4xl font-bold">{teachersCount}</p>
              </div>
            </div>

            {/* Ongoing Projects */}
            <div className="card bg-accent text-accent-content">
              <div className="card-body">
                <h3 className="text-lg font-semibold">Ongoing Projects</h3>
                <p className="text-4xl font-bold">8</p>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-base-content">Upcoming Events</h2>
              <ul className="space-y-4">
                {notices.map((notice) => (
                  <li
                    className="flex items-center justify-between"
                    key={notice._id}
                  >
                    <span>{notice.title}</span>
                    <span className="badge badge-info">
                      {new Date(notice.validTill).toISOString().split("T")[0]}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className="btn btn-outline btn-primary mt-4 w-full"
                onClick={() => {
                  router.push("/hod/notices/view");
                }}
              >
                View All Events
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LGCoordinatorDashboard;
