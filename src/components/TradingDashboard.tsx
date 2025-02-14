"use client";

import { useState, useCallback, useMemo } from "react";
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
  const [filters, setFilters] = useState<Filters>({
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
    staleTime: 5 * 60 * 1000,
  });

  const applyFilters = useCallback(
    (tradersList: Trader[]) => {
      return tradersList.filter((trader) => {
        const { followers, winRate, tokens, realizedPnl } = trader;
        return (
          followers >= filters.minFollowers &&
          followers <= filters.maxFollowers &&
          winRate >= filters.winRate[0] &&
          winRate <= filters.winRate[1] &&
          tokens >= filters.minTokens &&
          tokens <= filters.maxTokens &&
          realizedPnl >= filters.realizedPnl[0] &&
          realizedPnl <= filters.realizedPnl[1]
        );
      });
    },
    [filters]
  );

  const filteredTraders = useMemo(() => {
    if (!traders) return [];
    const searchLower = searchQuery.toLowerCase();
    return applyFilters(
      traders.filter(
        (trader: Trader) =>
          trader.handle.toLowerCase().includes(searchLower) ||
          trader.address.toLowerCase().includes(searchLower)
      )
    );
  }, [traders, searchQuery, applyFilters]);

  const sortedTraders = useMemo(() => {
    if (!filteredTraders) return [];
    return [...filteredTraders].sort((a, b) => {
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
  }, [filteredTraders, sortConfig]);

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

  if (error) return <ErrorMessage message="Failed to load traders data." />;

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
