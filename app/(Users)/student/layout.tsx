"use client";
import Header from "@/components/normalComponents/Header";
import MobileHeader from "@/components/normalComponents/mobileHeader";
import ToastContainer from "@/components/ToastContainer";
import { CookiesProvider } from "next-client-cookies/server";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "react-modal-video/css/modal-video.css";
import "@/styles/index.css";
import { Providers } from "../../providers";
import Footer from "../../../components/normalComponents/Footer";
import MarginWidthWrapper from "../../../components/normalComponents/MarginWidthWrapper";
import SideNav from "./components/SideNav";
import useTransition from "@/hooks/useTransition";

const inter = Inter({ subsets: ["latin"] });

export default function StudentLayout({
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
        <Providers>
          <ToastContainer />
          <div className="flex">
            <SideNav />
            <main className="flex-1">
              <MarginWidthWrapper>
                <Header />
                <MobileHeader />
                <div className="relative">
                  <div className="absolute left-0 top-0 z-[-1]">
                    <svg
                      width="full"
                      height="800"
                      viewBox="0 0 1440 700"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_95:1005"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="1440"
                        height="969"
                      >
                        <rect width="1440" height="969" fill="#090E34"></rect>
                      </mask>
                      <g mask="url(#mask0_95:1005)">
                        <path
                          opacity="0.1"
                          d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                          fill="url(#paint0_linear_95:1005)"
                        ></path>
                        <path
                          opacity="0.1"
                          d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                          fill="url(#paint1_linear_95:1005)"
                        ></path>
                      </g>
                      <defs>
                        <linearGradient
                          id="paint0_linear_95:1005"
                          x1="1178.4"
                          y1="151.853"
                          x2="780.959"
                          y2="453.581"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#4A6CF7"></stop>
                          <stop
                            offset="1"
                            stopColor="#4A6CF7"
                            stopOpacity="0"
                          ></stop>
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_95:1005"
                          x1="160.5"
                          y1="220"
                          x2="1099.45"
                          y2="1192.04"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#4A6CF7"></stop>
                          <stop
                            offset="1"
                            stopColor="#4A6CF7"
                            stopOpacity="0"
                          ></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <main className="min-h-screen">{children}</main>
                </div>
                <ScrollToTop />
                <Footer />
              </MarginWidthWrapper>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
