"use client";

import ThemeToggler from "@/components/Header/ThemeToggler";
import useScroll from "@/hooks/useSroll";
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
} from "./shadcn/hover";
import axios from "axios";
import toast from "react-hot-toast";

const DesktopHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  const handleLogout = async () => {
    localStorage.removeItem("user");
    const response = axios.get("/api/logout");
    router.push("/signin");
    toast.promise(response, {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Failed to logout",
    });
  };

  return (
    <>
      <nav className="border-bpx-8 sticky top-0 flex items-center justify-between dark:bg-[#1e232e]">
        <div
          className={cn(
            `sticky inset-x-0 top-0 z-30 w-full transition-all lg:px-10`,
            {
              "border-b backdrop-blur-lg": scrolled,
              "border-b": selectedLayout,
            },
          )}
        >
          <div className="flex h-[47px] items-center justify-between px-4 pr-16">
            <div className="flex items-center ">
              <Link
                href="/"
                className="flex flex-row items-center justify-center space-x-3 md:hidden"
              >
                <span className="h-7 w-7 rounded-lg bg-white" />
                <span className="flex text-xl font-bold">LG Data Dairies</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2 md:pr-12">
              <span className="text-sm font-semibold">Home</span>
              {pathSegments.map((segment, index) => (
                <React.Fragment key={index}>
                  <span className="text-sm">
                    <ChevronRight />
                  </span>
                  <span className="text-sm capitalize">
                    {segment.replace(/-/g, " ")}
                  </span>
                </React.Fragment>
              ))}
            </div>

            <div className="hidden md:block">
              <div className="flex h-8 items-center justify-center gap-4 rounded-full text-center">
                <ThemeToggler />
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-400 text-sm font-semibold dark:bg-slate-900">
                  <DropdownMenu>
                    <DropdownMenuTrigger>SP</DropdownMenuTrigger>
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
