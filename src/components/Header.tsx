"use client";

import React from "react";

import Nav from "./Navigation/Nav";
import Logo from "./ui/logo";
import Avatar from "./ui/avatar";
import Socials from "./ui/socials";

import AvatarIcon from "@/assets/avatar.webp";
import MobileHeader from "./MobileHeader";

function Header() {
  return (
    <div>
      <div className="flex flex-row justify-between max-lg:hidden">
        <div className="flex flex-row gap-20 items-center">
          <Logo />
          <Nav />
        </div>
        <div className="flex flex-row gap-12 items-center">
          <Socials />
          <Avatar
            avatar={AvatarIcon}
            alt="profile-avatar"
            width={56}
            height={56}
            classname="cursor-default"
          />
        </div>
      </div>
      <MobileHeader />
    </div>
  );
}

export default Header;
