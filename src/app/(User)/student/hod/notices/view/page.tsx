"use client";
import CardSkeleton from "@/components/Common/CardSkeleton";
import React, { Suspense } from "react";
import TabNotices from "@/components/Common/TabNotices";

const viewNotices = () => {
  return (
    <>
      <h1 className="text-2xl text-center mb-4">Your Notices</h1>
      <Suspense fallback={<CardSkeleton />}>
        <TabNotices />
      </Suspense>
    </>
  );
};

export default viewNotices;
