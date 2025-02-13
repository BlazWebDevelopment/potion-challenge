import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type React from "react";
import { CiSearch } from "react-icons/ci";

interface MainTabsNavBarProps {
  activeMainTab?: string;
  setActiveMainTab: (tab: string) => void;
  searchQuery?: string;
  setSearchQuery: (query: string) => void;
  filterComponent?: React.ReactNode;
  displaySearch?: boolean;
}

const activeMainTabs: { name: string }[] = [
  { name: "traders" },
  { name: "groups" },
];

export default function MainTabsNavBar({
  activeMainTab,
  setActiveMainTab,
  searchQuery,
  setSearchQuery,
  filterComponent,
  displaySearch = true,
}: MainTabsNavBarProps) {
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col space-y-4 py-2 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
      {/* Main Tabs */}
      <div className="flex rounded-full relative">
        {activeMainTabs.map((tab, i) => (
          <div key={i} className="relative flex-1">
            <button
              onClick={() => setActiveMainTab(tab.name)}
              className={`w-full rounded-full py-2 px-4 text-sm font-medium capitalize transition-colors relative z-10 ${
                activeMainTab === tab.name
                  ? "text-white"
                  : "text-secondary hover:text-secondary-hover"
              }`}
            >
              {tab.name}
              {activeMainTab === tab.name && (
                <motion.div
                  layoutId="mainTabBackground"
                  className="absolute inset-0 bg-accent border border-accent-border rounded-full -z-10"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                    duration: 0.3,
                  }}
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {displaySearch && (
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <div className="relative flex-grow navTab:w-[420px]">
            <CiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-secondary" />
            <input
              placeholder="Search by name or wallet"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-full border border-accent-border bg-transparent pl-10 pr-10 text-sm text-white placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-purple/20"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/3 transform text-secondary hover:text-white"
                >
                  <X className="size-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Filter Component */}
          {filterComponent}
        </div>
      )}
    </div>
  );
}
