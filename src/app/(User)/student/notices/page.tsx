import CardSkeleton from "@/components/Common/CardSkeleton";
import TabNotices from "@/components/Common/TabNotices";
import { Suspense } from "react";

const StudentNoticePage = () => {
  return (
    <>
      <h1 className="text-2xl text-center mb-4">Your Notices</h1>
      <Suspense fallback={<CardSkeleton />}>
        <TabNotices />
      </Suspense>
    </>
  );
};

export default StudentNoticePage;
