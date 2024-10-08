import mongoose, { Schema, Types } from "mongoose";
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
  year: {
    type: String,
  },
  studentUnder: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
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
  isLG: {
    type: Boolean,
    default: false,
  },
  profileImageUrl: {
    type: String,
  },
});
const Teacher =
  mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);
export default Teacher;
