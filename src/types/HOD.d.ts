import { HOD } from "@/models/HOD";
export type HOD = {
  _id: string;
  name: string;
  department: string;
  email: string;
  profileImageUrl?: string;
  isAdminApproved: boolean;
};
