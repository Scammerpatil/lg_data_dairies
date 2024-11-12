import { Teacher } from "./Teacher";

export type TermTest = {
  testNumber: number;
  marks: number;
};

export type Subject = {
  subjectName: string;
  termTests: [TermTest, TermTest];
  endSemesterMarks: number;
};

export type Semester = {
  semesterNumber: number;
  subjects: Subject[];
};

export type Hostel = {
  livingAtHostel: boolean;
  roomNumber?: string;
  currentAddress?: string;
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

export type Student = {
  _id: string;
  name: string;
  prn: number;
  year: string;
  division: string;
  department: string;
  email: string;
  password: string;
  profileImageUrl?: string;
  lgTeacher: Teacher;

  personalDetails: {
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

  isVerified: boolean;
  isAdminApproved: boolean;
};
