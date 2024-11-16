"use client";
import TableSkeleton from "@/components/Common/TableSkeleton";
import { Suspense, useEffect, useState } from "react";
import ALLLG from "./ALLg";
import { useUser } from "@/context/useAuth";
import DashboardSkeleton from "@/components/Common/DashboardSkeleton";

const LgList = () => {
  const { user } = useUser();
  if (!user) return <DashboardSkeleton />;
  return (
    <div className="h-full w-full bg-transparent text-base-content">
      <h1 className="text-2xl text-center">Here your can Assign LG</h1>
      <Suspense fallback={<TableSkeleton />}>
        {user && <ALLLG user={user} />}
      </Suspense>
    </div>
  );
};

export default LgList;
