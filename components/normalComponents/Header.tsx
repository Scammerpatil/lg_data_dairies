"use client";
import { useState, useEffect } from "react";
import ThemeToggler from "@/components/Header/ThemeToggler";
import useScroll from "@/hooks/useScroll";
import { ChevronRight, Key, LogOut, User } from "lucide-react";
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
import { Separator } from "@/components/shadcn/hover";

const DesktopHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [profilePic, setProfilePic] = useState("");
  const pathSegments = pathname.split("/").filter(Boolean);
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    try {
      await axios.get("/api/logout");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    } finally {
      router.push("/signin");
    }
  };

  useEffect(() => {
    const fetchProfilePic = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user?.name);
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

  return (
    <nav className="wsticky top-0 z-50 flex items-center justify-between border-b bg-white transition-all dark:bg-[#1e232e]">
      <div
        className={cn("z-30 w-full transition-all lg:px-10", {
          "border-b backdrop-blur-lg": scrolled || selectedLayout,
        })}
      >
        <div className="flex items-center justify-between px-4 pr-16">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-3 md:hidden">
            <span className="h-7 w-7 rounded-lg bg-white" />
            <span className="text-xl font-bold">LG Data Diaries</span>
          </Link>

          {/* Path Segments (Visible on large screens only) */}
          <div className="hidden flex-1 items-center justify-center space-x-2 lg:flex">
            <div className="flex items-center space-x-2">
              <span className="text-base font-semibold">Home</span>
              {pathSegments.map((segment, index) => (
                <React.Fragment key={index}>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
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
          </div>

          {/* Right Side (Theme Toggler and Profile Dropdown) */}
          <div className="flex h-16 w-24 flex-row items-center gap-4 ">
            <ThemeToggler className={"md:h-16 md:w-16"} />
            <DropdownMenu>
              <DropdownMenuTrigger>
                {profilePic ? (
                  <Image
                    src={profilePic}
                    alt="Profile Picture"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 dark:bg-gray-700">
                    <span className="text-white">SP</span>
                  </div>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 rounded-lg bg-white p-4 shadow-lg dark:bg-[#1e232e]">
                <div className="flex flex-col">
                  <Image
                    src="https://images.freeimages.com/image/previews/374/instabutton-png-design-5690390.png?fmt=webp&w=500"
                    height={50}
                    width={50}
                    alt="Profile Picture"
                    className="m-auto mb-2 rounded-full"
                  />
                  <DropdownMenuLabel className="text-base font-semibold">
                    Welcome, {user}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Key className="mr-2 h-4 w-4" />
                    <Link href="/profile">Change Password</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DesktopHeader;
