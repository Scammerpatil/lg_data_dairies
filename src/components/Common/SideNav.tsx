"use client";
import { AlignJustify, ChevronDown } from "lucide-react";
import React from "react";

const SideNavSkeleton = () => {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col animate-pulse">
          <div
            className="navbar justify-between w-full pl-10 bg-gray-100 h-16"
            style={{
              background: "rgba(85, 114, 150, 0.27)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10.8px)",
              WebkitBackdropFilter: "blur(10.8px)",
              border: "1px solid rgba(85, 114, 150, 0.3)",
            }}
          >
            <div className="flex-none lg:hidden">
              <div className="btn btn-square btn-ghost text-gray-900">
                <AlignJustify className="h-6 w-6" />
              </div>
            </div>
            <div className="flex-1 lg:hidden px-2">
              <div className="h-6 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="block">
              <div className="flex items-center gap-4 bg-transparent">
                <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="px-10 py-7 min-h-screen">
            <div className="h-full bg-gray-100 rounded"></div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <div
            className="menu text-base-content min-h-full w-80 p-4"
            style={{
              background: "rgba(85, 114, 150, 0.27)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10.8px)",
              WebkitBackdropFilter: "blur(10.8px)",
              border: "1px solid rgba(85, 114, 150, 0.3)",
            }}
          >
            <div className="flex h-16 w-full items-center justify-center space-x-3 border-b border-gray-300 md:justify-start md:px-6">
              <div className="h-10 w-10 bg-gray-300 rounded-lg"></div>
              <div className="h-6 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex flex-col space-y-4 mt-10 md:px-6">
              {/* Sidebar items skeleton */}
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex w-full items-center justify-between rounded-lg p-2 bg-gray-200 h-12"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                    <div className="h-6 w-32 bg-gray-300 rounded"></div>
                  </div>
                  <ChevronDown className="h-6 w-6 text-gray-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavSkeleton;
