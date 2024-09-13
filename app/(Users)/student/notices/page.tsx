"use client";
import NoticeCard from "@/components/dashboardComponents/NoticeCard";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 9;
  const [sortedNotices, setSortedNotices] = useState([]);

  useEffect(() => {
    setLoading(true);
    const response = axios.get("/api/notices/getAllNotices");
    toast.promise(response, {
      loading: "Loading",
      success: (data: any) => {
        setNotices(data.data.notices);
        setLoading(false);
        return "Notices loaded";
      },
      error: "Failed to load notices",
    });
  }, []);

  useEffect(() => {
    setSortedNotices(notices.sort((a, b) => b.isImportant - a.isImportant));
  }, [notices]);

  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = sortedNotices.slice(
    indexOfFirstNotice,
    indexOfLastNotice,
  );
  const totalPages = Math.ceil(sortedNotices.length / noticesPerPage);
  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-5">
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <div className="grid grid-cols-1 gap-32 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {currentNotices.map((notice) => (
              <NoticeCard
                key={notice._id}
                title={notice.title}
                description={notice.description}
                imageURL={notice.imageURL}
                author={notice.author}
                authorDepartment={notice.authorDepartment}
                createdAt={new Date(notice.createdAt)}
                tags={notice.tags}
                isImportant={notice.isImportant}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Button
              variant="contained"
              className="text-white"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="mx-4 flex items-center">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="contained"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default notices;
