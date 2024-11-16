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

  const handleSubjectMarksChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    semesterIndex: number,
    subjectIndex: number,
    markType: string
  ) => {
    const value = parseFloat(e.target.value) || 0; // Convert the input value to a number, default to 0 if invalid

    setStudent((prevStudent) => {
      const updatedSemesters = [...prevStudent.engineeringDetails.semesters];
      const updatedSubjects = [...updatedSemesters[semesterIndex].subjects];
      const updatedSubject = { ...updatedSubjects[subjectIndex] };

      if (markType === "termTest1" || markType === "termTest2") {
        const termTestIndex = markType === "termTest1" ? 0 : 1;
        const updatedTermTests = [...(updatedSubject.termTests || [])];
        if (!updatedTermTests[termTestIndex]) {
          updatedTermTests[termTestIndex] = {
            testNumber: termTestIndex + 1,
            marks: value,
          };
        } else {
          updatedTermTests[termTestIndex].marks = value;
        }
        updatedSubject.termTests = updatedTermTests;
      } else if (markType === "endSemesterMarks") {
        updatedSubject.endSemesterMarks = value;
      }

      updatedSubjects[subjectIndex] = updatedSubject;
      updatedSemesters[semesterIndex].subjects = updatedSubjects;

      return {
        ...prevStudent,
        engineeringDetails: {
          ...prevStudent.engineeringDetails,
          semesters: updatedSemesters,
        },
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
      success: (data) => {
        return "Changes saved successfully!";
      },
      error: () => "An error occurred while saving changes.",
    });
  };

  return (
    <form className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Engineering Details</h2>

        <div className="accordion w-full">
          {student.engineeringDetails.semesters.map(
            (semester, semesterIndex) => (
              <div
                key={semesterIndex}
                tabIndex={semesterIndex}
                className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-2"
              >
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-md font-medium">
                  Semester {semester.semesterNumber}
                </div>
                <div className="collapse-content">
                  {semester.subjects.map((subject, subjectIndex) => (
                    <div key={subjectIndex} className="p-2">
                      <h4 className="text-sm font-semibold mb-2">
                        Subject: {subject.name}
                      </h4>
                      <div className="flex flex-wrap gap-4">
                        {/* Term Test 1 */}
                        <div className="flex flex-col">
                          <label className="label text-xs">Term Test 1</label>
                          <input
                            type="number"
                            value={subject.termTests[0]?.marks || ""}
                            onChange={(e) =>
                              handleSubjectMarksChange(
                                e,
                                semesterIndex,
                                subjectIndex,
                                "termTest1"
                              )
                            }
                            className="input input-bordered w-24"
                          />
                        </div>

                        {/* Term Test 2 */}
                        <div className="flex flex-col">
                          <label className="label text-xs">Term Test 2</label>
                          <input
                            type="number"
                            value={subject.termTests[1]?.marks || ""}
                            onChange={(e) =>
                              handleSubjectMarksChange(
                                e,
                                semesterIndex,
                                subjectIndex,
                                "termTest2"
                              )
                            }
                            className="input input-bordered w-24"
                          />
                        </div>

                        {/* End Semester Marks */}
                        <div className="flex flex-col">
                          <label className="label text-xs">
                            End Semester Marks
                          </label>
                          <input
                            type="number"
                            value={subject.endSemesterMarks || ""}
                            onChange={(e) =>
                              handleSubjectMarksChange(
                                e,
                                semesterIndex,
                                subjectIndex,
                                "endSemesterMarks"
                              )
                            }
                            className="input input-bordered w-24"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary mt-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
}
