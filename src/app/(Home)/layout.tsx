import Header from "@/components/Header";
import ToastContainer from "@/components/ToastContainer";
import { Inter } from "next/font/google";
import "../style.css";
import { UserProvider } from "@/context/useAuth";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <UserProvider>
      <MainContent>{children}</MainContent>
    </UserProvider>
  );
};

const MainContent = ({ children }: { children: React.ReactNode }) => {
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
