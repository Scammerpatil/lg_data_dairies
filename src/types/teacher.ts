import { Student } from "./student";

export type teacher = {
  _id: string;
  name: string;
  department: string;
  email: string;
  isLG: boolean;
  year: string;
  isAdminApproved: boolean;
  phoneNo: string;
  profileImageUrl: string;
  role: string;
  studentUnder: Student[];
};
