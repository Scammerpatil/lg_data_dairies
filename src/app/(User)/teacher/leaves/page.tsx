"use client";
import React, { useState, useEffect, Suspense } from "react";
import TableSkeleton from "@/components/Common/TableSkeleton";
import LeaveTable from "./LeaveTable";
import { User } from "@/types/user";

const LeaveApplicationsPage = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user) {
      setUser(user);
    }
  }, []);
  return (
    <div className="bg-base p-4 w-full">
      <h1 className="mb-6 text-2xl font-semibold text-center">
        Leave Applications
      </h1>
      <div className="w-full rounded-lg border border-base-300 bg-transparent p-8 shadow-lg">
        <Suspense fallback={<TableSkeleton />}>
          {user && <LeaveTable user={user} />}
        </Suspense>
      </div>
    </div>
  );
};

export default LeaveApplicationsPage;
