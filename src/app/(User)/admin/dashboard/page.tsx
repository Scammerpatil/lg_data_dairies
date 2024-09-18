"use client";
import { Suspense } from "react";
import TabHod from "./tables/TabHod";
import TabTeacher from "./tables/TabTeacher";
import TabStudent from "./tables/TabStudent";
import TableSkeleton from "@/components/Common/TableSkeleton";

const AdminDashboardPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center py-3">Admin Dashboard</h1>
      <div
        role="tablist"
        className="tabs tabs-lifted tabs-lg tabs-boxed overflow-x-auto"
      >
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="HOD"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <Suspense fallback={<TableSkeleton />}>
            <TabHod fromMangeHod={false} />
          </Suspense>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Teachers"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <Suspense fallback={<TableSkeleton />}>
            <TabTeacher fromTeacherTab={false} />
          </Suspense>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Students"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <Suspense fallback={<TableSkeleton />}>
            <TabStudent fromStudentTab={false} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
