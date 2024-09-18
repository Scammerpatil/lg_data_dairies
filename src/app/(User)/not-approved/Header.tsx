"use client";

import ThemeToggler from "@/components/Header/ThemeToggler";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import MyImage from "@/components/Header/Image";
import { ChevronRight } from "lucide-react";

const DesktopHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const [user, setUser] = useState({
    profileImage: "",
    name: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")!);
    if (!storedUser) {
      router.push("/signin");
    }
    setUser(storedUser);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    const response = axios.get("/api/auth/logout");
    router.push("/signin");
    toast.promise(response, {
      loading: "Logging out...",
      success: () => {
        router.push("/");
        return "Logged out successfully";
      },
      error: "Failed to logout",
    });
  };

  return (
    <header className="header left-0 top-0 h-28 z-40 flex w-full items-center fixed bg-base-300 !bg-opacity-80 shadow-sticky backdrop-blur-sm transition dark:bg-gray-dark dark:shadow-sticky-dark">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center justify-start w-60 max-w-full px-10 xl:mr-12">
          <Link href="/" className="header-logo w-full flex items-center">
            <MyImage />
          </Link>
        </div>

        <div className="flex items-center justify-center w-1/3 space-x-2">
          <span className="text-sm font-semibold">Home</span>
          {pathSegments.map((segment, index) => (
            <React.Fragment key={index}>
              <span className="text-sm">
                <ChevronRight />
              </span>
              <Link href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
                <span className="text-sm capitalize hover:text-primary transition">
                  {segment.replace(/-/g, " ")}
                </span>
              </Link>
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center justify-end w-1/3 gap-5">
          <div className="flex items-center gap-4 bg-transparent">
            <div className="dropdown cursor-pointer bg-transparent">
              <div tabIndex={0} role="button" className="btn m-1 w-full">
                <img
                  src={
                    user?.profileImage
                      ? user.profileImage
                      : "https://avatar.iran.liara.run/public"
                  }
                  alt="Avatar"
                  className="h-12 w-12"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                {/* User Initial */}
                <div className="flex items-center justify-center mb-2">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full text-xl font-bold">
                    {user && user.name?.split(" ")[0][0]}
                  </div>
                </div>

                {/* Horizontal Rule */}
                <hr className="my-2 border-gray-300" />

                {/* Dropdown Items */}
                <div className="flex flex-col">
                  <button
                    onClick={() => router.push("/account")}
                    className="text-left px-4 py-2 text-base text-dark hover:bg-base-200 transition duration-200"
                  >
                    My Account
                  </button>
                  <button
                    onClick={() => router.push("/profile")}
                    className="text-left px-4 py-2 text-base text-dark hover:bg-base-200 transition duration-200"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-left px-4 py-2 text-base text-dark hover:bg-base-200 transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              </ul>
            </div>
          </div>
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
