"use client";

import React, { useState } from "react";
import { StatCard } from "./ProfilePage/StatCard";
import SolanaIcon from "@/assets/sol-icon.svg";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  calculateROI,
  calculateWinRate,
  formatAvgEntry,
  formatAvgHold,
  formatUSDT,
} from "@/utils/fomatters";
import type { Trader } from "@/types/trader";
import { cn } from "@/lib/utils";

type ProfileStatsCloserProps = {
  trader: Trader | null;
};

type Section = "overview" | "averages" | "performance";

export const ProfileStatsCloser = ({ trader }: ProfileStatsCloserProps) => {
  const [activeSection, setActiveSection] = useState<Section>("overview");

  if (!trader) {
    return <div className="text-white">No trader data available.</div>;
  }

  const traderROI = calculateROI(trader.realizedPnl, trader.totalInvestment);
  const winRate = calculateWinRate(trader.trades.won, trader.trades.loses);

  const sections = {
    overview: {
      title: "Overview",
      content: (
        <StatsColumn>
          <StatCard label="Tokens" value={trader.tokens} borderB borderR />
          <StatCard
            borderB
            borderR
            label="Win Rate"
            value={`${winRate}%`}
            valueClassName={cn(
              Number(traderROI) >= 0 ? "text-green" : "text-red"
            )}
          />
          <StatCard
            label="Trades"
            borderR
            value={
              <>
                <span className="text-green">{trader.trades.won}</span> /{" "}
                <span className="text-red">{trader.trades.loses}</span>
              </>
            }
          />
        </StatsColumn>
      ),
    },
    averages: {
      title: "Averages",
      content: (
        <StatsColumn>
          <StatCard
            label="Average Buy"
            borderR
            borderB
            value={
              <div className="flex items-center gap-1">
                <span>{trader.avgBuy.toFixed(2)}</span>
                <Image
                  src={SolanaIcon}
                  alt="sol-icon"
                  width={12}
                  height={12}
                  loading="lazy"
                />
              </div>
            }
            subValue={formatUSDT(trader.avgBuy, 203.22)}
          />
          <StatCard
            borderB
            borderR
            label="Average Entry"
            value={formatAvgEntry(trader.avgEntry)}
          />
          <StatCard
            label="Average Hold"
            borderR
            value={formatAvgHold(trader.avgHold)}
          />
        </StatsColumn>
      ),
    },
    performance: {
      title: "Performance",
      content: (
        <StatsColumn>
          <StatCard
            borderR
            borderB
            label="Total Invested"
            value={
              <div className="flex items-center gap-1">
                <span>{trader.totalInvestment.toFixed(2)}</span>
                <Image
                  src={SolanaIcon}
                  alt="sol-icon"
                  width={12}
                  height={12}
                  loading="lazy"
                />
              </div>
            }
            subValue={formatUSDT(trader.totalInvestment, 203.22)}
          />
          <StatCard
            borderR
            borderB
            label="ROI"
            value={`${traderROI}%`}
            valueClassName={cn(
              Number(traderROI) >= 0 ? "text-green" : "text-red"
            )}
          />
          <StatCard
            borderR
            label="Realized PNL"
            value={
              <div className="flex items-center gap-1">
                <span
                  className={cn(
                    trader.realizedPnl >= 0 ? "text-green" : "text-red"
                  )}
                >
                  {trader.realizedPnl >= 0 ? "+" : ""}
                  {trader.realizedPnl.toFixed(2)}
                </span>
                <Image
                  src={SolanaIcon}
                  alt="sol-icon"
                  width={12}
                  height={12}
                  loading="lazy"
                />
              </div>
            }
            subValue={formatUSDT(trader.realizedPnl, 203.22)}
          />
        </StatsColumn>
      ),
    },
  };

  return (
    <div className="w-full">
      <div className="flex md:hidden rounded-full relative mb-4 justify-between md:justify-start">
        {Object.entries(sections).map(([key, { title }]) => (
          <div key={key} className="relative">
            <button
              onClick={() => setActiveSection(key as Section)}
              className={`rounded-full py-2 px-4 text-sm font-medium capitalize transition-colors relative z-10 ${
                activeSection === key
                  ? "text-white"
                  : "text-secondary hover:text-secondary-hover"
              }`}
            >
              {title}
              {activeSection === key && (
                <motion.div
                  layoutId="sectionTabBackground"
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

      <div className="h-60 md:hidden">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          {sections[activeSection].content}
        </motion.div>
      </div>

      <div className="hidden md:grid md:grid-cols-3 w-full">
        {Object.values(sections).map(({ content }, index) => (
          <React.Fragment key={index}>{content}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

const StatsColumn = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col w-full">{children}</div>;
};
