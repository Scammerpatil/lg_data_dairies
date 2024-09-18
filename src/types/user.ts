import { teacher } from "./teacher";

export type User = {
  _id: string;
  name: string;
  email: string;
  lgTeacher?: teacher;
  profileImage?: string;
  role: string;
  studentUnder?: string[];
  department: string;
};
