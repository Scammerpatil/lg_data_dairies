"use client";
import { ExamDepartment } from "@/types/ExamDepartment";
import { HOD } from "@/types/HOD";
import { LGCoordinator } from "@/types/LgCoordinator";
import { Student } from "@/types/Student";
import { Teacher } from "@/types/Teacher";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type User = Teacher | Student | HOD | LGCoordinator | ExamDepartment | null;

interface UserContextProps {
  user: User;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    console.log("User state has changed:", user);
  }, [user]);

  const handleSetUser = (newUser: User) => {
    console.log("Setting new user:", newUser);
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  console.log("useUser accessed with context:", context);
  return context;
};
