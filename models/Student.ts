import mongoose from "mongoose";

const termTestSchema = new mongoose.Schema({
  testNumber: Number,
  marks: Number,
});

const semesterSchema = new mongoose.Schema({
  semesterNumber: Number,
  termTests: [termTestSchema],
  endSemesterMarks: Number,
  attendance: Number,
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  prn: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lgTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  personalDetails: {
    photo: String,
    mobileNumber: String,
    email: String,
    permanentAddress: String,
    gender: String,
    dob: Date,
    bloodGroup: String,
    maritalStatus: String,
    nationality: String,
    category: String,
    domicile: String,
    religion: String,
    caste: String,
    hostel: {
      livingAtHostel: Boolean,
      roomNumber: String,
      currentAddress: String,
    },
  },
  parentDetails: {
    father: {
      name: String,
      contactNumber: String,
      occupation: String,
      address: String,
      email: String,
    },
    mother: {
      name: String,
      contactNumber: String,
      occupation: String,
      address: String,
      email: String,
    },
  },
  bankDetails: {
    bankName: String,
    ifscCode: String,
    accountNumber: String,
  },
  academicDetails: {
    ssc: {
      instituteName: String,
      board: String,
      yearOfAdmission: Number,
      yearOfPassing: Number,
      marksObtained: Number,
    },
    hsc: {
      instituteName: String,
      board: String,
      yearOfAdmission: Number,
      yearOfPassing: Number,
      marksObtained: Number,
    },
    diploma: {
      instituteName: String,
      board: String,
      yearOfAdmission: Number,
      yearOfPassing: Number,
      marksObtained: Number,
    },
    entranceExam: {
      name: String,
      marks: Number,
    },
  },
  engineeringDetails: {
    semesters: [semesterSchema],
  },
  portfolioDetails: {
    skills: [String],
    competitions: [{ name: String, result: String }],
    internships: [{ companyName: String, duration: String, role: String }],
  },
  healthDetails: {
    majorHealthProblem: String,
    sufferingFrom: {
      name: String,
      date: Date,
    },
    treatment: {
      doctorName: String,
      contactNumber: String,
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdminApproved: {
    type: Boolean,
    default: false,
  },
});

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);
export default Student;
