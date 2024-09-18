"use client";
import React, { Suspense } from "react";
import TabTeacher from "../../components/TabTeachers";
import TableSkeleton from "@/components/Common/TableSkeleton";

const ApproveLG = () => {
  return (
    <div className={`min-h-screen p-4`}>
      <h1 className="mb-4 text-2xl font-bold">Approve Local Guardians</h1>
      <Suspense fallback={<TableSkeleton />}>
        <TabTeacher />
      </Suspense>
    </div>
  );
};

export default ApproveLG;
