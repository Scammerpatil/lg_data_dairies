"use client";
import Header from "./Header";
import ToastContainer from "@/components/ToastContainer";
import { Inter } from "next/font/google";
import "@/app/style.css";
import { useRouter } from "next/navigation";
import { UserProvider, useUser } from "@/context/useAuth";
import { useEffect } from "react";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });
const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <UserProvider>
      <MainContent>{children}</MainContent>
    </UserProvider>
  );
};

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/verifyToken");
        if (response.data.data === null) {
          setUser(response.data);
        }
        setUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>VidyaRaksha | Guiding Knowledge, Securing Futures</title>
      </head>
      <body className={`${inter.className}`}>
        <ToastContainer />
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
