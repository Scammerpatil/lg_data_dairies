"use client";

import TableSkeleton from "@/components/Common/TableSkeleton";
import { User } from "@/types/user";
import { Suspense, useEffect, useState } from "react";
import Summary from "./Summary";

const SummaryReportPage = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "{}"));
  }, []);
  return (
    <div className="h-full w-full bg-transparent text-base-content">
      <h1 className="text-2xl text-center">Summary Report</h1>
      <Suspense fallback={<TableSkeleton />}>
        {user && <Summary user={user} />}
      </Suspense>
    </div>
  );
};

export default SummaryReportPage;
