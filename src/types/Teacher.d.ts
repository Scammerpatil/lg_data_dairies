import { Student } from "./Student";

export type Teacher = {
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
