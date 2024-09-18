import { Student } from "./student";
import { teacher } from "./teacher";

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
