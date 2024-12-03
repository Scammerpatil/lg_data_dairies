"use client";
import React, { Suspense, useEffect, useState } from "react";
import TableSkeleton from "@/components/Common/TableSkeleton";
import LeaveTable from "./LeaveTable";
import { Student } from "@/types/Student";
import { emptyStudent } from "@/helper/emptyStudent";
import { useUser } from "@/context/useAuth";

const LeaveStatusPage = () => {
  const { user } = useUser() as unknown as Student;
  if (!user) return <TableSkeleton />;

  return (
    <div className="bg-base p-4 w-full">
      <h1 className="mb-6 text-2xl font-semibold text-center">Leave Status</h1>
      <div className="w-full rounded-lg border border-base-300 bg-transparent p-8 shadow-lg">
        <Suspense fallback={<TableSkeleton />}>
          <LeaveTable student={user} />
        </Suspense>
      </div>
    </div>
  );
};

export default LeaveStatusPage;
