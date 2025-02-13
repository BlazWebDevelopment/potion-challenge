"use client";

import { useState, useEffect } from "react";
import Logo from "./ui/logo";
import Avatar from "./ui/avatar";
import MobileSidebar from "../components/Navigation/MobileSidebar";

import AvatarIcon from "@/assets/avatar.webp";

function MobileHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        !(event.target as Element).closest(".mobile-sidebar")
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <div className="flex flex-row justify-between lg:hidden">
        <div className="flex flex-row gap-20 items-center">
          <Logo />
        </div>
        <div className="flex flex-row gap-12 items-center">
          <Avatar
            avatar={AvatarIcon}
            width={56}
            height={56}
            alt="profile-avatar"
            onClick={toggleSidebar}
            classname="max-md:max-w-10"
          />
        </div>
      </div>
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        userName="Orangie"
        solanaAddress="HmBmSYwYEgEZuBUYuDs9xofyqBAkw4ywugB1d7R7sTGh"
      />
    </>
  );
}

export default MobileHeader;
