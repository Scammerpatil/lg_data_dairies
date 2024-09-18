"use client";
import { Suspense } from "react";
import TabStudent from "../tables/TabStudent";
import TableSkeleton from "@/components/Common/TableSkeleton";

const ManageStudents = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center py-3">Manage Teachers</h1>
      <Suspense fallback={<TableSkeleton />}>
        <TabStudent fromStudentTab={true} />
      </Suspense>
    </>
  );
};

export default ManageStudents;
