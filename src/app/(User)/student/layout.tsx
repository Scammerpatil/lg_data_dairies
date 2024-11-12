"use client";
import ToastContainer from "@/components/ToastContainer";
import SideNav from "../components/SideNav";
import ScrollToTop from "@/components/ScrollToTop";
import { SIDENAV_ITEMS } from "./constant";
import { UserProvider } from "@/context/useAuth";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import "@/app/style.css";

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
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <title>VidyaRaksha | Guiding Knowledge, Securing Futures</title>
      </head>
      <body className={`${inter.className}`}>
        <ToastContainer />
        <SideNav router={router} user={user} sidebar={SIDENAV_ITEMS ?? []}>
          {children}
        </SideNav>
        <ScrollToTop />
      </body>
    </html>
  );
};

export default RootLayout;
