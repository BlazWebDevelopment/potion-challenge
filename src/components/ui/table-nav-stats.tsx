import { useState } from "react";
import { ChevronDown, ExternalLink, RotateCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type React from "react";

type TimeTabsNavBarProps = {
  activeTimeTab: string;
  setActiveTimeTab: (tab: string) => void;
  handleRefetch: () => void;
};

const timePeriodTabs: { name: string }[] = [
  { name: "daily" },
  { name: "weekly" },
  { name: "monthly" },
  { name: "all-time" },
];

export default function TimeTabsNavBar({
  activeTimeTab,
  setActiveTimeTab,
  handleRefetch,
}: TimeTabsNavBarProps) {
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  const handleTabClick = (tabName: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default button behavior
    setActiveTimeTab(tabName);
  };

  return (
    <div className="flex flex-col space-y-4 py-2 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
      <div className="flex justify-between flex-row items-center lg:hidden">
        <span className="text-sm text-secondary gap-2 flex flex-row items-center">
          Last refreshed second ago
          <button
            onClick={(e) => {
              e.preventDefault();
              handleRefetch();
            }}
          >
            <RotateCw className="text-secondary hover:text-secondary-hover size-5" />
          </button>
        </span>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 w-8">
          <ExternalLink className="size-5 text-purple" />
        </button>
      </div>
      <div className="relative lg:flex md:rounded-full w-full">
        <div className="lg:hidden">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsTimeDropdownOpen(!isTimeDropdownOpen);
            }}
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
                    onClick={(e) => {
                      e.preventDefault();
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

        <div className="flex flex-row gap-8 justify-between w-full">
          <div className="hidden lg:flex lg:rounded-full lg:relative">
            {timePeriodTabs.map((tab, i) => (
              <div key={i} className="relative">
                <button
                  onClick={(e) => handleTabClick(tab.name, e)}
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
          <div className="flex gap-12 flex-row items-center max-lg:hidden">
            <span className="text-xs text-secondary gap-2 flex flex-row items-center">
              Last refreshed second ago
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleRefetch();
                }}
              >
                <RotateCw className="text-secondary hover:text-secondary-hover size-4" />
              </button>
            </span>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 w-8">
              <ExternalLink className="size-5 text-purple" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
