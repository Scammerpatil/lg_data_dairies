"use client";
import NoticeCard from "@/components/Common/NoticeCard";
import { notice } from "@/types/notice";
import axios from "axios";
import { useEffect, useState } from "react";
import NoticeDialog from "../Dialogs/Notice";

let noticePromise: Promise<notice[]> | null = null;
let cachedNotice: notice[] | null = null;

const fetchNotice = (): notice[] => {
  if (cachedNotice) {
    return cachedNotice;
  }
  if (!noticePromise) {
    noticePromise = axios
      .get("http://localhost:3000/api/notices/getAllNotices")
      .then((res) => {
        cachedNotice = res.data.notices;
        return res.data.notices;
      });
  }
  throw noticePromise;
};

const TabNotices = () => {
  const notices = fetchNotice();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotice, setSelectedNotice] = useState<notice | null>(null);

  const indexOfLastNotice = currentPage * 9;
  const indexOfFirstNotice = indexOfLastNotice - 9;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);
  const totalPages = Math.ceil(notices.length / 9);
  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {notices &&
          currentNotices.map((notice: notice, index: number) => (
            <button
              key={index}
              onClick={() => {
                setSelectedNotice(notice);
                (
                  document.getElementById("noticeModal") as HTMLDialogElement
                )?.showModal();
              }}
            >
              <NoticeCard notice={notice} />
            </button>
          ))}
      </div>
      <div className="join grid grid-cols-2 mt-10">
        <button
          className="join-item btn btn-outline"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous page
        </button>
        <button
          className="join-item btn btn-outline"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      {selectedNotice && <NoticeDialog notice={selectedNotice} />}
    </div>
  );
};

export default TabNotices;
