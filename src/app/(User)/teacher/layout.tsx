"use client";
import ToastContainer from "@/components/ToastContainer";
import SideNav from "../components/SideNav";
import { SIDENAV_ITEMS } from "./constant";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import "@/app/style.css";
import ScrollToTop from "@/components/ScrollToTop";
import { UserProvider, useUser } from "@/context/useAuth";
import { useEffect } from "react";
import axios from "axios";
import { Teacher } from "@/types/Teacher";

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
        setUser(response.data as Teacher);
      } catch (error) {
        console.log(error);
      }
    };
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <title>VidyaRaksha | Guiding Knowledge, Securing Futures</title>
      </head>
      <body className={`${inter.className}`}>
        <ToastContainer />
        <SideNav router={router} sidebar={SIDENAV_ITEMS ?? []}>
          {children}
        </SideNav>
        <ScrollToTop />
      </body>
    </html>
  );
};

export default RootLayout;
