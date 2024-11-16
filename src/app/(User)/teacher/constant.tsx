import {
  HomeIcon,
  Clipboard,
  UserMinus,
  UserPlus,
  Bell,
  Mail,
  HelpCircle,
} from "lucide-react";
import { SideNavItem } from "@/types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/teacher/dashboard",
    icon: <HomeIcon width="24" height="24" />,
  },
  {
    title: "Students",
    path: "/teacher/students",
    icon: <Clipboard width="24" height="24" />,
  },
  {
    title: "Details",
    path: "/teacher/details",
    icon: <Clipboard width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add Attendance", path: "/teacher/details/attendance" },
    ],
  },
  {
    title: "Leaves",
    path: "/teacher/leaves",
    icon: <UserPlus width="24" height="24" />,
  },
  {
    title: "Notices",
    path: "/teacher/notices",
    icon: <Bell width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add Notice", path: "/teacher/notices/add" },
      { title: "View Notices", path: "/teacher/notices/view" },
    ],
  },
  {
    title: "Help",
    path: "/teacher/help",
    icon: <HelpCircle width="24" height="24" />,
  },
];
