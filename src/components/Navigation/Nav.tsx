"use client";

import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

import { MdOutlineLeaderboard } from "react-icons/md";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { TbCurrencySolana } from "react-icons/tb";

type NavItem = {
  name: string;
  link: string;
  icon: IconType;
};

function Nav() {
  const navItems: NavItem[] = [
    {
      name: "Leaderboard",
      link: "https://docs.potionvision.com/",
      icon: MdOutlineLeaderboard,
    },
    {
      name: "Learn",
      link: "https://docs.potionvision.com/",
      icon: MdOutlineLibraryBooks,
    },
    { name: "Prizes", link: "/", icon: TbCurrencySolana },
  ];
  return (
    <nav className="flex flex-row gap-16 max-lg:flex-col max-lg:gap-3 max-lg:items-center">
      {navItems.map((navItem) => (
        <Link
          key={navItem.name}
          href={navItem.link}
          className="max-lg:flex max-lg:gap-2 max-lg:items-center max-lg:rounded-lg max-lg:px-6 max-lg:w-full max-lg:py-1.5 hover:text-white/70 text-white max-lg:text-white/80"
        >
          <navItem.icon className="lg:hidden" />
          <span className="font-bold text-lg max-lg:text-base max-lg:font-normal">
            {navItem.name}
          </span>
        </Link>
      ))}
    </nav>
  );
}

export default Nav;
