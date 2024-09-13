"use client";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  styled,
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Button,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

const ImgStyled = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));

function TabAccount() {
  const [editMode, setEditMode] = useState(true);
  const [student, setStudent] = useState({
    _id: "",
    name: "",
    userName: "",
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
  const [imgSrc, setImgSrc] = useState<string>();
  const [nationalities, setNationalities] = useState<string[]>([]);
  const [bloodGroups, setBloodGroups] = useState<string[]>([]);
  const [gender, setGender] = useState<string[]>([]);
  const [maritalStatus, setmaritalStatus] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<File>();
  const [loading, setLoading] = useState<boolean>();
  const fileInput = useRef();
  const [livingAtHostel, setLivingAtHostel] = useState(
    student?.personalDetails?.hostel?.livingAtHostel || false,
  );
  useEffect(() => {
    if (student?.personalDetails?.hostel?.livingAtHostel) {
      setLivingAtHostel(true);
    } else {
      setLivingAtHostel(false);
    }
  }, [student?.personalDetails?.hostel?.livingAtHostel]);

  useEffect(() => {
    const studentData = JSON.parse(localStorage.getItem("user") || "{}");
    setImgSrc(student.profileImageUrl);
    setStudent({
      _id: studentData._id || "",
      name: studentData.name || "",
      userName: studentData.userName || "",
      prn: studentData.prn || "",
      email: studentData.email || "",
      password: studentData.password || "",
      profileImageUrl: studentData.profileImageUrl || "",
      lgTeacher: studentData.lgTeacher || "",
      personalDetails: {
        photo: studentData.personalDetails?.photo || "",
        mobileNumber: studentData.personalDetails?.mobileNumber || "",
        permanentAddress: studentData.personalDetails?.permanentAddress || "",
        gender: studentData.personalDetails?.gender || "",
        dob: studentData.personalDetails?.dob || "",
        bloodGroup: studentData.personalDetails?.bloodGroup || "",
        maritalStatus: studentData.personalDetails?.maritalStatus || "",
        nationality: studentData.personalDetails?.nationality || "",
        category: studentData.personalDetails?.category || "",
        domicile: studentData.personalDetails?.domicile || "",
        religion: studentData.personalDetails?.religion || "",
        caste: studentData.personalDetails?.caste || "",
        hostel: {
          livingAtHostel:
            studentData.personalDetails?.hostel?.livingAtHostel || false,
          roomNumber: studentData.personalDetails?.hostel?.roomNumber || "",
          currentAddress:
            studentData.personalDetails?.hostel?.currentAddress || "",
        },
      },
      parentDetails: {
        father: {
          name: studentData.parentDetails?.father?.name || "",
          contactNumber: studentData.parentDetails?.father?.contactNumber || "",
          occupation: studentData.parentDetails?.father?.occupation || "",
          address: studentData.parentDetails?.father?.address || "",
          email: studentData.parentDetails?.father?.email || "",
        },
        mother: {
          name: studentData.parentDetails?.mother?.name || "",
          contactNumber: studentData.parentDetails?.mother?.contactNumber || "",
          occupation: studentData.parentDetails?.mother?.occupation || "",
          address: studentData.parentDetails?.mother?.address || "",
          email: studentData.parentDetails?.mother?.email || "",
        },
      },
      bankDetails: {
        bankName: studentData.bankDetails?.bankName || "",
        ifscCode: studentData.bankDetails?.ifscCode || "",
        accountNumber: studentData.bankDetails?.accountNumber || "",
      },
      academicDetails: {
        ssc: {
          instituteName: studentData.academicDetails?.ssc?.instituteName || "",
          board: studentData.academicDetails?.ssc?.board || "",
          yearOfAdmission:
            studentData.academicDetails?.ssc?.yearOfAdmission || "",
          yearOfPassing: studentData.academicDetails?.ssc?.yearOfPassing || "",
          marksObtained: studentData.academicDetails?.ssc?.marksObtained || "",
        },
        hsc: {
          instituteName: studentData.academicDetails?.hsc?.instituteName || "",
          board: studentData.academicDetails?.hsc?.board || "",
          yearOfAdmission:
            studentData.academicDetails?.hsc?.yearOfAdmission || "",
          yearOfPassing: studentData.academicDetails?.hsc?.yearOfPassing || "",
          marksObtained: studentData.academicDetails?.hsc?.marksObtained || "",
        },
        diploma: {
          instituteName:
            studentData.academicDetails?.diploma?.instituteName || "",
          board: studentData.academicDetails?.diploma?.board || "",
          yearOfAdmission:
            studentData.academicDetails?.diploma?.yearOfAdmission || "",
          yearOfPassing:
            studentData.academicDetails?.diploma?.yearOfPassing || "",
          marksObtained:
            studentData.academicDetails?.diploma?.marksObtained || "",
        },
        entranceExam: {
          name: studentData.academicDetails?.entranceExam?.name || "",
          marks: studentData.academicDetails?.entranceExam?.marks || 0,
        },
      },
      engineeringDetails: {
        semesters: studentData.engineeringDetails?.semesters || [
          {
            semesterNumber: 0,
            termTests: [],
            endSemesterMarks: 0,
            attendance: 0,
          },
        ],
      },
      portfolioDetails: {
        skills: studentData.portfolioDetails?.skills || [],
        competitions: studentData.portfolioDetails?.competitions || [
          {
            name: "",
            result: "",
          },
        ],
        internships: studentData.portfolioDetails?.internships || [
          {
            companyName: "",
            duration: "",
            role: "",
          },
        ],
      },
      healthDetails: {
        majorHealthProblem: studentData.healthDetails?.majorHealthProblem || "",
        sufferingFrom: {
          name: studentData.healthDetails?.sufferingFrom?.name || "",
          date: studentData.healthDetails?.sufferingFrom?.date || "",
        },
        treatment: {
          doctorName: studentData.healthDetails?.treatment?.doctorName || "",
          contactNumber:
            studentData.healthDetails?.treatment?.contactNumber || "",
        },
      },
    });
    setNationalities(["American", "Indian", "Canadian", "British", "Other"]);
    setBloodGroups(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]);
    setGender(["Male", "Female", "Other"]);
    setmaritalStatus(["Married", "UnMarried"]);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      setProfileImage(e.target?.files[0]);
      reader.onload = (e) => setImgSrc(e.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUploadImage = async () => {
    if (profileImage) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", profileImage);
      formData.append("folder", "profileImage/student");
      const response = axios.post("/api/upload-img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.promise(response, {
        loading: "Uploading image...",
        success: (result: any) => {
          setStudent((prevState) => ({
            ...prevState,
            profileImageUrl: result.data.data.secure_url,
          }));
          setLoading(false);
          return "Image uploaded successfully!";
        },
        error: (error) => {
          setLoading(false);
          return "An error occurred while uploading the image.";
        },
      });
    }
  };

  const handleSave = async () => {
    const errors = [];
    if (!student.name.trim()) {
      errors.push("Name is required.");
    }
    const userNamePattern = /^[^\s][^\s]*$/; // No spaces allowed
    if (!userNamePattern.test(student.userName)) {
      errors.push("Username is required and cannot contain spaces.");
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(student.email)) {
      errors.push("Invalid email address.");
    }
    if (!student.password.trim()) {
      errors.push("Password is required.");
    }
    const mobilePattern = /^[0-9]{10}$/;
    if (
      !student.personalDetails.mobileNumber ||
      !mobilePattern.test(student.personalDetails.mobileNumber)
    ) {
      errors.push("Invalid mobile number. It should be 10 digits.");
    }
    const validateDate = (date: string) => !isNaN(Date.parse(date));
    if (!validateDate(student.personalDetails.dob)) {
      errors.push("Invalid date of birth.");
    }
    if (student.personalDetails.hostel.livingAtHostel) {
      if (!student.personalDetails.hostel.roomNumber.trim()) {
        errors.push("Room number is required when living at hostel.");
      }
    } else {
      if (!student.personalDetails.hostel.currentAddress.trim()) {
        errors.push("Current address is required when not living at hostel.");
      }
    }
    const validateYear = (year: string) => /^\d{4}$/.test(year);
    const academicFields = ["ssc", "hsc", "diploma"];

    academicFields.forEach((field) => {
      if (student.academicDetails[field]) {
        if (
          student.academicDetails[field].yearOfAdmission &&
          !validateYear(student.academicDetails[field].yearOfAdmission)
        ) {
          errors.push(`Invalid year of admission for ${field}.`);
        }
        if (
          student.academicDetails[field].yearOfPassing &&
          !validateYear(student.academicDetails[field].yearOfPassing)
        ) {
          errors.push(`Invalid year of passing for ${field}.`);
        }
        if (
          student.academicDetails[field].marksObtained &&
          isNaN(student.academicDetails[field].marksObtained)
        ) {
          errors.push(`Marks obtained for ${field} should be a number.`);
        }
      }
    });

    // Check if there are any errors
    if (errors.length > 0) {
      toast.error(errors.join(" "));
      return;
    }

    // Proceed with save operation
    try {
      const studentResponse = axios.put(
        "/api/getUsers/students/updateAllDetails",
        { student, _id: student._id },
      );
      toast.promise(studentResponse, {
        loading: "Updating Student...",
        success: (response) => {
          console.log(response);
          localStorage.setItem("user", JSON.stringify(response.data.student));
          return "Student updated successfully.";
        },
        error: "Error updating student.",
      });
    } catch (error) {
      console.error("Error saving student data:", error);
    }
  };

  return (
    <div className="w-full">
      <CardContent className="w-full bg-transparent dark:text-white">
        <form>
          <Grid container className="flex flex-col gap-5">
            <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ImgStyled
                  src={imgSrc || student.profileImageUrl}
                  alt="Profile Pic"
                />
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => fileInput.current?.click()}
                  >
                    Select File
                  </Button>
                  <input
                    ref={fileInput}
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleUploadImage}
                    disabled={loading || !profileImage}
                    sx={{ ml: 4 }}
                  >
                    {loading ? "Uploading..." : "Upload Image"}
                  </Button>
                  <ResetButtonStyled
                    color="error"
                    variant="outlined"
                    onClick={() =>
                      setImgSrc(
                        student.profileImageUrl ||
                          "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
                      )
                    }
                  >
                    Reset
                  </ResetButtonStyled>
                  <Typography variant="body2" sx={{ marginTop: 5 }}>
                    Allowed PNG or JPEG. Max size of 800K.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Divider className="my-4 w-full bg-gray-500" />

            {/* Basic Details Section */}
            <Grid className="flex flex-col gap-5">
              <Grid className="flex gap-10">
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Username"
                    fullWidth
                    required
                    disabled={editMode}
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                    value={student?.userName || ""}
                    onChange={(e) => {
                      setStudent({ ...student, userName: e.target.value });
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    fullWidth
                    required
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                    disabled={true}
                    value={student?.name || ""}
                    onChange={(e) =>
                      setStudent({ ...student, name: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
              <Grid className="flex gap-10">
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    fullWidth
                    required
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                    disabled={true}
                    value={student?.email || ""}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="PRN"
                    fullWidth
                    required
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                    disabled={true}
                    value={student?.prn || ""}
                    onChange={(e) =>
                      setStudent({ ...student, prn: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            <Divider className="my-4 w-full bg-gray-500" />

            {/* Personal Details Section */}
            <Typography variant="h6" className="-mb-8">
              Personal Details
            </Typography>
            <br />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mobile Number"
                  fullWidth
                  required
                  disabled={editMode}
                  value={student?.personalDetails?.mobileNumber || ""}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      personalDetails: {
                        ...student.personalDetails,
                        mobileNumber: e.target.value,
                      },
                    })
                  }
                  InputProps={{
                    className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                  }}
                  InputLabelProps={{
                    className:
                      "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                  }}
                  className="rounded-md"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Permanent Address"
                  fullWidth
                  required
                  disabled={editMode}
                  value={student?.personalDetails?.permanentAddress || ""}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      personalDetails: {
                        ...student.personalDetails,
                        permanentAddress: e.target.value,
                      },
                    })
                  }
                  InputProps={{
                    className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                  }}
                  InputLabelProps={{
                    className:
                      "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                  }}
                  className="rounded-md"
                />
              </Grid>

              {/* Group 2 */}

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className="rounded-md">
                  <InputLabel className="dark:text-white">Gender</InputLabel>
                  <Select
                    value={student?.personalDetails?.gender || ""}
                    disabled={editMode}
                    fullWidth
                    SelectDisplayProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    className="rounded-md"
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        personalDetails: {
                          ...student.personalDetails,
                          gender: e.target.value,
                        },
                      })
                    }
                  >
                    {gender.map((bg) => (
                      <MenuItem key={bg} value={bg}>
                        {bg}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  required
                  disabled={editMode}
                  value={
                    student?.personalDetails?.dob
                      ? new Date(student.personalDetails.dob)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      personalDetails: {
                        ...student.personalDetails,
                        dob: e.target.value,
                      },
                    })
                  }
                  InputProps={{
                    className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                  }}
                  InputLabelProps={{
                    className:
                      "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                  }}
                  className="rounded-md"
                />
              </Grid>

              {/* Group 3 */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className="rounded-md">
                  <InputLabel className="dark:text-white">
                    Blood Group
                  </InputLabel>
                  <Select
                    value={student?.personalDetails?.bloodGroup || ""}
                    disabled={editMode}
                    SelectDisplayProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    className="rounded-md"
                    fullWidth
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        personalDetails: {
                          ...student.personalDetails,
                          bloodGroup: e.target.value,
                        },
                      })
                    }
                  >
                    {bloodGroups.map((bg) => (
                      <MenuItem key={bg} value={bg}>
                        {bg}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className="rounded-md">
                  <InputLabel className="dark:text-white">
                    Martial Status
                  </InputLabel>
                  <Select
                    value={student?.personalDetails?.maritalStatus || ""}
                    disabled={editMode}
                    fullWidth
                    SelectDisplayProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    className="rounded-md"
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        personalDetails: {
                          ...student.personalDetails,
                          maritalStatus: e.target.value,
                        },
                      })
                    }
                  >
                    {maritalStatus.map((bg) => (
                      <MenuItem key={bg} value={bg}>
                        {bg}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Group 4 */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className="rounded-md">
                  <InputLabel className="dark:text-white">
                    Nationality
                  </InputLabel>
                  <Select
                    value={student?.personalDetails?.nationality || ""}
                    disabled={editMode}
                    SelectDisplayProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    className="rounded-md"
                    required
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        personalDetails: {
                          ...student.personalDetails,
                          nationality: e.target.value,
                        },
                      })
                    }
                  >
                    {nationalities.map((nationality) => (
                      <MenuItem key={nationality} value={nationality}>
                        {nationality}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Category"
                  fullWidth
                  disabled={editMode}
                  value={student?.personalDetails?.category || ""}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      personalDetails: {
                        ...student.personalDetails,
                        category: e.target.value,
                      },
                    })
                  }
                  InputProps={{
                    className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                  }}
                  InputLabelProps={{
                    className:
                      "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                  }}
                  className="rounded-md"
                />
              </Grid>

              {/* Group 5 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Domicile"
                  fullWidth
                  required
                  disabled={editMode}
                  value={student?.personalDetails?.domicile || ""}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      personalDetails: {
                        ...student.personalDetails,
                        domicile: e.target.value,
                      },
                    })
                  }
                  InputProps={{
                    className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                  }}
                  InputLabelProps={{
                    className:
                      "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                  }}
                  className="rounded-md"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Religion"
                  fullWidth
                  required
                  disabled={editMode}
                  value={student?.personalDetails?.religion || ""}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      personalDetails: {
                        ...student.personalDetails,
                        religion: e.target.value,
                      },
                    })
                  }
                  InputProps={{
                    className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                  }}
                  InputLabelProps={{
                    className:
                      "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                  }}
                  className="rounded-md"
                />
              </Grid>

              {/* Group 6 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Caste"
                  fullWidth
                  required
                  disabled={editMode}
                  value={student?.personalDetails?.caste || ""}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      personalDetails: {
                        ...student.personalDetails,
                        caste: e.target.value,
                      },
                    })
                  }
                  InputProps={{
                    className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                  }}
                  InputLabelProps={{
                    className:
                      "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                  }}
                  className="rounded-md"
                />
              </Grid>
            </Grid>

            <Divider className="my-4 w-full bg-gray-500" />

            {/* Hostel Details Section */}
            <Typography variant="h6" className="mb-4">
              Hostel Details
            </Typography>
            <Grid container spacing={3}>
              {/* Hostel Living Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  required
                  disabled={editMode}
                  className="rounded-md"
                >
                  <InputLabel className="dark:text-white">
                    Living at Hostel
                  </InputLabel>
                  <Select
                    SelectDisplayProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    className="rounded-md"
                    value={
                      student?.personalDetails?.hostel?.livingAtHostel
                        ? "Yes"
                        : "No"
                    }
                    onChange={(e) => {
                      const isLivingAtHostel = e.target.value === "Yes";
                      setStudent({
                        ...student,
                        personalDetails: {
                          ...student.personalDetails,
                          hostel: {
                            ...student.personalDetails.hostel,
                            livingAtHostel,
                          },
                        },
                      });
                    }}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Room Number */}
              {livingAtHostel && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Room Number"
                    fullWidth
                    required
                    disabled={editMode}
                    value={student?.personalDetails?.hostel?.roomNumber || ""}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        personalDetails: {
                          ...student.personalDetails,
                          hostel: {
                            ...student.personalDetails.hostel,
                            roomNumber: e.target.value,
                          },
                        },
                      })
                    }
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                  />
                </Grid>
              )}

              {/* Current Address */}
              {!livingAtHostel && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Current Address"
                    fullWidth
                    required
                    disabled={editMode}
                    value={
                      student?.personalDetails?.hostel?.currentAddress || ""
                    }
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        personalDetails: {
                          ...student.personalDetails,
                          hostel: {
                            ...student.personalDetails.hostel,
                            currentAddress: e.target.value,
                          },
                        },
                      })
                    }
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                  />
                </Grid>
              )}
            </Grid>

            <Divider className="my-4 w-full bg-gray-500" />

            {/* Parent Details Section */}
            <Typography variant="h6" className="mb-4">
              Parent Details
            </Typography>

            <Grid container spacing={3}>
              {/* Father's Details */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Father's Name"
                  fullWidth
                  required
                  disabled={editMode}
                  value={student?.parentDetails?.father?.name || ""}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      parentDetails: {
                        ...student.parentDetails,
                        father: {
                          ...student.parentDetails.father,
                          name: e.target.value,
                        },
                      },
                    })
                  }
                  InputProps={{
                    className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                  }}
                  InputLabelProps={{
                    className:
                      "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                  }}
                  className="rounded-md"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Father's Contact Number"
                  fullWidth
                  required
                  disabled={editMode}
                  value={student?.parentDetails?.father?.contactNumber || ""}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      parentDetails: {
                        ...student.parentDetails,
                        father: {
                          ...student.parentDetails.father,
                          contactNumber: e.target.value,
                        },
                      },
                    })
                  }
                  InputProps={{
                    className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                  }}
                  InputLabelProps={{
                    className:
                      "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                  }}
                  className="rounded-md"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Father's Occupation"
                  fullWidth
                  required
                  disabled={editMode}
                  value={student?.parentDetails?.father?.occupation || ""}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      parentDetails: {
                        ...student.parentDetails,
                        father: {
                          ...student.parentDetails.father,
                          occupation: e.target.value,
                        },
                      },
                    })
                  }
                  InputProps={{
                    className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                  }}
                  InputLabelProps={{
                    className:
                      "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                  }}
                  className="rounded-md"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Father's Address"
                  fullWidth
                  required
                  disabled={editMode}
                  value={student?.parentDetails?.father?.address || ""}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      parentDetails: {
                        ...student.parentDetails,
                        father: {
                          ...student.parentDetails.father,
                          address: e.target.value,
                        },
                      },
                    })
                  }
                  InputProps={{
                    className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                  }}
                  InputLabelProps={{
                    className:
                      "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                  }}
                  className="rounded-md"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Father's Email"
                  fullWidth
                  required
                  disabled={editMode}
                  value={student?.parentDetails?.father?.email || ""}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      parentDetails: {
                        ...student.parentDetails,
                        father: {
                          ...student.parentDetails.father,
                          email: e.target.value,
                        },
                      },
                    })
                  }
                  InputProps={{
                    className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                  }}
                  InputLabelProps={{
                    className:
                      "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                  }}
                  className="rounded-md"
                />
              </Grid>

              {/* Mother's Details */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mother's Name"
                  fullWidth
                  required
                  disabled={editMode}
                  value={student?.parentDetails?.mother?.name || ""}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      parentDetails: {
                        ...student.parentDetails,
                        mother: {
                          ...student.parentDetails.mother,
                          name: e.target.value,
                        },
                      },
                    })
                  }
                  InputProps={{
                    className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                  }}
                  InputLabelProps={{
                    className:
                      "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                  }}
                  className="rounded-md"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mother's Contact Number"
                  fullWidth
                  required
                  disabled={editMode}
                  value={student?.parentDetails?.mother?.contactNumber || ""}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      parentDetails: {
                        ...student.parentDetails,
                        mother: {
                          ...student.parentDetails.mother,
                          contactNumber: e.target.value,
                        },
                      },
                    })
                  }
                  InputProps={{
                    className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                  }}
                  InputLabelProps={{
                    className:
                      "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                  }}
                  className="rounded-md"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mother's Occupation"
                  fullWidth
                  required
                  disabled={editMode}
                  value={student?.parentDetails?.mother?.occupation || ""}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      parentDetails: {
                        ...student.parentDetails,
                        mother: {
                          ...student.parentDetails.mother,
                          occupation: e.target.value,
                        },
                      },
                    })
                  }
                  InputProps={{
                    className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                  }}
                  InputLabelProps={{
                    className:
                      "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                  }}
                  className="rounded-md"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mother's Address"
                  fullWidth
                  required
                  disabled={editMode}
                  value={student?.parentDetails?.mother?.address || ""}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      parentDetails: {
                        ...student.parentDetails,
                        mother: {
                          ...student.parentDetails.mother,
                          address: e.target.value,
                        },
                      },
                    })
                  }
                  InputProps={{
                    className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                  }}
                  InputLabelProps={{
                    className:
                      "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                  }}
                  className="rounded-md"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mother's Email"
                  fullWidth
                  required
                  disabled={editMode}
                  value={student?.parentDetails?.mother?.email || ""}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      parentDetails: {
                        ...student.parentDetails,
                        mother: {
                          ...student.parentDetails.mother,
                          email: e.target.value,
                        },
                      },
                    })
                  }
                  InputProps={{
                    className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                  }}
                  InputLabelProps={{
                    className:
                      "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                  }}
                  className="rounded-md"
                />
              </Grid>
            </Grid>

            <Divider className="my-4 w-full bg-gray-500" />

            {/* Bank Details Section */}
            <Typography variant="h6" className="mb-4">
              Bank Details
            </Typography>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Bank Name"
                fullWidth
                required
                disabled={editMode}
                value={student?.bankDetails?.bankName || ""}
                onChange={(e) =>
                  setStudent({
                    ...student,
                    bankDetails: {
                      ...student.bankDetails,
                      bankName: e.target.value,
                    },
                  })
                }
                InputProps={{
                  className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                }}
                InputLabelProps={{
                  className:
                    "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                }}
                className="rounded-md"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="IFSC Code"
                fullWidth
                required
                disabled={editMode}
                value={student?.bankDetails?.ifscCode || ""}
                onChange={(e) =>
                  setStudent({
                    ...student,
                    bankDetails: {
                      ...student.bankDetails,
                      ifscCode: e.target.value,
                    },
                  })
                }
                InputProps={{
                  className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                }}
                InputLabelProps={{
                  className:
                    "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                }}
                className="rounded-md"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Account Number"
                fullWidth
                required
                disabled={editMode}
                value={student?.bankDetails?.accountNumber || ""}
                onChange={(e) =>
                  setStudent({
                    ...student,
                    bankDetails: {
                      ...student.bankDetails,
                      accountNumber: e.target.value,
                    },
                  })
                }
                InputProps={{
                  className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                }}
                InputLabelProps={{
                  className:
                    "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                }}
                className="rounded-md"
              />
            </Grid>

            <Divider className="my-4 w-full bg-gray-500" />

            {/* Academic Details Section */}
            <Typography variant="h6" className="mb-4">
              Academic Details
            </Typography>

            <Grid container spacing={3}>
              {/* SSC Details */}
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="SSC Institute Name"
                    fullWidth
                    required
                    disabled={editMode}
                    value={student?.academicDetails?.ssc?.instituteName || ""}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        academicDetails: {
                          ...student.academicDetails,
                          ssc: {
                            ...student.academicDetails.ssc,
                            instituteName: e.target.value,
                          },
                        },
                      })
                    }
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="SSC Board"
                    fullWidth
                    required
                    disabled={editMode}
                    value={student?.academicDetails?.ssc?.board || ""}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        academicDetails: {
                          ...student.academicDetails,
                          ssc: {
                            ...student.academicDetails.ssc,
                            board: e.target.value,
                          },
                        },
                      })
                    }
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="SSC Year of Admission"
                    fullWidth
                    required
                    disabled={editMode}
                    value={student?.academicDetails?.ssc?.yearOfAdmission || ""}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        academicDetails: {
                          ...student.academicDetails,
                          ssc: {
                            ...student.academicDetails.ssc,
                            yearOfAdmission: e.target.value,
                          },
                        },
                      })
                    }
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="SSC Year of Passing"
                    fullWidth
                    required
                    disabled={editMode}
                    value={student?.academicDetails?.ssc?.yearOfPassing || ""}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        academicDetails: {
                          ...student.academicDetails,
                          ssc: {
                            ...student.academicDetails.ssc,
                            yearOfPassing: e.target.value,
                          },
                        },
                      })
                    }
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="SSC Marks Obtained"
                    fullWidth
                    required
                    disabled={editMode}
                    value={student?.academicDetails?.ssc?.marksObtained || ""}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        academicDetails: {
                          ...student.academicDetails,
                          ssc: {
                            ...student.academicDetails.ssc,
                            marksObtained: e.target.value,
                          },
                        },
                      })
                    }
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                  />
                </Grid>
              </Grid>

              {/* HSC Details */}
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="HSC Institute Name"
                    fullWidth
                    disabled={editMode}
                    value={student?.academicDetails?.hsc?.instituteName || ""}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        academicDetails: {
                          ...student.academicDetails,
                          hsc: {
                            ...student.academicDetails.hsc,
                            instituteName: e.target.value,
                          },
                        },
                      })
                    }
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="HSC Board"
                    fullWidth
                    disabled={editMode}
                    value={student?.academicDetails?.hsc?.board || ""}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        academicDetails: {
                          ...student.academicDetails,
                          hsc: {
                            ...student.academicDetails.hsc,
                            board: e.target.value,
                          },
                        },
                      })
                    }
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="HSC Year of Admission"
                    fullWidth
                    disabled={editMode}
                    value={student?.academicDetails?.hsc?.yearOfAdmission || ""}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        academicDetails: {
                          ...student.academicDetails,
                          hsc: {
                            ...student.academicDetails.hsc,
                            yearOfAdmission: e.target.value,
                          },
                        },
                      })
                    }
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="HSC Year of Passing"
                    fullWidth
                    disabled={editMode}
                    value={student?.academicDetails?.hsc?.yearOfPassing || ""}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        academicDetails: {
                          ...student.academicDetails,
                          hsc: {
                            ...student.academicDetails.hsc,
                            yearOfPassing: e.target.value,
                          },
                        },
                      })
                    }
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="HSC Marks Obtained"
                    fullWidth
                    disabled={editMode}
                    value={student?.academicDetails?.hsc?.marksObtained || ""}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        academicDetails: {
                          ...student.academicDetails,
                          hsc: {
                            ...student.academicDetails.hsc,
                            marksObtained: e.target.value,
                          },
                        },
                      })
                    }
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                  />
                </Grid>
              </Grid>

              {/* Diploma Details */}
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Diploma Institute Name"
                    fullWidth
                    disabled={editMode}
                    value={
                      student?.academicDetails?.diploma?.instituteName || ""
                    }
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        academicDetails: {
                          ...student.academicDetails,
                          diploma: {
                            ...student.academicDetails.diploma,
                            instituteName: e.target.value,
                          },
                        },
                      })
                    }
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Diploma Board"
                    fullWidth
                    disabled={editMode}
                    value={student?.academicDetails?.diploma?.board || ""}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        academicDetails: {
                          ...student.academicDetails,
                          diploma: {
                            ...student.academicDetails.diploma,
                            board: e.target.value,
                          },
                        },
                      })
                    }
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Diploma Year of Admission"
                    fullWidth
                    disabled={editMode}
                    value={
                      student?.academicDetails?.diploma?.yearOfAdmission || ""
                    }
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        academicDetails: {
                          ...student.academicDetails,
                          diploma: {
                            ...student.academicDetails.diploma,
                            yearOfAdmission: e.target.value,
                          },
                        },
                      })
                    }
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Diploma Year of Passing"
                    fullWidth
                    disabled={editMode}
                    value={
                      student?.academicDetails?.diploma?.yearOfPassing || ""
                    }
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        academicDetails: {
                          ...student.academicDetails,
                          diploma: {
                            ...student.academicDetails.diploma,
                            yearOfPassing: e.target.value,
                          },
                        },
                      })
                    }
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Diploma Marks Obtained"
                    fullWidth
                    disabled={editMode}
                    value={
                      student?.academicDetails?.diploma?.marksObtained || ""
                    }
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        academicDetails: {
                          ...student.academicDetails,
                          diploma: {
                            ...student.academicDetails.diploma,
                            marksObtained: e.target.value,
                          },
                        },
                      })
                    }
                    InputProps={{
                      className: "bg-gray-50 dark:bg-gray-600 dark:text-white",
                    }}
                    InputLabelProps={{
                      className:
                        "text-gray-700 dark:text-gray-300 dark:text-gray-300",
                    }}
                    className="rounded-md"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <div className="flex w-full items-center justify-center">
        {editMode ? (
          <Button
            color="error"
            variant="outlined"
            className="rounded-lg"
            onClick={() => {
              setEditMode(!editMode);
            }}
          >
            {" "}
            Switch To Edit Mode
          </Button>
        ) : (
          <Button
            color="success"
            variant="contained"
            className="rounded-lg"
            onClick={() => {
              setEditMode(!editMode);
              handleSave();
            }}
          >
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
}

export default TabAccount;
