export type LGCoordinator = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "lg-coordinator";
  profileImageUrl: string;
  department: string;
  isAdminApproved: boolean;
};
