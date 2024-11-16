"use client";
import { useUser } from "@/context/useAuth";
import { Student } from "@/types/Student";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function StudentForm() {
  const { user }: Student = useUser();
  const [student, setStudent] = useState<Student>({
    _id: "",
    name: "",
    userName: "",
    prn: 0,
    year: "",
    division: "",
    department: "",
    email: "",
    password: "",
    profileImageUrl: "",
    lgTeacher: undefined,
    personalDetails: {
      mobileNumber: "",
      permanentAddress: "",
      gender: "",
      dob: new Date(),
      bloodGroup: "",
      maritalStatus: "",
      nationality: "",
      category: "",
      domicile: "",
      religion: "",
      caste: "",
      hostel: {
        livingAtHostel: false,
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
        yearOfAdmission: 0,
        yearOfPassing: 0,
        marksObtained: 0,
      },
      hsc: {
        instituteName: "",
        board: "",
        yearOfAdmission: 0,
        yearOfPassing: 0,
        marksObtained: 0,
      },
      diploma: {
        instituteName: "",
        board: "",
        yearOfAdmission: 0,
        yearOfPassing: 0,
        marksObtained: 0,
      },
    },
    engineeringDetails: {
      semesters: [],
    },
    portfolioDetails: {
      skills: [],
      competitions: [],
      internships: [],
    },
    healthDetails: {
      majorHealthProblem: "",
    },
    isVerified: false,
    isAdminApproved: false,
  });
  useEffect(() => {
    if (user) {
      setStudent((prevStudent) => ({
        ...prevStudent,
        _id: user._id || "",
        name: user.name || "",
        userName: user.userName || "",
        prn: user.prn || 0,
        year: user.year || "",
        division: user.division || "",
        department: user.department || "",
        email: user.email || "",
        password: user.password || "",
        profileImageUrl: user.profileImageUrl || "",
        lgTeacher: user.lgTeacher || undefined,
        personalDetails: {
          photo: user.personalDetails?.photo || "",
          mobileNumber: user.personalDetails?.mobileNumber || "",
          permanentAddress: user.personalDetails?.permanentAddress || "",
          gender: user.personalDetails?.gender || "",
          dob: user.personalDetails?.dob,
          bloodGroup: user.personalDetails?.bloodGroup || "",
          maritalStatus: user.personalDetails?.maritalStatus || "",
          nationality: user.personalDetails?.nationality || "",
          category: user.personalDetails?.category || "",
          domicile: user.personalDetails?.domicile || "",
          religion: user.personalDetails?.religion || "",
          caste: user.personalDetails?.caste || "",
          hostel: {
            livingAtHostel:
              user.personalDetails?.hostel?.livingAtHostel || false,
          },
        },
        parentDetails: {
          father: {
            name: user.parentDetails?.father?.name || "",
            contactNumber: user.parentDetails?.father?.contactNumber || "",
            occupation: user.parentDetails?.father?.occupation || "",
            address: user.parentDetails?.father?.address || "",
            email: user.parentDetails?.father?.email || "",
          },
          mother: {
            name: user.parentDetails?.mother?.name || "",
            contactNumber: user.parentDetails?.mother?.contactNumber || "",
            occupation: user.parentDetails?.mother?.occupation || "",
            address: user.parentDetails?.mother?.address || "",
            email: user.parentDetails?.mother?.email || "",
          },
        },
        bankDetails: {
          bankName: user.bankDetails?.bankName || "",
          ifscCode: user.bankDetails?.ifscCode || "",
          accountNumber: user.bankDetails?.accountNumber || "",
        },
        academicDetails: {
          ssc: {
            instituteName: user.academicDetails?.ssc?.instituteName || "",
            board: user.academicDetails?.ssc?.board || "",
            yearOfAdmission: user.academicDetails?.ssc?.yearOfAdmission || 0,
            yearOfPassing: user.academicDetails?.ssc?.yearOfPassing || 0,
            marksObtained: user.academicDetails?.ssc?.marksObtained || 0,
          },
          hsc: {
            instituteName: user.academicDetails?.hsc?.instituteName || "",
            board: user.academicDetails?.hsc?.board || "",
            yearOfAdmission: user.academicDetails?.hsc?.yearOfAdmission || 0,
            yearOfPassing: user.academicDetails?.hsc?.yearOfPassing || 0,
            marksObtained: user.academicDetails?.hsc?.marksObtained || 0,
          },
          diploma: {
            instituteName: user.academicDetails?.diploma?.instituteName || "",
            board: user.academicDetails?.diploma?.board || "",
            yearOfAdmission:
              user.academicDetails?.diploma?.yearOfAdmission || 0,
            yearOfPassing: user.academicDetails?.diploma?.yearOfPassing || 0,
            marksObtained: user.academicDetails?.diploma?.marksObtained || 0,
          },
        },
        engineeringDetails: user.engineeringDetails || { semesters: [] },
        portfolioDetails: {
          skills: user.portfolioDetails?.skills || [],
          competitions: user.portfolioDetails?.competitions || [],
          internships: user.portfolioDetails?.internships || [],
        },
        healthDetails: {
          majorHealthProblem: user.healthDetails?.majorHealthProblem || "",
        },
        isVerified: user.isVerified || false,
        isAdminApproved: user.isAdminApproved || false,
      }));
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleNestedInputChange = <
    T extends keyof Student,
    K extends keyof Student[T]
  >(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: T,
    field: K
  ) => {
    const { value } = e.target;

    setStudent((prevStudent) => ({
      ...prevStudent,
      [section]: {
        ...prevStudent[section],
        [field]: value,
      },
    }));
  };

  const handleNestedNestedInputChange = <
    T extends keyof Student,
    K extends keyof Student[T],
    L extends keyof Student[T][K]
  >(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: T,
    subSection: K,
    field: L
  ) => {
    const { value } = e.target;

    setStudent((prevStudent) => ({
      ...prevStudent,
      [section]: {
        ...prevStudent[section],
        [subSection]: {
          ...prevStudent[section][subSection],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async () => {
    const response = axios.put("/api/users/students/updateAllDetails", {
      student,
      _id: student._id,
    });
    toast.promise(response, {
      loading: "Saving changes...",
      success: (data) => {
        sessionStorage.removeItem("user");
        sessionStorage.setItem("user", JSON.stringify(data.data.student));
        return "Changes saved successfully!";
      },
      error: () => "An error occurred while saving changes.",
    });
  };

  return (
    <form className="container mx-auto p-4">
      {/* Profile Image */}
      <div className="my-6">
        <div className="flex items-center gap-4">
          <img
            src={student.profileImageUrl}
            alt="Profile Pic"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Personal Details */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
        <hr className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6">
          {/* Name */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={student.name}
              readOnly
              className="input input-bordered w-full text-base-content"
              placeholder="Name"
            />
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="mobileNumber"
            >
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={student.personalDetails.mobileNumber}
              onChange={(e) =>
                handleNestedInputChange(e, "personalDetails", "mobileNumber")
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Mobile Number"
            />
          </div>

          {/* Permanent Address */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="permanentAddress"
            >
              Permanent Address
            </label>
            <input
              type="text"
              id="permanentAddress"
              name="permanentAddress"
              value={student.personalDetails.permanentAddress}
              onChange={(e) =>
                handleNestedInputChange(
                  e,
                  "personalDetails",
                  "permanentAddress"
                )
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Permanent Address"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="gender"
            >
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={student.personalDetails.gender}
              onChange={(e) =>
                handleNestedInputChange(e, "personalDetails", "gender")
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Gender"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="text-base-content font-medium mb-1" htmlFor="dob">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={student.personalDetails.dob}
              onChange={(e) =>
                handleNestedInputChange(e, "personalDetails", "dob")
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Date of Birth"
            />
          </div>

          {/* Blood Group */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="bloodGroup"
            >
              Blood Group
            </label>
            <input
              type="text"
              id="bloodGroup"
              name="bloodGroup"
              value={student.personalDetails.bloodGroup}
              onChange={(e) =>
                handleNestedInputChange(e, "personalDetails", "bloodGroup")
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Blood Group"
            />
          </div>

          {/* Marital Status */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="maritalStatus"
            >
              Marital Status
            </label>
            <input
              type="text"
              id="maritalStatus"
              name="maritalStatus"
              value={student.personalDetails.maritalStatus}
              onChange={(e) =>
                handleNestedInputChange(e, "personalDetails", "maritalStatus")
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Marital Status"
            />
          </div>

          {/* Nationality */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="nationality"
            >
              Nationality
            </label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={student.personalDetails.nationality}
              onChange={(e) =>
                handleNestedInputChange(e, "personalDetails", "nationality")
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Nationality"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="category"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={student.personalDetails.category}
              onChange={(e) =>
                handleNestedInputChange(e, "personalDetails", "category")
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Category"
            />
          </div>

          {/* Domicile */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="domicile"
            >
              Domicile
            </label>
            <input
              type="text"
              id="domicile"
              name="domicile"
              value={student.personalDetails.domicile}
              onChange={(e) =>
                handleNestedInputChange(e, "personalDetails", "domicile")
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Domicile"
            />
          </div>

          {/* Religion */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="religion"
            >
              Religion
            </label>
            <input
              type="text"
              id="religion"
              name="religion"
              value={student.personalDetails.religion}
              onChange={(e) =>
                handleNestedInputChange(e, "personalDetails", "religion")
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Religion"
            />
          </div>

          {/* Caste */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="caste"
            >
              Caste
            </label>
            <input
              type="text"
              id="caste"
              name="caste"
              value={student.personalDetails.caste}
              onChange={(e) =>
                handleNestedInputChange(e, "personalDetails", "caste")
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Caste"
            />
          </div>
        </div>
      </div>

      {/* Hostel */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold">Hostel Details</h2>
        <hr className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Living at Hostel */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="livingAtHostel"
            >
              Living at Hostel
            </label>
            <input
              type="text"
              id="livingAtHostel"
              name="livingAtHostel"
              value={student.personalDetails.hostel.livingAtHostel}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "personalDetails",
                  "hostel",
                  "livingAtHostel"
                )
              }
              className="input input-bordered w-full"
              placeholder="Yes/No"
            />
          </div>

          {/* Room Number */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="roomNumber"
            >
              Room Number
            </label>
            <input
              type="text"
              id="roomNumber"
              name="roomNumber"
              value={student.personalDetails.hostel.roomNumber}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "personalDetails",
                  "hostel",
                  "roomNumber"
                )
              }
              className="input input-bordered w-full"
              placeholder="Room Number"
            />
          </div>

          {/* Current Address */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="currentAddress"
            >
              Current Address
            </label>
            <input
              type="text"
              id="currentAddress"
              name="currentAddress"
              value={student.personalDetails.hostel.currentAddress}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "personalDetails",
                  "hostel",
                  "currentAddress"
                )
              }
              className="input input-bordered w-full"
              placeholder="Current Address"
            />
          </div>
        </div>
      </div>

      {/* Parent Details */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-4">Parent Details</h2>
        <hr className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Father's Name */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="fatherName"
            >
              Father's Name
            </label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={student.parentDetails.father.name}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "parentDetails",
                  "father",
                  "name"
                )
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Father's Name"
            />
          </div>

          {/* Father's Contact Number */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="fatherContact"
            >
              Father's Contact Number
            </label>
            <input
              type="text"
              id="fatherContact"
              name="fatherContact"
              value={student.parentDetails.father.contactNumber}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "parentDetails",
                  "father",
                  "contactNumber"
                )
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Father's Contact Number"
            />
          </div>

          {/* Father's Occupation */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="fatherOccupation"
            >
              Father's Occupation
            </label>
            <input
              type="text"
              id="fatherOccupation"
              name="fatherOccupation"
              value={student.parentDetails.father.occupation}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "parentDetails",
                  "father",
                  "occupation"
                )
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Father's Occupation"
            />
          </div>

          {/* Father's Address */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="fatherAddress"
            >
              Father's Address
            </label>
            <input
              type="text"
              id="fatherAddress"
              name="fatherAddress"
              value={student.parentDetails.father.address}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "parentDetails",
                  "father",
                  "address"
                )
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Father's Address"
            />
          </div>

          {/* Father's Email */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="fatherEmail"
            >
              Father's Email
            </label>
            <input
              type="text"
              id="fatherEmail"
              name="fatherEmail"
              value={student.parentDetails.father.email}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "parentDetails",
                  "father",
                  "email"
                )
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Father's Email"
            />
          </div>

          {/* Mother's Name */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="motherName"
            >
              Mother's Name
            </label>
            <input
              type="text"
              id="motherName"
              name="motherName"
              value={student.parentDetails.mother.name}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "parentDetails",
                  "mother",
                  "name"
                )
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Mother's Name"
            />
          </div>

          {/* Mother's Contact Number */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="motherContact"
            >
              Mother's Contact Number
            </label>
            <input
              type="text"
              id="motherContact"
              name="motherContact"
              value={student.parentDetails.mother.contactNumber}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "parentDetails",
                  "mother",
                  "contactNumber"
                )
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Mother's Contact Number"
            />
          </div>

          {/* Mother's Address */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="motherAddress"
            >
              Mother's Address
            </label>
            <input
              type="text"
              id="motherAddress"
              name="motherAddress"
              value={student.parentDetails.mother.address}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "parentDetails",
                  "mother",
                  "address"
                )
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Mother's Address"
            />
          </div>

          {/* Mother's Email */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="motherEmail"
            >
              Mother's Email
            </label>
            <input
              type="text"
              id="motherEmail"
              name="motherEmail"
              value={student.parentDetails.mother.email}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "parentDetails",
                  "mother",
                  "email"
                )
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Mother's Email"
            />
          </div>
        </div>
      </div>

      {/*Academic Details  */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold">Academic Details</h2>

        {/* SSC Section */}
        <h3 className="text-lg font-semibold mt-4 mb-2">SSC</h3>
        <hr className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="sscInstituteName"
            >
              School Name
            </label>
            <input
              type="text"
              id="sscInstituteName"
              name="instituteName"
              value={student.academicDetails.ssc.instituteName || ""}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "academicDetails",
                  "ssc",
                  "instituteName"
                )
              }
              className="input input-bordered w-full"
              placeholder="Enter School Name"
            />
          </div>

          {/* Additional fields follow the same pattern */}
          {/* Board Name */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="sscBoard"
            >
              Board Name
            </label>
            <input
              type="text"
              id="sscBoard"
              name="board"
              value={student.academicDetails.ssc.board || ""}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "academicDetails",
                  "ssc",
                  "board"
                )
              }
              className="input input-bordered w-full"
              placeholder="Enter Board Name"
            />
          </div>

          {/* Year Of Admission */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="sscYearOfAdmission"
            >
              Year Of Admission
            </label>
            <input
              type="text"
              id="sscYearOfAdmission"
              name="yearOfAdmission"
              value={student.academicDetails.ssc.yearOfAdmission || ""}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "academicDetails",
                  "ssc",
                  "yearOfAdmission"
                )
              }
              className="input input-bordered w-full"
              placeholder="Enter Year Of Admission"
            />
          </div>

          {/* Year Of Passing */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="sscYearOfPassing"
            >
              Year Of Passing
            </label>
            <input
              type="text"
              id="sscYearOfPassing"
              name="yearOfPassing"
              value={student.academicDetails.ssc.yearOfPassing || ""}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "academicDetails",
                  "ssc",
                  "yearOfPassing"
                )
              }
              className="input input-bordered w-full"
              placeholder="Enter Year Of Passing"
            />
          </div>

          {/* Marks Obtained */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="sscMarksObtained"
            >
              Marks Obtained
            </label>
            <input
              type="text"
              id="sscMarksObtained"
              name="marksObtained"
              value={student.academicDetails.ssc.marksObtained || ""}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "academicDetails",
                  "ssc",
                  "marksObtained"
                )
              }
              className="input input-bordered w-full"
              placeholder="Enter Marks Obtained"
            />
          </div>
        </div>

        {/* HSC Section */}
        <h3 className="text-lg font-semibold mt-4 mb-2">HSC</h3>
        <hr className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="hscInstituteName"
            >
              Institute Name
            </label>
            <input
              type="text"
              id="hscInstituteName"
              name="instituteName"
              value={student.academicDetails.hsc.instituteName || ""}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "academicDetails",
                  "hsc",
                  "instituteName"
                )
              }
              className="input input-bordered w-full"
              placeholder="Enter Institute Name"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="hscBoard"
            >
              Board Name
            </label>
            <input
              type="text"
              id="hscBoard"
              name="board"
              value={student.academicDetails.hsc.board || ""}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "academicDetails",
                  "hsc",
                  "board"
                )
              }
              className="input input-bordered w-full"
              placeholder="Enter Board Name"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="hscYearOfAdmission"
            >
              Year Of Admission
            </label>
            <input
              type="text"
              id="hscYearOfAdmission"
              name="yearOfAdmission"
              value={student.academicDetails.hsc.yearOfAdmission || ""}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "academicDetails",
                  "hsc",
                  "yearOfAdmission"
                )
              }
              className="input input-bordered w-full"
              placeholder="Enter Year Of Admission"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="hscYearOfPassing"
            >
              Year Of Passing
            </label>
            <input
              type="text"
              id="hscYearOfPassing"
              name="yearOfPassing"
              value={student.academicDetails.hsc.yearOfPassing || ""}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "academicDetails",
                  "hsc",
                  "yearOfPassing"
                )
              }
              className="input input-bordered w-full"
              placeholder="Enter Year Of Passing"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="hscMarksObtained"
            >
              Marks Obtained
            </label>
            <input
              type="text"
              id="hscMarksObtained"
              name="marksObtained"
              value={student.academicDetails.hsc.marksObtained || ""}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "academicDetails",
                  "hsc",
                  "marksObtained"
                )
              }
              className="input input-bordered w-full"
              placeholder="Enter Marks Obtained"
            />
          </div>
        </div>

        {/* Diploma Section */}
        <h3 className="text-lg font-semibold mt-4 mb-2">Diploma</h3>
        <hr className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="diplomaInstituteName"
            >
              Institute Name
            </label>
            <input
              type="text"
              id="diplomaInstituteName"
              name="instituteName"
              value={student.academicDetails.diploma.instituteName || ""}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "academicDetails",
                  "diploma",
                  "instituteName"
                )
              }
              className="input input-bordered w-full"
              placeholder="Enter Institute Name"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="diplomaBoard"
            >
              Board Name
            </label>
            <input
              type="text"
              id="diplomaBoard"
              name="board"
              value={student.academicDetails.diploma.board || ""}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "academicDetails",
                  "diploma",
                  "board"
                )
              }
              className="input input-bordered w-full"
              placeholder="Enter Board Name"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="diplomaYearOfAdmission"
            >
              Year Of Admission
            </label>
            <input
              type="text"
              id="diplomaYearOfAdmission"
              name="yearOfAdmission"
              value={student.academicDetails.diploma.yearOfAdmission || ""}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "academicDetails",
                  "diploma",
                  "yearOfAdmission"
                )
              }
              className="input input-bordered w-full"
              placeholder="Enter Year Of Admission"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="diplomaYearOfPassing"
            >
              Year Of Passing
            </label>
            <input
              type="text"
              id="diplomaYearOfPassing"
              name="yearOfPassing"
              value={student.academicDetails.diploma.yearOfPassing || ""}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "academicDetails",
                  "diploma",
                  "yearOfPassing"
                )
              }
              className="input input-bordered w-full"
              placeholder="Enter Year Of Passing"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="diplomaMarksObtained"
            >
              Marks Obtained
            </label>
            <input
              type="text"
              id="diplomaMarksObtained"
              name="marksObtained"
              value={student.academicDetails.diploma.marksObtained || ""}
              onChange={(e) =>
                handleNestedNestedInputChange(
                  e,
                  "academicDetails",
                  "diploma",
                  "marksObtained"
                )
              }
              className="input input-bordered w-full"
              placeholder="Enter Marks Obtained"
            />
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-4">Bank Details</h2>
        <hr className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bank Name */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="bankName"
            >
              Bank Name
            </label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              value={student.bankDetails.bankName}
              onChange={(e) =>
                handleNestedInputChange(e, "bankDetails", "bankName")
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Bank Name"
            />
          </div>

          {/* IFSC Code */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="ifscCode"
            >
              IFSC Code
            </label>
            <input
              type="text"
              id="ifscCode"
              name="ifscCode"
              value={student.bankDetails.ifscCode}
              onChange={(e) =>
                handleNestedInputChange(e, "bankDetails", "ifscCode")
              }
              className="input input-bordered w-full text-base-content"
              placeholder="IFSC Code"
            />
          </div>

          {/* Account Number */}
          <div className="flex flex-col">
            <label
              className="text-base-content font-medium mb-1"
              htmlFor="accountNumber"
            >
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={student.bankDetails.accountNumber}
              onChange={(e) =>
                handleNestedInputChange(e, "bankDetails", "accountNumber")
              }
              className="input input-bordered w-full text-base-content"
              placeholder="Account Number"
            />
          </div>
        </div>
      </div>

      {/* Health Details */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Health Details</h2>
        <hr className="mb-4" />
        <input
          type="text"
          name="majorHealthProblem"
          value={student.healthDetails.majorHealthProblem}
          onChange={(e) =>
            setStudent((prevStudent) => ({
              ...prevStudent,
              healthDetails: {
                ...prevStudent.healthDetails,
                majorHealthProblem: e.target.value,
              },
            }))
          }
          className="input input-bordered w-full"
          placeholder="Major Health Problem"
        />
      </div>

      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}
