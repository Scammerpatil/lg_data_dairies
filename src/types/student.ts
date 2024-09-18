import { teacher } from "./teacher";
// Subschemas
export type TermTest = {
  testNumber: number;
  marks: number;
};

export type Semester = {
  semesterNumber: number;
  termTests: TermTest[];
  endSemesterMarks: number;
  attendance: number;
};

export type Hostel = {
  livingAtHostel: boolean;
  roomNumber?: string; // Optional
  currentAddress?: string; // Optional
};

export type ParentDetails = {
  name: string;
  contactNumber: string;
  occupation: string;
  address: string;
  email: string;
};

export type AcademicRecord = {
  instituteName: string;
  board: string;
  yearOfAdmission: number;
  yearOfPassing: number;
  marksObtained: number;
};

export type Competition = {
  name: string;
  result: string;
};

export type Internship = {
  companyName: string;
  duration: string;
  role: string;
};

export type HealthDetails = {
  majorHealthProblem: string;
  sufferingFrom?: {
    name: string;
    date: Date;
  };
  treatment?: {
    doctorName: string;
    contactNumber: string;
  };
};

// Main Student Type
export type Student = {
  _id: string;
  name: string;
  userName?: string; // Optional
  prn: number;
  year: string;
  division: string;
  department: string;
  email: string;
  password: string;
  profileImageUrl?: string; // Optional
  lgTeacher: teacher;

  personalDetails: {
    photo?: string; // Optional
    mobileNumber: string;
    permanentAddress: string;
    gender: string;
    dob: Date;
    bloodGroup: string;
    maritalStatus: string;
    nationality: string;
    category: string;
    domicile: string;
    religion: string;
    caste: string;
    hostel: Hostel;
  };

  parentDetails: {
    father: ParentDetails;
    mother: ParentDetails;
  };

  bankDetails: {
    bankName: string;
    ifscCode: string;
    accountNumber: string;
  };

  academicDetails: {
    ssc: AcademicRecord;
    hsc: AcademicRecord;
    diploma: AcademicRecord;
  };

  engineeringDetails: {
    semesters: Semester[];
  };

  portfolioDetails: {
    skills: string[];
    competitions: Competition[];
    internships: Internship[];
  };

  healthDetails: HealthDetails;

  isVerified?: boolean; // Optional
  isAdminApproved?: boolean; // Optional
};
