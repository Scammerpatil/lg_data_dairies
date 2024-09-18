import Header from "@/components/Header";
import ToastContainer from "@/components/ToastContainer";

import { Inter } from "next/font/google";

import "../style.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
}
