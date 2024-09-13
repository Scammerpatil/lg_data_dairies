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

const StudentDashboard = () => {
  const [student, setStudent] = useState({
    _id: "",
    name: "",
    userName: "",
    department: "",
    prn: "",
    email: "",
    password: "",
    profileImageUrl: "",
    lgTeacher: "",
    personalDetails: {
      photo: "",
      mobileNumber: "",
      permanentAddress: "",
      gender: "",
      dob: "",
      bloodGroup: "",
      maritalStatus: "",
      nationality: "",
      category: "",
      domicile: "",
      religion: "",
      caste: "",
      hostel: {
        livingAtHostel: false,
        roomNumber: "",
        currentAddress: "",
      },
    },
    parentDetails: {
      father: {
        name: "",
        contactNumber: "",
        occupation: "",
        address: "",
        email: "",
      },
      mother: {
        name: "",
        contactNumber: "",
        occupation: "",
        address: "",
        email: "",
      },
    },
    bankDetails: {
      bankName: "",
      ifscCode: "",
      accountNumber: "",
    },
    academicDetails: {
      ssc: {
        instituteName: "",
        board: "",
        yearOfAdmission: "",
        yearOfPassing: "",
        marksObtained: "",
      },
      hsc: {
        instituteName: "",
        board: "",
        yearOfAdmission: "",
        yearOfPassing: "",
        marksObtained: "",
      },
      diploma: {
        instituteName: "",
        board: "",
        yearOfAdmission: "",
        yearOfPassing: "",
        marksObtained: "    ",
      },
      entranceExam: {
        name: "",
        marks: 0,
      },
    },
    engineeringDetails: {
      semesters: [
        {
          semesterNumber: 0,
          termTests: [],
          endSemesterMarks: 0,
          attendance: 0,
        },
      ],
    },
    portfolioDetails: {
      skills: [],
      competitions: [
        {
          name: "",
          result: "",
        },
      ],
      internships: [
        {
          companyName: "",
          duration: "",
          role: "",
        },
      ],
    },
    healthDetails: {
      majorHealthProblem: "",
      sufferingFrom: {
        name: "",
        date: "",
      },
      treatment: {
        doctorName: "",
        contactNumber: "",
      },
    },
  });

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("user"));
    setStudent(student);
  }, []);

  return (
    <div className="flex flex-wrap p-4">
      <Grid container spacing={4}>
        {/* Profile Card */}
        <Grid item xs={12} md={4} lg={12} className="w-full">
          <Card className="w-full rounded-lg border-2 border-white bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600 shadow-lg backdrop-blur-lg backdrop-filter dark:text-white">
            <CardMedia
              component="img"
              className="h-52 object-cover"
              image={student.profileImageUrl || "/images/profile.jpg"}
              title="Profile Image"
            />
            <CardContent className="p-4">
              <Typography variant="h5" component="h2" className="font-bold">
                {student.name}
              </Typography>
              <Typography className="mb-2 text-sm">
                PRN: {student.prn}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className="mb-4 text-xl capitalize"
              >
                {student.department}
              </Typography>
              <Button size="small" color="primary">
                View Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Academic Details Card */}
        <Grid item xs={12} md={4}>
          <Card className="rounded-lg bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600 shadow-lg backdrop-blur-lg backdrop-filter">
            <CardContent className="p-4">
              <Typography variant="h5" component="h2" className="font-bold">
                Academic Details
              </Typography>
              <Typography color="textSecondary" className="mb-2 text-sm">
                Current Semester:{" "}
                {student.academicDetails.diploma.yearOfPassing}
              </Typography>
              <Typography variant="body2" component="p" className="mb-4">
                CGPA: 8.5
              </Typography>
              <Button size="small" color="primary">
                View More
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance Card */}
        <Grid item xs={12} md={4}>
          <Card className="rounded-lg bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600 shadow-lg backdrop-blur-lg backdrop-filter">
            <CardContent className="p-4">
              <Typography variant="h5" component="h2" className="font-bold">
                Attendance
              </Typography>
              <Typography color="textSecondary" className="mb-2 text-sm">
                Current Month
              </Typography>
              <Typography variant="body2" component="p" className="mb-4">
                Attendance: 85%
              </Typography>
              <Button size="small" color="primary">
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications Card */}
        <Grid item xs={12} md={4}>
          <Card className="rounded-lg bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600 shadow-lg backdrop-blur-lg backdrop-filter">
            <CardContent className="p-4">
              <Typography variant="h5" component="h2" className="font-bold">
                Notifications
              </Typography>
              <Typography color="textSecondary" className="mb-2 text-sm">
                New notifications
              </Typography>
              <Typography variant="body2" component="p" className="mb-4">
                You have 3 new notifications.
              </Typography>
              <Button size="small" color="primary">
                View All
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events Card */}
        <Grid item xs={12} md={4}>
          <Card className="rounded-lg bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600 shadow-lg backdrop-blur-lg backdrop-filter">
            <CardContent className="p-4">
              <Typography variant="h5" component="h2" className="font-bold">
                Upcoming Events
              </Typography>
              <Typography color="textSecondary" className="mb-2 text-sm">
                College Fest
              </Typography>
              <Typography variant="body2" component="p" className="mb-4">
                Join the fun at the annual college fest. Don't miss out!
              </Typography>
              <Button size="small" color="primary">
                View All Events
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Additional Card Example */}
        <Grid item xs={12} md={4}>
          <Card className="rounded-lg bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600 shadow-lg backdrop-blur-lg backdrop-filter">
            <CardContent className="p-4">
              <Typography variant="h5" component="h2" className="font-bold">
                Additional Info
              </Typography>
              <Typography color="textSecondary" className="mb-2 text-sm">
                Details here
              </Typography>
              <Typography variant="body2" component="p" className="mb-4">
                More information can be placed here.
              </Typography>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default StudentDashboard;
