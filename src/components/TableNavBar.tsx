"use client";

import { useState } from "react";
import { CiSearch as Search } from "react-icons/ci";

export default function TableNavBar() {
  const [activeMainTab, setActiveMainTab] = useState("traders");
  const [activeTimeTab, setActiveTimeTab] = useState("daily");

  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="flex items-center gap-20">
        {/* Main Tabs */}
        <div className="flex rounded-full">
          {["traders", "groups"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveMainTab(tab)}
              className={`rounded-full py-2 px-4 text-sm font-medium capitalize transition-colors ${
                activeMainTab === tab
                  ? "bg-accent text-white border border-accent-border"
                  : "text-secondary hover:text-secondary-hover"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Time Period Tabs  */}
        <div className="flex rounded-full">
          {["daily", "weekly", "monthly", "all-time"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTimeTab(tab)}
              className={`rounded-full py-2 px-4 text-sm font-medium capitalize transition-colors ${
                activeTimeTab === tab
                  ? "bg-accent text-white border border-accent-border"
                  : "text-secondary hover:text-secondary-hover"
              }`}
            >
              {tab === "all-time" ? "All-Time" : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-secondary" />
          <input
            type="search"
            placeholder="Search by name or wallet"
            className="h-10 w-[420px] rounded-full border border-accent-border bg-transparent pl-10 pr-4 text-sm text-white  placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        {/* Menu Button with Notification */}
        <div className="relative">
          <button className="rounded-full bg-accent p-2 transition-colors hover:bg-accent">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M3 18H21M3 12H21M3 6H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white">
            2
          </span>
        </div>
      </div>
    </div>
  );
}
