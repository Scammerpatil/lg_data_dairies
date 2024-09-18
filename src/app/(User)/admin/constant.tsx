import { HomeIcon, Users, UserCheck } from "lucide-react";
import { SideNavItem } from "@/types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/admin/dashboard",
    icon: <HomeIcon width="24" height="24" />,
  },
  {
    title: "Manage HODs",
    path: "/admin/dashboard/managehods",
    icon: <UserCheck width="24" height="24" />,
  },
  {
    title: "Manage Teachers",
    path: "/admin/dashboard/manageteachers",
    icon: <Users width="24" height="24" />,
  },
  {
    title: "Manage Students",
    path: "/admin/dashboard/managestudents",
    icon: <Users width="24" height="24" />,
  },
];
