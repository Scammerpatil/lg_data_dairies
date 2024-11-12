export type ExamDepartment = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "exam-department";
  department: string;
  profileImageUrl: string;
  isAdminApproved: boolean;
};
