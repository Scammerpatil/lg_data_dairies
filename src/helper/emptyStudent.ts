import { Student } from "@/types/Student";

// Complete `emptyStudent` function
export const emptyStudent = (): Student => {
  return {
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

    lgTeacher: {
      _id: "",
      name: "",
      email: "",
      department: "",
      isLG: false,
      isAdminApproved: false,
      phoneNo: "",
      profileImageUrl: "",
      role: "",
      studentUnder: [],
    },

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
      semesters: [
        {
          semesterNumber: 0,
          termTests: [
            {
              testNumber: 0,
              marks: 0,
            },
          ],
          endSemesterMarks: 0,
          attendance: 0,
        },
      ],
    },

    portfolioDetails: {
      skills: [],
      competitions: [],
      internships: [],
    },

    healthDetails: {
      majorHealthProblem: "",
      sufferingFrom: {
        name: "",
        date: new Date(),
      },
      treatment: {
        doctorName: "",
        contactNumber: "",
      },
    },

    isVerified: false,
    isAdminApproved: false,
  };
};
