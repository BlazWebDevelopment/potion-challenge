"use client";

import React from "react";

import { PiDiscordLogoFill } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";

function Socials() {
  return (
    <div className="flex flex-row gap-6">
      <button>
        <FaXTwitter
          size={32}
          className="text-secondary hover:text-secondary-hover"
        />
      </button>
      <button>
        <PiDiscordLogoFill
          size={32}
          className="text-secondary hover:text-secondary-hover"
        />
      </button>
    </div>
  );
}

export default Socials;
