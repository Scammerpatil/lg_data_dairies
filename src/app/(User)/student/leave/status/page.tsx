"use client";
import React, { Suspense, useEffect, useState } from "react";
import TableSkeleton from "@/components/Common/TableSkeleton";
import LeaveTable from "./LeaveTable";
import { Student } from "@/types/Student";
import { emptyStudent } from "@/helper/emptyStudent";

const LeaveStatusPage = () => {
  const [student, setStudent] = useState<Student>(emptyStudent());

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("user") || "null");
    setStudent(student);
  }, []);

  return (
    <div className="bg-base p-4 w-full">
      <h1 className="mb-6 text-2xl font-semibold text-center">Leave Status</h1>
      <div className="w-full rounded-lg border border-base-300 bg-transparent p-8 shadow-lg">
        <Suspense fallback={<TableSkeleton />}>
          <LeaveTable student={student} />
        </Suspense>
      </div>
    </div>
  );
};

export default LeaveStatusPage;
