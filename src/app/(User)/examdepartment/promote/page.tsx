import TableSkeleton from "@/components/Common/TableSkeleton";
import { Suspense } from "react";
import Promote from "./Promote";

const promote = () => {
  return (
    <div className="container">
      <h1 className="text-3xl text-center">Promote Students</h1>
      <Suspense fallback={<TableSkeleton />}>
        <Promote />
      </Suspense>
    </div>
  );
};

export default promote;
