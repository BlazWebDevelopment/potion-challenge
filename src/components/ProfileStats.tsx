"use client";

import React, { useState } from "react";
import AvatarLarge from "./ui/avatar-large";
import TimeTabsNavBar from "./ui/table-nav-stats";

import { ProfileStatsCloser } from "./ProfileStatsCloser";
import { Trader } from "@/types/trader";

function ProfileStats({
  trader,
  handleRefetch,
}: {
  trader: Trader;
  handleRefetch: () => void;
}) {
  const [activeTimeTab, setActiveTimeTab] = useState("daily");

  return (
    <div>
      <div className="flex flex-row gap-10 max-navTab:flex-col">
        <div className="w-1/4 max-navTab:w-full">
          <AvatarLarge
            alt={`${trader.name}_avatar`}
            avatar={trader.avatar}
            name={trader.name}
            solAdress={trader.address}
          />
        </div>
        <div className="w-3/4 flex flex-col gap-2.5 max-navTab:w-full">
          <TimeTabsNavBar
            handleRefetch={handleRefetch}
            activeTimeTab={activeTimeTab}
            setActiveTimeTab={setActiveTimeTab}
          />
          <ProfileStatsCloser trader={trader} />
        </div>
      </div>
    </div>
  );
}

export default ProfileStats;
