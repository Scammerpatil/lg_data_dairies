"use client";

import TableSkeleton from "@/components/Common/TableSkeleton";
import { Suspense, useEffect, useState } from "react";
import Summary from "./Summary";
import { useUser } from "@/context/useAuth";
import DashboardSkeleton from "@/components/Common/DashboardSkeleton";
import { LGCoordinator } from "@/types/LgCoordinator";

const SummaryReportPage = () => {
  const { user } = useUser();
  if (!user) return <DashboardSkeleton />;
  return (
    <div className="h-full w-full bg-transparent text-base-content">
      <h1 className="text-2xl text-center">Summary Report</h1>
      <Suspense fallback={<TableSkeleton />}>
        {user && <Summary user={user as LGCoordinator} />}
      </Suspense>
    </div>
  );
};

export default SummaryReportPage;
