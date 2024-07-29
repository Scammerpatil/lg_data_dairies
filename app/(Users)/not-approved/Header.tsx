"use client";
import { useState, useEffect } from "react";
import ThemeToggler from "@/components/Header/ThemeToggler";
import useScroll from "@/hooks/useScroll";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/hover";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

const DesktopHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const fetchProfilePic = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const name = user.name;
        const response = await axios.get(
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            name,
          )}&background=random&rounded=true&size=128`,
        );
        setProfilePic(response.request.responseURL);
      }
    };
    fetchProfilePic();
  }, []);
  const handleLogout = async () => {
    localStorage.removeItem("user");
    const response = axios.get("/api/logout");
    toast.promise(response, {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Failed to logout",
    });
    router.push("/signin");
  };

  return (
    <>
      <nav className="sticky top-0 flex items-center justify-between bg-transparent px-8">
        <div
          className={cn(
            `sticky inset-x-0 top-0 z-30 w-full py-2 transition-all lg:px-10`,
            {
              "border-b backdrop-blur-lg": scrolled,
              "border-b": selectedLayout,
            },
          )}
        >
          <div className="flex h-[50px] items-center justify-between px-4 py-4 pr-16">
            <div className="flex items-center ">
              <div className="w-60 px-4 xl:mr-12">
                <Link href="/" className={`block w-full ${"py-5 lg:py-2"}`}>
                  <Image
                    src="/images/logo/logo-2.svg"
                    alt="logo"
                    width={140}
                    height={30}
                    className="w-full dark:hidden"
                  />
                  <Image
                    src="/images/logo/logo.svg"
                    alt="logo"
                    width={140}
                    height={30}
                    className="hidden w-full dark:block"
                  />
                </Link>
              </div>
              <Link
                href="/"
                className="flex flex-row items-center justify-center space-x-3 md:hidden"
              >
                <span className="h-7 w-7 rounded-lg bg-white" />
                <span className="flex text-xl font-bold">LG Data Dairies</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2 md:pr-12">
              <span className="text-base font-semibold">Home</span>
              {pathSegments.map((segment, index) => (
                <React.Fragment key={index}>
                  <ChevronRight className="h-4 w-4" />
                  <Link
                    href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                    className={`text-base font-semibold capitalize hover:underline ${
                      index === pathSegments.length - 1 ? "text-gray-500" : ""
                    }`}
                  >
                    {segment}
                  </Link>
                </React.Fragment>
              ))}
            </div>
            <div className="hidden md:block">
              <div className="flex h-8 items-center justify-center gap-4 rounded-full text-center">
                <ThemeToggler />
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-400 text-sm font-semibold dark:bg-slate-900">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      {profilePic && (
                        <Image
                          src={profilePic}
                          alt="Profile Pic"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>
                        <button
                          onClick={handleLogout}
                          className="hover:cursor-pointer"
                        >
                          Logout
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default DesktopHeader;
