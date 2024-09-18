import {
  HomeIcon,
  Clipboard,
  UserPlus,
  Users,
  FileText,
  MessageCircle,
  BarChart,
} from "lucide-react";
import { SideNavItem } from "@/types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/lg-coordinator/dashboard",
    icon: <HomeIcon width="24" height="24" />,
  },
  {
    title: "Assign Students",
    path: "/lg-coordinator/assign-students",
    icon: <UserPlus width="24" height="24" />,
  },
  {
    title: "Student Information",
    path: "/lg-coordinator/student-information",
    icon: <Clipboard width="24" height="24" />,
  },
  {
    title: "LG List",
    path: "/lg-coordinator/lg-list",
    icon: <Users width="24" height="24" />,
  },
  {
    title: "Summary Report",
    path: "/lg-coordinator/summary-report",
    icon: <BarChart width="24" height="24" />,
  },
  {
    title: "Messages",
    path: "/lg-coordinator/messages",
    icon: <MessageCircle width="24" height="24" />,
  },
];
