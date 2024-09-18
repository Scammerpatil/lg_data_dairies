"use client";
import TableSkeleton from "@/components/Common/TableSkeleton";
import { Suspense, useEffect, useState } from "react";
import AllStudent from "./AllStudent";
import { User } from "@/types/user";

const AssignStudentsPage = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <>
      <div className="h-full w-full bg-transparent text-base-content">
        <h1 className="text-2xl text-center">Here your can Assign LG</h1>
        <Suspense fallback={<TableSkeleton />}>
          {user && <AllStudent user={user} />}
        </Suspense>
      </div>
    </>
  );
};

export default AssignStudentsPage;
