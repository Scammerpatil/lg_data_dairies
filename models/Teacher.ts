import mongoose, { Types } from "mongoose";
import Student from "./Student";

// Teacher Schema
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  studentUnder: [Student.schema],
  role: {
    type: String,
    default: "teacher",
  },
  password: {
    type: String,
    required: true,
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
const Teacher =
  mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);
export default Teacher;
