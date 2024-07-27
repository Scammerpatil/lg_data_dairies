import { HomeIcon, User, Bell, HelpCircle, Calendar } from "lucide-react";
import { SideNavItem } from "@/types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/student/dashboard",
    icon: <HomeIcon width="24" height="24" />,
  },
  {
    title: "Details",
    path: "/student/details",
    icon: <User width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View Details", path: "/student/details/view" },
      { title: "Update Details", path: "/student/details/update" },
    ],
  },
  {
    title: "Notices",
    path: "/student/notices",
    icon: <Bell width="24" height="24" />,
  },
  {
    title: "Leave",
    path: "/student/leave",
    icon: <Calendar width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Apply Leave", path: "/student/leave/apply" },
      { title: "On Duty Leave", path: "/student/leave/on-duty" },
      { title: "Leave Status", path: "/student/leave/status" },
    ],
  },
  {
    title: "Help",
    path: "/student/help",
    icon: <HelpCircle width="24" height="24" />,
  },
];
