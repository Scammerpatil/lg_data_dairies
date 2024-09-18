"use client";
import { Suspense } from "react";
import TabHod from "../tables/TabHod";
import TableSkeleton from "@/components/Common/TableSkeleton";

const ManageHods = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center py-3">Manage HODs</h1>
      <Suspense fallback={<TableSkeleton />}>
        <TabHod fromMangeHod={true} />
      </Suspense>
    </>
  );
};

export default ManageHods;
