"use client";

import { useState, useCallback } from "react";
import type { Filters, Trader } from "@/types/trader";
import TradingTable from "./ui/trading-table";
import TableNavBar from "./ui/table-nav";
import { FilterPopup } from "./ui/filter-popup";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "./ErrorMessage";

export default function TradingDashboard() {
  const [activeMainTab, setActiveMainTab] = useState("traders");
  const [activeTimeTab, setActiveTimeTab] = useState("daily");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Trader;
    direction: "asc" | "desc";
  }>({ key: "rank", direction: "asc" });
  const [filters, setFilters] = useState({
    minFollowers: 0,
    maxFollowers: 1000000,
    winRate: [0, 100],
    minTokens: 0,
    maxTokens: 1000,
    realizedPnl: [-1000, 1000],
  });
  const isTraders = activeMainTab === "traders";

  const {
    isLoading,
    error,
    data: traders,
  } = useQuery({
    queryKey: ["traders"],
    queryFn: () => fetch("/api/traders").then((res) => res.json()),
  });

  const applyFilters = useCallback(
    (traders: Trader[]) => {
      return (
        traders &&
        traders.filter((trader) => {
          return (
            trader.followers >= filters.minFollowers &&
            trader.followers <= filters.maxFollowers &&
            trader.winRate >= filters.winRate[0] &&
            trader.winRate <= filters.winRate[1] &&
            trader.tokens >= filters.minTokens &&
            trader.tokens <= filters.maxTokens &&
            trader.realizedPnl >= filters.realizedPnl[0] &&
            trader.realizedPnl <= filters.realizedPnl[1]
          );
        })
      );
    },
    [filters]
  );

  // Filter traders based on search query and applied filters
  const filteredTraders =
    traders &&
    traders.filter((trader: Trader) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        (trader.handle.toLowerCase().includes(searchLower) ||
          trader.address.toLowerCase().includes(searchLower) ||
          trader.handle.toLowerCase().includes(searchLower)) &&
        applyFilters([trader]).length > 0
      );
    });

  // Sort traders based on current sort configuration
  const sortedTraders =
    traders &&
    [...filteredTraders].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      return sortConfig.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

  const handleSort = (key: keyof Trader) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      minFollowers: 0,
      maxFollowers: 1000000,
      winRate: [0, 100],
      minTokens: 0,
      maxTokens: 1000,
      realizedPnl: [-1000, 1000],
    });
  };

  if (error) return <ErrorMessage />;

  return (
    <div className="w-full space-y-4">
      <TableNavBar
        activeMainTab={activeMainTab}
        setActiveMainTab={setActiveMainTab}
        activeTimeTab={activeTimeTab}
        setActiveTimeTab={setActiveTimeTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterComponent={
          <FilterPopup
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
          />
        }
      />
      {isTraders ? (
        <TradingTable
          traders={sortedTraders}
          sortConfig={sortConfig}
          onSort={handleSort}
          isLoading={isLoading}
        />
      ) : (
        <div className="h-96 ">
          <div className="flex justify-center max-sm:mt-20 items-center bg-sidebar rounded-xl mt-40 border border-accent max-w-xl mx-auto h-40 ">
            <span className="text-center text-balance font-medium text-secondary">
              Coming soon, be patient!
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
