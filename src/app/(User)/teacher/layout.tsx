"use client";
import ToastContainer from "@/components/ToastContainer";
import SideNav from "../components/SideNav";
import useUser from "@/hooks/useUser";
import { SIDENAV_ITEMS } from "./constant";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import "@/app/style.css";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useUser();
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
}
