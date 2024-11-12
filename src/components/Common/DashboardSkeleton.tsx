const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 animate-pulse">
      <header className="mb-6">
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 bg-white p-4 rounded-lg shadow-md">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-gray-300 rounded-full shadow-md"></div>
            <div className="mt-4 h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
            <div className="mt-2 h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>

          <div className="mt-6">
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="lg:col-span-9 grid gap-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Students */}
            <div className="card bg-gray-200">
              <div className="card-body">
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-400 rounded w-1/3"></div>
              </div>
            </div>

            {/* Total Faculty */}
            <div className="card bg-gray-200">
              <div className="card-body">
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-400 rounded w-1/3"></div>
              </div>
            </div>

            {/* Ongoing Projects */}
            <div className="card bg-gray-200">
              <div className="card-body">
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-400 rounded w-1/3"></div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="badge bg-gray-300 h-4 w-16"></div>
                </li>
                <li className="flex items-center justify-between">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="badge bg-gray-300 h-4 w-16"></div>
                </li>
                <li className="flex items-center justify-between">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="badge bg-gray-300 h-4 w-16"></div>
                </li>
              </ul>
              <div className="btn bg-gray-300 mt-4 h-10 w-full rounded"></div>
            </div>
          </div>

          {/* Announcements */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
              <ul className="space-y-4">
                <li>
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </li>
                <li>
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </li>
                <li>
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </li>
              </ul>
              <div className="btn bg-gray-300 mt-4 h-10 w-full rounded"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
