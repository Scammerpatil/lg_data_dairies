"use client";
import { useUser } from "@/context/useAuth";
import { Student } from "@/types/Student";
import { Teacher } from "@/types/Teacher";
import React from "react";

const attendancePage = () => {
  const { user } = useUser() as unknown as Teacher;
  if (!user) return null;
  console.log(user);
  return (
    <>
      {user.studentUnder.map((student: Student) => {
        <p>{student.name}</p>;
      })}
    </>
  );
};

export default attendancePage;
