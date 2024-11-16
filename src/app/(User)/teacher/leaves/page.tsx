"use client";
import React, { useState, useEffect, Suspense } from "react";
import TableSkeleton from "@/components/Common/TableSkeleton";
import LeaveTable from "./LeaveTable";
import { useUser } from "@/context/useAuth";
import DashboardSkeleton from "@/components/Common/DashboardSkeleton";
import { Teacher } from "@/types/Teacher";

const LeaveApplicationsPage = () => {
  const { user } = useUser();
  if (!user) return <DashboardSkeleton />;
  return (
    <div className="bg-base p-4 w-full">
      <h1 className="mb-6 text-2xl font-semibold text-center">
        Leave Applications
      </h1>
      <div className="w-full rounded-lg border border-base-300 bg-transparent p-8 shadow-lg">
        <Suspense fallback={<TableSkeleton />}>
          {user && <LeaveTable user={user as Teacher} />}
        </Suspense>
      </div>
    </div>
  );
};

export default LeaveApplicationsPage;
