import { Student } from "./Student";
import { teacher } from "./Teacher";

export type Leave = {
  _id: string;
  studentId: Student;
  teacherId: teacher;
  leaveType: "Sick" | "Casual" | "Academic" | "Other";
  startDate: Date;
  endDate: Date;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
};
