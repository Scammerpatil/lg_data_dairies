import {
  HomeIcon,
  Users,
  Clipboard,
  Bell,
  Mail,
  HelpCircle,
} from "lucide-react";
import { SideNavItem } from "@/types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/hod/home",
    icon: <HomeIcon width="24" height="24" />,
  },
  {
    title: "Manage LGs",
    path: "/hod/manage-lgs",
    icon: <Users width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Approve LGs", path: "/hod/manage-lgs/approve" },
      { title: "Assign LGs", path: "/hod/manage-lgs/assign" },
    ],
  },
  {
    title: "Students",
    path: "/hod/students",
    icon: <Clipboard width="24" height="24" />,
  },
  {
    title: "Notices",
    path: "/hod/notices",
    icon: <Bell width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add Notice", path: "/hod/notices/add" },
      { title: "View Notices", path: "/hod/notices/view" },
    ],
  },
  {
    title: "Messages",
    path: "/hod/messages",
    icon: <Mail width="24" height="24" />,
  },
  {
    title: "Help",
    path: "/hod/help",
    icon: <HelpCircle width="24" height="24" />,
  },
];
