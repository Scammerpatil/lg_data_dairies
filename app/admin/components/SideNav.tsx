"use client";

import React, { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDENAV_ITEMS } from "../constants";
import { SideNavItem } from "@/types/types";
import { ChevronDown } from "lucide-react";

const SideNav = () => {
  return (
    <div className="fixed hidden h-screen w-auto flex-1 border-r bg-white dark:border-zinc-200 dark:bg-dark md:flex md:w-72">
      <div className="flex w-full flex-col space-y-6">
        <Link
          href="/student/dashboard"
          className="flex h-12 w-full flex-row items-center justify-center space-x-3 border-b border-zinc-200 md:justify-start md:px-6"
        >
          <span className="h-7 w-7 rounded-lg bg-zinc-300" />
          <span className="hidden text-xl font-bold md:flex">
            LG Data Dairies
          </span>
        </Link>

        <div className="flex flex-col space-y-2  md:px-6 ">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
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

  return (
    <>
      <div className="">
        {item.submenu ? (
          <>
            <button
              onClick={toggleSubMenu}
              className={`hover-bg-zinc-100 flex w-full flex-row items-center justify-between rounded-lg p-2 hover:bg-slate-800 hover:text-white hover:dark:bg-zinc-100 hover:dark:text-dark ${
                pathname.includes(item.path)
                  ? "bg-slate-800 text-white dark:bg-zinc-100 dark:text-black"
                  : "hover:bg-slate-800 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-black"
              }`}
            >
              <div className="flex flex-row items-center space-x-4">
                {item.icon}
                <span className="flex text-lg font-medium">{item.title}</span>
              </div>

              <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
                <ChevronDown width="24" height="24" />
              </div>
            </button>

            {subMenuOpen && (
              <div className="my-2 ml-12 flex flex-col space-y-4">
                {item.subMenuItems?.map((subItem, idx) => {
                  return (
                    <Link
                      key={idx}
                      href={subItem.path}
                      className={`${
                        subItem.path === pathname ? "font-semibold" : ""
                      }`}
                    >
                      <span>{subItem.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <Link
            href={item.path}
            className={`flex flex-row items-center space-x-4 rounded-lg p-2 hover:bg-slate-800 hover:text-white hover:dark:bg-zinc-100 hover:dark:text-dark ${
              item.path === pathname
                ? "bg-slate-800 text-white dark:bg-zinc-100 dark:text-black"
                : "hover:bg-slate-800 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-black"
            }`}
          >
            {item.icon}
            <span className="flex text-lg font-medium">{item.title}</span>
          </Link>
        )}
      </div>
    </>
  );
};
