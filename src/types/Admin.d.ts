export type Admin = {
  name: string;
  email: string;
  password: string;
  role: "admin";
  profileImageUrl: string;
  isAdminApproved: boolean;
};
