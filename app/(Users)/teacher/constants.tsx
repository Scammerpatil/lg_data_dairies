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
    submenu: true,
    subMenuItems: [
      { title: "Add Student", path: "/teacher/students/add" },
      { title: "Remove Student", path: "/teacher/students/remove" },
    ],
  },
  {
    title: "Details",
    path: "/teacher/details",
    icon: <Clipboard width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add Marks", path: "/teacher/details/marks" },
      { title: "Add Attendance", path: "/teacher/details/attendance" },
    ],
  },
  {
    title: "Notices",
    path: "/teacher/notices",
    icon: <Bell width="24" height="24" />,
  },
  {
    title: "Messages",
    path: "/teacher/messages",
    icon: <Mail width="24" height="24" />,
  },
  {
    title: "Help",
    path: "/teacher/help",
    icon: <HelpCircle width="24" height="24" />,
  },
];
