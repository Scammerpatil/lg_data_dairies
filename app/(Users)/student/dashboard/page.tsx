"use client";
import React, { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [student, setStudent] = useState({
    name: "",
  });
  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("user"));
    setStudent(student);
  }, []);
  return (
    <div className="min-h-screen">
      <h1>Welcome,{student.name} </h1>
      <section>
        <h2>Upcoming Notices</h2> 
        <ul>
          <li>Notice 1</li>
          <li>Notice 2</li>
          <li>Notice 3</li>
        </ul>
      </section>
      <section>
        <h2>Academic Summary</h2>
        <p>Term Test Marks: 80%</p>
        <p>Overall Attendance: 90%</p>
      </section>
      <section>
        <h2>Quick Links</h2>
        <ul>
          <li>
            <a href="/student/details/view">View Personal Details</a>
          </li>
          <li>
            <a href="/student/leave/apply">Apply for Leave</a>
          </li>
          <li>
            <a href="/student/leave/status">Check Leave Status</a>
          </li>
        </ul>
      </section>
      <section>
        <h2>Recent Messages</h2>
        <ul>
          <li>Message from LG</li>
          <li>Message from Admin</li>
        </ul>
      </section>
    </div>
  );
}
