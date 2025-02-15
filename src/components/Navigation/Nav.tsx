"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import { MdOutlineLeaderboard } from "react-icons/md";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { TbCurrencySolana } from "react-icons/tb";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  link: string;
  icon: IconType;
};

function Nav() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      name: "Leaderboard",
      link: "/",
      icon: MdOutlineLeaderboard,
    },
    {
      name: "Learn",
      link: "https://docs.potionvision.com/",
      icon: MdOutlineLibraryBooks,
    },
    {
      name: "Prizes",
      link: "https://docs.potionvision.com/",
      icon: TbCurrencySolana,
    },
  ];

  return (
    <nav className="flex flex-row gap-16 max-lg:flex-col max-lg:gap-3 max-lg:items-center">
      {navItems.map((navItem) => {
        const isActive = pathname === navItem.link;

        return (
          <Link
            key={navItem.name}
            href={navItem.link}
            className={cn(
              "group relative flex items-center gap-2 transition-colors duration-200",
              "max-lg:w-full  max-lg:px-6 max-lg:py-2",
              "max-lg:justify-start max-lg:py-3 max-lg:pl-6",
              "text-white/80 hover:text-white max-lg:rounded-r-2xl",
              isActive && "bg-background text-white",
              !isActive && "max-lg:hover:bg-background/50"
            )}
          >
            <navItem.icon
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                "lg:hidden",
                "max-lg:block",
                "group-hover:scale-110"
              )}
            />
            <span
              className={cn(
                "font-bold text-lg transition-all duration-200",
                "max-lg:text-base max-lg:font-normal",
                "max-lg:text-sm",
                isActive && "max-lg:font-medium"
              )}
            >
              {navItem.name}
            </span>
            {isActive && (
              <div className="absolute -bottom-1 left-0 hidden h-[1.5px] w-full overflow-hidden lg:block">
                <div className="h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-purple/80 to-transparent" />
              </div>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export default Nav;
