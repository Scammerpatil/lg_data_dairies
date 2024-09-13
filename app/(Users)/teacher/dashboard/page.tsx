"use client";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";

const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    department: "",
    studentUnder: [],
    profileImageUrl: "",
    role: "",
    isVerified: false,
    isAdminApproved: false,
    isLG: false,
  });

  useEffect(() => {
    const storedTeacher = JSON.parse(localStorage.getItem("user"));
    if (storedTeacher) {
      setTeacher({
        name: storedTeacher.name || "",
        email: storedTeacher.email || "",
        department: storedTeacher.department || "",
        studentUnder: storedTeacher.studentUnder || [],
        profileImageUrl: storedTeacher.profileImageUrl || "",
        role: storedTeacher.role || "",
        isVerified: storedTeacher.isVerified || false,
        isAdminApproved: storedTeacher.isAdminApproved || false,
        isLG: storedTeacher.isLG || false,
      });
    }
  }, []);

  // Ensure that teacher state is updated before rendering
  if (!teacher.isAdminApproved || !teacher.isVerified) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Typography variant="h4" component="h2" className="font-bold">
          You are not authorized to view this page.
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap p-4">
      <Grid container spacing={4}>
        {/* Profile Card */}
        <Grid item xs={12} md={4} lg={12} className="w-full">
          <Card className="w-full rounded-lg border-2 border-white bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 shadow-lg backdrop-blur-lg backdrop-filter dark:text-white">
            <CardMedia
              component="img"
              className="h-52 object-cover"
              image={
                teacher.profileImageUrl ||
                "https://previews.123rf.com/images/singpentinkhappy/singpentinkhappy2010/singpentinkhappy201002973/158281296-colorful-abstract-banner-template-with-dummy-text-for-website-design-landing-page-and-print-material.jpg"
              }
              title="Profile Image"
            />
            <CardContent className="p-4">
              <Typography variant="h5" component="h2" className="font-bold">
                {teacher.name}
              </Typography>
              <Typography className="mb-2 text-sm">
                Email: {teacher.email}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className="mb-4 text-xl capitalize"
              >
                Department: {teacher.department}
              </Typography>
              <Button size="small" color="primary">
                View Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Students Supervised Card */}
        <Grid item xs={12} md={4}>
          <Card className="rounded-lg bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 shadow-lg backdrop-blur-lg backdrop-filter">
            <CardContent className="p-4">
              <Typography variant="h5" component="h2" className="font-bold">
                Students Supervised
              </Typography>
              <Typography color="textSecondary" className="mb-2 text-sm">
                Total Students: {teacher.studentUnder.length}
              </Typography>
              <Typography variant="body2" component="p" className="mb-4">
                {teacher.studentUnder.length > 0 ? (
                  <ul>
                    {teacher.studentUnder.map((studentId, index) => (
                      <li key={index}>Student ID: {studentId.name}</li> // Ensure studentId is a string
                    ))}
                  </ul>
                ) : (
                  "No students assigned"
                )}
              </Typography>
              <Button size="small" color="primary">
                View Students
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Role & Status Card */}
        <Grid item xs={12} md={4}>
          <Card className="rounded-lg bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 shadow-lg backdrop-blur-lg backdrop-filter">
            <CardContent className="p-4">
              <Typography variant="h5" component="h2" className="font-bold">
                Role & Status
              </Typography>
              <Typography color="textSecondary" className="mb-2 text-sm">
                Role: {teacher.role}
              </Typography>
              <Typography color="textSecondary" className="mb-2 text-sm">
                Verified: {teacher.isVerified ? "Yes" : "No"}
              </Typography>
              <Typography color="textSecondary" className="mb-2 text-sm">
                Admin Approved: {teacher.isAdminApproved ? "Yes" : "No"}
              </Typography>
              <Typography color="textSecondary" className="mb-2 text-sm">
                LG Status: {teacher.isLG ? "Yes" : "No"}
              </Typography>
              <Button size="small" color="primary">
                Update Status
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications Card */}
        <Grid item xs={12} md={4}>
          <Card className="rounded-lg bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 shadow-lg backdrop-blur-lg backdrop-filter">
            <CardContent className="p-4">
              <Typography variant="h5" component="h2" className="font-bold">
                Notifications
              </Typography>
              <Typography color="textSecondary" className="mb-2 text-sm">
                New notifications
              </Typography>
              <Typography variant="body2" component="p" className="mb-4">
                You have 2 new notifications.
              </Typography>
              <Button size="small" color="primary">
                View All
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default TeacherDashboard;
