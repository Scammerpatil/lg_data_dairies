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
    path: "/lg/home",
    icon: <HomeIcon width="24" height="24" />,
  },
  {
    title: "Students",
    path: "/lg/students",
    icon: <Clipboard width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add Student", path: "/lg/students/add" },
      { title: "Remove Student", path: "/lg/students/remove" },
    ],
  },
  {
    title: "Details",
    path: "/lg/details",
    icon: <Clipboard width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add Marks", path: "/lg/details/marks" },
      { title: "Add Attendance", path: "/lg/details/attendance" },
    ],
  },
  {
    title: "Notices",
    path: "/lg/notices",
    icon: <Bell width="24" height="24" />,
  },
  {
    title: "Messages",
    path: "/lg/messages",
    icon: <Mail width="24" height="24" />,
  },
  {
    title: "Help",
    path: "/lg/help",
    icon: <HelpCircle width="24" height="24" />,
  },
];
