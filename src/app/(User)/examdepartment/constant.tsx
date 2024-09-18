import {
  HomeIcon,
  Users,
  Clipboard,
  Book,
  ArrowUpCircle,
  HelpCircle,
} from "lucide-react";
import { SideNavItem } from "@/types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/examdepartment/dashboard",
    icon: <HomeIcon width="24" height="24" />,
  },
  {
    title: "Promote Students",
    path: "/examdepartment/promote",
    icon: <Users width="24" height="24" />,
  },
  {
    title: "Subjects",
    path: "/examdepartment/subjects",
    icon: <Book width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add Subjects", path: "/examdepartment/subjects/add" },
      { title: "View Subjects", path: "/examdepartment/subjects/view" },
    ],
  },
  {
    title: "Results",
    path: "/examdepartment/results",
    icon: <Clipboard width="24" height="24" />,
  },
  {
    title: "Promotions",
    path: "/examdepartment/promotions",
    icon: <ArrowUpCircle width="24" height="24" />,
  },
  {
    title: "Help",
    path: "/examdepartment/help",
    icon: <HelpCircle width="24" height="24" />,
  },
];
