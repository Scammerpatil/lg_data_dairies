import { Providers } from "@/app/providers";
import Header from "./Header";
import "@/styles/index.css";
import { Inter } from "next/font/google";

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
        <div className="flex flex-col">
          <Header />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
