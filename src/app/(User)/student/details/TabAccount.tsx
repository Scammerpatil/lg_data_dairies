"use client";
import { Student } from "@/types/student";
import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function StudentForm() {
  const [student, setStudent] = useState<Student>({
    _id: "",
    name: "",
    userName: "",
    prn: 0,
    year: 0,
    division: "",
    department: "",
    email: "",
    password: "",
    profileImageUrl: "",
    lgTeacher: undefined,
    personalDetails: {
      photo: "",
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

  const [imgSrc, setImgSrc] = useState<string>();
  const [nationalities, setNationalities] = useState<string[]>([]);
  const [bloodGroups, setBloodGroups] = useState<string[]>([]);
  const [gender, setGender] = useState<string[]>([]);
  const [maritalStatus, setmaritalStatus] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<File>();
  const [loading, setLoading] = useState<boolean>();
  const fileInput = useRef();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };
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
      const response = axios.post("/api/helper/upload-img", formData, {
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

  return (
    <form className="container mx-auto p-4">
      {/* Personal Details */}
      <div className="my-6">
        <div className="flex items-center gap-4">
          <img
            src={imgSrc || student.profileImageUrl}
            alt="Profile Pic"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <label className="btn btn-primary">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                className="hidden"
                ref={fileInput}
              />
              Select File
            </label>
            <button
              className={`btn btn-secondary ml-4 ${
                loading || !profileImage ? "btn-disabled" : ""
              }`}
              onClick={handleUploadImage}
              disabled={loading || !profileImage}
            >
              {loading ? "Uploading..." : "Upload Image"}
            </button>
            <button
              className="btn btn-outline btn-error ml-4"
              onClick={() =>
                setImgSrc(
                  student.profileImageUrl ||
                    "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png"
                )
              }
            >
              Reset
            </button>
            <p className="mt-4 text-sm text-gray-600">
              Allowed PNG or JPEG. Max size of 800K.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={student.personalDetails.mobileNumber}
              onChange={(e) =>
                handleNestedInputChange(e, "personalDetails", "mobileNumber")
              }
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1">Permanent Address</label>
            <input
              type="text"
              name="permanentAddress"
              value={student.personalDetails.permanentAddress}
              onChange={(e) =>
                handleNestedInputChange(
                  e,
                  "personalDetails",
                  "permanentAddress"
                )
              }
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </div>

      {/* Parent Details */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Parent Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Father's Name</label>
            <input
              type="text"
              name="fatherName"
              value={student.parentDetails.father.name}
              onChange={(e) =>
                handleNestedInputChange(e, "parentDetails", "name")
              }
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Mother's Name</label>
            <input
              type="text"
              name="motherName"
              value={student.parentDetails.mother.name}
              onChange={(e) =>
                handleNestedInputChange(e, "parentDetails", "name")
              }
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Bank Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={student.bankDetails.bankName}
              onChange={(e) =>
                handleNestedInputChange(e, "bankDetails", "bankName")
              }
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1">IFSC Code</label>
            <input
              type="text"
              name="ifscCode"
              value={student.bankDetails.ifscCode}
              onChange={(e) =>
                handleNestedInputChange(e, "bankDetails", "ifscCode")
              }
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </div>

      <button className="btn btn-primary">Submit</button>
    </form>
  );
}
