import Header from "./Header";
import ToastContainer from "@/components/ToastContainer";

import { Inter } from "next/font/google";

import "@/app/style.css";

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
