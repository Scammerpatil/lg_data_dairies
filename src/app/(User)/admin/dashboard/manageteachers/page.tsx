"use client";
import { Suspense } from "react";
import TabTeacher from "../tables/TabTeacher";
import TableSkeleton from "@/components/Common/TableSkeleton";

const ManageTeachers = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center py-3">Manage Teachers</h1>
      <Suspense fallback={<TableSkeleton />}>
        <TabTeacher fromTeacherTab={true} />
      </Suspense>
    </>
  );
};

export default ManageTeachers;
