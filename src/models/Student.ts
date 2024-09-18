import mongoose, { Schema } from "mongoose";

// Subschemas
const termTestSchema = new Schema({
  testNumber: Number,
  marks: Number,
});

const semesterSchema = new Schema({
  semesterNumber: Number,
  termTests: [termTestSchema],
  endSemesterMarks: Number,
  attendance: Number,
});

const hostelSchema = new Schema({
  livingAtHostel: Boolean,
  roomNumber: String,
  currentAddress: String,
});

const parentDetailsSchema = new Schema({
  name: String,
  contactNumber: String,
  occupation: String,
  address: String,
  email: String,
});

const academicRecordSchema = new Schema({
  instituteName: String,
  board: String,
  yearOfAdmission: Number,
  yearOfPassing: Number,
  marksObtained: Number,
});

const competitionSchema = new Schema({
  name: String,
  result: String,
});

const internshipSchema = new Schema({
  companyName: String,
  duration: String,
  role: String,
});

const healthSchema = new Schema({
  majorHealthProblem: String,
  sufferingFrom: {
    name: String,
    date: Date,
  },
  treatment: {
    doctorName: String,
    contactNumber: String,
  },
});

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
  },
  prn: {
    type: Number,
    unique: true,
    required: true,
  },
  rollNo: {
    type: Number,
  },
  year: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
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
  profileImageUrl: {
    type: String,
  },
  lgTeacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
  },
  personalDetails: {
    photo: String,
    mobileNumber: String,
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
    hostel: hostelSchema,
  },
  parentDetails: {
    father: parentDetailsSchema,
    mother: parentDetailsSchema,
  },
  bankDetails: {
    bankName: String,
    ifscCode: String,
    accountNumber: String,
  },
  academicDetails: {
    ssc: academicRecordSchema,
    hsc: academicRecordSchema,
    diploma: academicRecordSchema,
  },
  engineeringDetails: {
    semesters: [semesterSchema],
  },
  portfolioDetails: {
    skills: [String],
    competitions: [competitionSchema],
    internships: [internshipSchema],
  },
  healthDetails: healthSchema,
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
