import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ToastContainer from "@/components/ToastContainer";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "react-modal-video/css/modal-video.css";
import "@/styles/index.css";
import { Providers } from "../providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <title>LG Data Diaries | R. C. Patel Institute of Technology</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <ToastContainer />
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
