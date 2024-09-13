"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS } from "../constants";
import { SideNavItem } from "@/types/types";
import { ChevronDown } from "lucide-react";

const SideNav = () => {
  return (
    <div className="fixed hidden h-screen flex-1 border-r bg-white dark:border-zinc-700 dark:bg-black md:flex md:w-64">
      <div className="flex w-full flex-col space-y-6">
        <Link
          href="/student/dashboard"
          className="flex h-16 w-full flex-row items-center justify-center space-x-3 border-b border-zinc-200 dark:border-zinc-700 md:justify-start md:px-6"
        >
          <span className="h-7 w-7 rounded-lg bg-zinc-300 dark:bg-zinc-600" />
          <span className="hidden text-xl font-bold text-gray-800 dark:text-gray-200 md:flex">
            LG Data Dairies
          </span>
        </Link>

        <div className="flex flex-col space-y-2 md:px-6">
          {SIDENAV_ITEMS.map((item, idx) => (
            <MenuItem key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const baseClasses =
    "flex w-full flex-row items-center justify-between rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700";
  const activeClasses =
    "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
  const inactiveClasses =
    "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200";

  return (
    <div>
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`${baseClasses} ${
              pathname.includes(item.path) ? activeClasses : inactiveClasses
            }`}
          >
            <div className="flex flex-row items-center space-x-4">
              {item.icon}
              <span className="text-lg font-medium">{item.title}</span>
            </div>

            <div
              className={`transition-transform ${
                subMenuOpen ? "rotate-180" : ""
              } flex`}
            >
              <ChevronDown width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-4 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => (
                <Link
                  key={idx}
                  href={subItem.path}
                  className={`block rounded-lg p-2 ${
                    subItem.path === pathname
                      ? "font-semibold text-gray-800 dark:text-gray-100"
                      : "text-gray-600 dark:text-gray-400"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <span>{subItem.title}</span>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row items-center space-x-4 rounded-lg p-2 ${
            item.path === pathname ? activeClasses : inactiveClasses
          }`}
        >
          {item.icon}
          <span className="text-lg font-medium">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
