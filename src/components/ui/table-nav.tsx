import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type React from "react"; // Added import for React

interface TableNavBarProps {
  activeMainTab?: string;
  setActiveMainTab: (tab: string) => void;
  activeTimeTab: string;
  setActiveTimeTab: (tab: string) => void;
  searchQuery?: string;
  setSearchQuery: (query: string) => void;
  filterComponent?: React.ReactNode;
  displayTabs?: "main" | "time";
  displaySearch?: boolean;
}

const activeMainTabs: { name: string }[] = [
  { name: "traders" },
  { name: "groups" },
];

const timePeriodTabs: { name: string }[] = [
  { name: "daily" },
  { name: "weekly" },
  { name: "monthly" },
  { name: "all-time" },
];

export default function TableNavBar({
  activeMainTab,
  setActiveMainTab,
  activeTimeTab,
  setActiveTimeTab,
  searchQuery,
  setSearchQuery,
  filterComponent,
  displayTabs,
  displaySearch = true,
}: TableNavBarProps) {
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Determine which tabs to display based on displayTabs prop
  const showMainTabs = displayTabs === "main" || !displayTabs;
  const showTimeTabs = displayTabs === "time" || !displayTabs;

  return (
    <div className="flex flex-col space-y-4 py-2 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 ">
      {(showMainTabs || showTimeTabs) && (
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-x-6 lg:space-y-0">
          {showMainTabs && (
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
          )}
          {showTimeTabs && (
            <div className="relative lg:flex md:rounded-full">
              <div className="lg:hidden">
                <button
                  onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                  className="flex items-center justify-between w-full rounded-full bg-accent border border-accent-border py-2 px-4 text-sm font-medium text-white"
                >
                  <span className="capitalize">
                    {activeTimeTab === "all-time" ? "All-Time" : activeTimeTab}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                <AnimatePresence>
                  {isTimeDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-20 mt-2 w-full rounded-md bg-accent border border-accent-border shadow-lg overflow-hidden"
                    >
                      {timePeriodTabs.map((tab, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setActiveTimeTab(tab.name);
                            setIsTimeDropdownOpen(false);
                          }}
                          className={`block w-full px-4 py-2 text-left text-sm capitalize transition-colors ${
                            activeTimeTab === tab.name
                              ? "bg-purple-500 text-white"
                              : "text-white hover:bg-accent-hover"
                          }`}
                        >
                          {tab.name === "all-time" ? "All-Time" : tab.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden lg:flex lg:rounded-full lg:relative">
                {timePeriodTabs.map((tab, i) => (
                  <div key={i} className="relative">
                    <button
                      onClick={() => setActiveTimeTab(tab.name)}
                      className={`rounded-full py-2 px-4 text-sm font-medium capitalize transition-colors relative z-10 ${
                        activeTimeTab === tab.name
                          ? "text-white"
                          : "text-secondary hover:text-secondary-hover"
                      }`}
                    >
                      {tab.name === "all-time" ? "All-Time" : tab.name}
                      {activeTimeTab === tab.name && (
                        <motion.div
                          layoutId="timeTabBackground"
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
            </div>
          )}
        </div>
      )}

      {displaySearch && (
        <div className="flex items-center space-x-4">
          <div className="relative flex-grow navTab:w-[420px]">
            <CiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-secondary" />
            <input
              placeholder="Search by name or wallet"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-full border border-accent-border bg-transparent pl-10 pr-10 text-sm md:text-base text-white placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-purple/20"
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

          {filterComponent}
        </div>
      )}
    </div>
  );
}
