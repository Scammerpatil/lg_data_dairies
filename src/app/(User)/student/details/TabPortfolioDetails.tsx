"use client";
import { useUser } from "@/context/useAuth";
import { Student } from "@/types/Student";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

  const handlePortfolioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: "skills" | "competitions" | "internships",
    index: number
  ) => {
    const { value } = e.target;
    setStudent((prevStudent) => {
      const updatedPortfolio = { ...prevStudent.portfolioDetails };
      updatedPortfolio[section][index] = value;
      return {
        ...prevStudent,
        portfolioDetails: updatedPortfolio,
      };
    });
  };

  const handleAddPortfolioItem = (
    section: "skills" | "competitions" | "internships"
  ) => {
    setStudent((prevStudent) => {
      const updatedPortfolio = { ...prevStudent.portfolioDetails };
      updatedPortfolio[section].push({ title: "" }); // Initialize new entry as an object

      return {
        ...prevStudent,
        portfolioDetails: updatedPortfolio,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = axios.put("/api/users/students/updateAllDetails", {
      student,
      _id: student._id,
    });
    toast.promise(response, {
      loading: "Saving changes...",
      success: "Changes saved successfully!",
      error: "An error occurred while saving changes.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Portfolio Details</h2>

        <div className="accordion w-full">
          {/* Skills Section */}
          <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-2">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-md font-medium">Skills</div>
            <div className="collapse-content">
              {student.portfolioDetails.skills.map((skill, index) => (
                <div key={index} className="p-2 mb-2">
                  <label className="label text-xs">Skill {index + 1}</label>
                  <input
                    type="text"
                    value={skill.title}
                    onChange={(e) => handlePortfolioChange(e, "skills", index)}
                    className="input input-bordered w-full"
                    placeholder="Enter skill"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddPortfolioItem("skills")}
                className="btn btn-sm btn-outline mt-2"
              >
                Add Skill
              </button>
            </div>
          </div>

          {/* Competitions Section */}
          <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-2">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-md font-medium">
              Competitions
            </div>
            <div className="collapse-content">
              {student.portfolioDetails.competitions.map(
                (competition, index) => (
                  <div key={index} className="p-2 mb-2">
                    <label className="label text-xs">
                      Competition {index + 1}
                    </label>
                    <input
                      type="text"
                      value={competition.title}
                      onChange={(e) =>
                        handlePortfolioChange(e, "competitions", index)
                      }
                      className="input input-bordered w-full"
                      placeholder="Enter competition"
                    />
                  </div>
                )
              )}
              <button
                type="button"
                onClick={() => handleAddPortfolioItem("competitions")}
                className="btn btn-sm btn-outline mt-2"
              >
                Add Competition
              </button>
            </div>
          </div>

          {/* Internships Section */}
          <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-2">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-md font-medium">
              Internships
            </div>
            <div className="collapse-content">
              {student.portfolioDetails.internships.map((internship, index) => (
                <div key={index} className="p-2 mb-2">
                  <label className="label text-xs">
                    Internship {index + 1}
                  </label>
                  <input
                    type="text"
                    value={internship.title}
                    onChange={(e) =>
                      handlePortfolioChange(e, "internships", index)
                    }
                    className="input input-bordered w-full"
                    placeholder="Enter internship"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddPortfolioItem("internships")}
                className="btn btn-sm btn-outline mt-2"
              >
                Add Internship
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary mt-4">
        Submit
      </button>
    </form>
  );
}
