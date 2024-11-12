"use client";
import useUser from "@/hooks/useUser";
import { Student } from "@/types/Student";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function StudentForm() {
  const user: Student = useUser();
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
        engineeringDetails: user.engineeringDetails || { semesters: [] },
        portfolioDetails: user.portfolioDetails || {
          skills: [],
          competitions: [],
          internships: [],
        },
        isVerified: user.isVerified || false,
        isAdminApproved: user.isAdminApproved || false,
      }));
    }
  }, [user]);

  const [imgSrc, setImgSrc] = useState<string>();
  const [profileImage, setProfileImage] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      setProfileImage(e.target.files[0]);
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
        error: () => {
          setLoading(false);
          return "An error occurred while uploading the image.";
        },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <form
      className="container mx-auto p-4"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      {/* Profile Image */}
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
          </div>
        </div>
      </div>

      {/* Personal Details */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            placeholder="Name"
          />
          <input
            type="text"
            name="mobileNumber"
            value={student.personalDetails.mobileNumber}
            onChange={(e) =>
              handleNestedInputChange(e, "personalDetails", "mobileNumber")
            }
            className="input input-bordered w-full"
            placeholder="Mobile Number"
          />
          <input
            type="text"
            name="permanentAddress"
            value={student.personalDetails.permanentAddress}
            onChange={(e) =>
              handleNestedInputChange(e, "personalDetails", "permanentAddress")
            }
            className="input input-bordered w-full"
            placeholder="Permanent Address"
          />
          <input
            type="text"
            name="gender"
            value={student.personalDetails.gender}
            onChange={(e) =>
              handleNestedInputChange(e, "personalDetails", "gender")
            }
            className="input input-bordered w-full"
            placeholder="Gender"
          />
          <input
            type="date"
            name="dob"
            value={student.personalDetails.dob.toISOString().substring(0, 10)}
            onChange={(e) =>
              handleNestedInputChange(e, "personalDetails", "dob")
            }
            className="input input-bordered w-full"
            placeholder="Date of Birth"
          />
          <input
            type="text"
            name="bloodGroup"
            value={student.personalDetails.bloodGroup}
            onChange={(e) =>
              handleNestedInputChange(e, "personalDetails", "bloodGroup")
            }
            className="input input-bordered w-full"
            placeholder="Blood Group"
          />
          <input
            type="text"
            name="maritalStatus"
            value={student.personalDetails.maritalStatus}
            onChange={(e) =>
              handleNestedInputChange(e, "personalDetails", "maritalStatus")
            }
            className="input input-bordered w-full"
            placeholder="Marital Status"
          />
          <input
            type="text"
            name="nationality"
            value={student.personalDetails.nationality}
            onChange={(e) =>
              handleNestedInputChange(e, "personalDetails", "nationality")
            }
            className="input input-bordered w-full"
            placeholder="Nationality"
          />
        </div>
      </div>

      {/* Parent Details */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Parent Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
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
            className="input input-bordered w-full"
            placeholder="Father's Name"
          />
          <input
            type="text"
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
            className="input input-bordered w-full"
            placeholder="Father's Contact Number"
          />
          <input
            type="text"
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
            className="input input-bordered w-full"
            placeholder="Father's Occupation"
          />
          <input
            type="text"
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
            className="input input-bordered w-full"
            placeholder="Mother's Name"
          />
        </div>
      </div>

      {/* Bank Details */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Bank Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="bankName"
            value={student.bankDetails.bankName}
            onChange={(e) =>
              handleNestedInputChange(e, "bankDetails", "bankName")
            }
            className="input input-bordered w-full"
            placeholder="Bank Name"
          />
          <input
            type="text"
            name="ifscCode"
            value={student.bankDetails.ifscCode}
            onChange={(e) =>
              handleNestedInputChange(e, "bankDetails", "ifscCode")
            }
            className="input input-bordered w-full"
            placeholder="IFSC Code"
          />
          <input
            type="text"
            name="accountNumber"
            value={student.bankDetails.accountNumber}
            onChange={(e) =>
              handleNestedInputChange(e, "bankDetails", "accountNumber")
            }
            className="input input-bordered w-full"
            placeholder="Account Number"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}
