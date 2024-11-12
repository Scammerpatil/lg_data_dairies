import DashboardSkeleton from "@/components/Common/DashboardSkeleton";
import { useUser } from "@/context/useAuth";
import React from "react";

const HODDashboard = () => {
  const { user } = useUser();
  if (!user) return <DashboardSkeleton />;
  return (
    <div className="min-h-screen bg-base-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-base-content">
          Welcome, HOD!
        </h1>
        <p className="text-base-content">
          Here's an overview of your department.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 bg-base-200 p-4 rounded-lg shadow-md h-72">
          <div className="text-center">
            <img
              src={user.profileImageUrl}
              alt="HOD Avatar"
              className="mx-auto w-24 h-24 rounded-full shadow-md"
            />
            <h2 className="mt-4 text-xl font-semibold">Dr. {user.name}</h2>
            <p className="text-sm text-gray-500">Head of Computer Science</p>
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
                <p className="text-4xl font-bold">320</p>
              </div>
            </div>

            {/* Total Faculty */}
            <div className="card bg-secondary text-secondary-content">
              <div className="card-body">
                <h3 className="text-lg font-semibold">Total Faculty</h3>
                <p className="text-4xl font-bold">25</p>
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
              <h2 className="card-title text-gray-700">Upcoming Events</h2>
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <span>Department Meeting</span>
                  <span className="badge badge-info">10th Oct</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Research Symposium</span>
                  <span className="badge badge-info">15th Oct</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Faculty Workshop</span>
                  <span className="badge badge-info">20th Oct</span>
                </li>
              </ul>
              <button className="btn btn-outline btn-primary mt-4 w-full">
                View All Events
              </button>
            </div>
          </div>

          {/* Announcements */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-gray-700">Recent Announcements</h2>
              <ul className="space-y-4">
                <li>
                  <h3 className="font-semibold">New Course Approval</h3>
                  <p className="text-sm text-gray-500">
                    The AI course proposal has been approved.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold">Exam Schedule Released</h3>
                  <p className="text-sm text-gray-500">
                    Final exams are scheduled for next month.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold">Department Budget Updates</h3>
                  <p className="text-sm text-gray-500">
                    Budget for Q1 has been finalized.
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

export default HODDashboard;
