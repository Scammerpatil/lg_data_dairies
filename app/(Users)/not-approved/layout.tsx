"use client";
import ToastContainer from "@/components/ToastContainer";
import { Providers } from "@/app/providers";
import Header from "./Header";
import "@/styles/index.css";
import { Inter } from "next/font/google";
import useTransition from "@/hooks/useTransition";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useTransition();
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <title>LG Data Diaries | R. C. Patel Institute of Technology</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <div className="flex max-h-screen flex-col">
          <Header />
          <ToastContainer />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
