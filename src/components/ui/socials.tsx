"use client";

import React from "react";

import { PiDiscordLogoFill } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

function Socials() {
  return (
    <div className="flex flex-row gap-6">
      <Link href={"https://x.com/potionalpha"}>
        <FaXTwitter
          size={32}
          className="text-secondary hover:text-secondary-hover"
        />
      </Link>
      <Link href={"https://x.com/potionalpha"}>
        <PiDiscordLogoFill
          size={32}
          className="text-secondary hover:text-secondary-hover"
        />
      </Link>
    </div>
  );
}

export default Socials;
