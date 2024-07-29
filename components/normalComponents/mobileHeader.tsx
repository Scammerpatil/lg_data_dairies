"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SideNavItem } from "@/types/types";
import { motion, useCycle } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Dynamically import SIDENAV_ITEMS based on route
const loadSidenavItems = async (pathname: string) => {
  let module: any;

  // Determine which module to load based on the general part of the pathname
  if (pathname.includes("/student")) {
    module = await import("@/app/(Users)/student/constants");
  } else if (pathname.includes("/teacher")) {
    module = await import("@/app/(Users)/teacher/constants");
  } else if (pathname.includes("/hod")) {
    module = await import("@/app/(Users)/hod/constants");
  } else if (pathname.includes("/admin")) {
    module = await import("@/app/admin/constants");
  } else {
    module = await import("@/app/(Users)/student/constants");
  }

  return module.SIDENAV_ITEMS || [];
};

type MenuItemWithSubMenuProps = {
  item: SideNavItem;
  toggleOpen: () => void;
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 100% 0)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const MobileHeader = () => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [sidenavItems, setSidenavItems] = useState<SideNavItem[]>([]);

  useEffect(() => {
    const fetchSidenavItems = async () => {
      console.log("Fetching sidenav items for", pathname);
      const items = await loadSidenavItems(pathname);
      setSidenavItems(items);
    };

    fetchSidenavItems();
  }, [pathname]);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      className={`fixed inset-0 z-50 w-full md:hidden ${
        isOpen ? "" : "pointer-events-none"
      }`}
      ref={containerRef}
    >
      <motion.div
        className="absolute inset-0 right-0 h-full w-full bg-white dark:bg-black"
        variants={sidebar}
      />
      <motion.ul
        variants={variants}
        className="absolute grid max-h-screen w-full gap-3 overflow-y-auto px-6 py-16"
      >
        {sidenavItems.map((item, idx) => {
          const isLastItem = idx === sidenavItems.length - 1;

          return (
            <div key={idx}>
              {item.submenu ? (
                <MenuItemWithSubMenu item={item} toggleOpen={toggleOpen} />
              ) : (
                <MenuItem>
                  <Link
                    href={item.path}
                    onClick={() => toggleOpen()}
                    className={`flex w-full text-lg ${
                      item.path === pathname ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {item.title}
                  </Link>
                </MenuItem>
              )}

              {!isLastItem && (
                <MenuItem className="my-3 h-px w-full bg-gray-300" />
              )}
            </div>
          );
        })}
      </motion.ul>
      <MenuToggle toggle={toggleOpen} />
    </motion.nav>
  );
};

export default MobileHeader;

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
  <button
    onClick={toggle}
    className="pointer-events-auto absolute right-4 top-4 z-30 rounded-md bg-white p-2 dark:bg-zinc-100"
  >
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      className="text-black dark:text-white"
      fill="#000"
    >
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);

const Path = (props: any) => (
  <motion.path
    fill="none"
    strokeWidth="2"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuItem = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <motion.li variants={MenuItemVariants} className={className}>
      {children}
    </motion.li>
  );
};

const MenuItemWithSubMenu: React.FC<MenuItemWithSubMenuProps> = ({
  item,
  toggleOpen,
}) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <>
      <MenuItem>
        <button
          className="flex w-full items-center justify-between text-lg"
          onClick={() => setSubMenuOpen(!subMenuOpen)}
        >
          <span
            className={`${
              pathname.includes(item.path) ? "font-semibold" : "font-medium"
            }`}
          >
            {item.title}
          </span>
          <ChevronDown
            width="24"
            height="24"
            className={`${subMenuOpen ? "rotate-180" : ""}`}
          />
        </button>
      </MenuItem>
      {subMenuOpen && (
        <div className="ml-4 mt-2 flex flex-col space-y-2">
          {item.subMenuItems?.map((subItem, subIdx) => (
            <MenuItem key={subIdx}>
              <Link
                href={subItem.path}
                onClick={() => toggleOpen()}
                className={`text-sm ${
                  subItem.path === pathname ? "font-semibold" : "font-medium"
                }`}
              >
                {subItem.title}
              </Link>
            </MenuItem>
          ))}
        </div>
      )}
    </>
  );
};

const MenuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration: 0.02,
    },
  },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.02, delayChildren: 0.15 },
  },
  closed: {
    transition: { staggerChildren: 0.01, staggerDirection: -1 },
  },
};

const useDimensions = (ref: React.RefObject<HTMLDivElement>) => {
  const dimensions = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
};
