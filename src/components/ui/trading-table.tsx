"use client";

import React, { useState, useEffect } from "react";
import type { Trader } from "@/types/trader";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcn-avatar";
import { FaChevronDown } from "react-icons/fa";
import { FaCheck, FaCopy } from "react-icons/fa6";
import { useToast } from "@/hooks/use-toast";
import SolanaIcon from "@/assets/sol-icon.svg";
import Image from "next/image";
import {
  formatUSDT,
  formatFollowers,
  formatAvgHold,
  formatAvgEntry,
  calculateWinRate,
} from "@/utils/fomatters";
import Link from "next/link";
import { Skeleton } from "./skeleton";
import { copyToClipboard } from "@/utils/functions";
import { TradingCard } from "./trading-card";

interface TradingTableProps {
  traders: Trader[];
  sortConfig: {
    key: keyof Trader;
    direction: "asc" | "desc";
  };
  onSort: (key: keyof Trader) => void;
  isLoading: boolean;
}

const RankingCoins: React.FC<{ rank: number }> = ({ rank }) => {
  return (
    <div
      className={`${
        rank === 1
          ? "bg-[#CCAD59]"
          : rank === 2
          ? "bg-[#BFBFBF]"
          : rank === 3
          ? "bg-[#B2835F]"
          : "bg-transparent text-white"
      } p-4 size-4 rounded-full flex justify-center items-center text-center`}
    >
      <span className="font-bold text-xs">{rank}</span>
    </div>
  );
};

export default function TradingTable({
  traders,
  onSort,
  isLoading,
}: TradingTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const { toast } = useToast();

  const tradersPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [traders]);

  const indexOfLastTrader = currentPage * tradersPerPage;
  const indexOfFirstTrader = indexOfLastTrader - tradersPerPage;
  const currentTraders =
    traders && traders.slice(indexOfFirstTrader, indexOfLastTrader);
  const totalPages = traders && Math.ceil(traders.length / tradersPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleCopy = (trader: Trader) => (e: React.MouseEvent) => {
    e.preventDefault();
    copyToClipboard(trader.address);
    setCopiedAddress(trader.address);
    toast({ description: "Copied to clipboard!" });
    setTimeout(() => {
      setCopiedAddress(null);
    }, 3000);
  };

  return (
    <div>
      <Table className="table-fixed w-full max-lg:hidden">
        <colgroup>
          <col className="w-[100px]" />
          <col className="w-[250px]" />
          <col className="w-[150px]" />
          <col className="w-[100px]" />
          <col className="w-[120px]" />
          <col className="w-[150px]" />
          <col className="w-[120px]" />
          <col className="w-[140px]" />
          <col className="w-[120px]" />
          <col className="w-[150px]" />
          <col className="w-[80px]" />
        </colgroup>
        <TableHeader className="bg-accent/80 rounded-xl">
          <TableRow>
            <TableHead
              onClick={() => onSort("rank")}
              className="cursor-pointer px-5"
            >
              <div className="text-center">
                <span className="text-white font-bold text-sm">Rank</span>
              </div>
            </TableHead>
            <TableHead className="px-5">
              <span className="text-white font-bold text-sm">Trader</span>
            </TableHead>
            <TableHead
              onClick={() => onSort("followers")}
              className="cursor-pointer px-5"
            >
              <div className="flex items-center justify-end">
                <span className="text-white font-bold text-sm">Followers</span>
                <FaChevronDown className="ml-1.5 size-3 text-purple" />
              </div>
            </TableHead>
            <TableHead
              onClick={() => onSort("tokens")}
              className="cursor-pointer px-5"
            >
              <div className="flex items-center justify-end">
                <span className="text-white font-bold text-sm">Tokens</span>
                <FaChevronDown className="ml-1.5 size-3 text-purple" />
              </div>
            </TableHead>
            <TableHead
              onClick={() => onSort("winRate")}
              className="cursor-pointer px-5"
            >
              <div className="flex items-center justify-end">
                <span className="text-white font-bold text-sm">Win Rate</span>
                <FaChevronDown className="ml-1.5 size-3 text-purple" />
              </div>
            </TableHead>
            <TableHead className="px-5 text-end">
              <span className="text-sm text-white font-bold">Trades</span>
            </TableHead>
            <TableHead
              onClick={() => onSort("avgBuy")}
              className="cursor-pointer px-5"
            >
              <div className="flex items-center justify-end">
                <span className="text-white font-bold text-sm">Avg Buy</span>
                <FaChevronDown className="ml-1.5 size-3 text-purple" />
              </div>
            </TableHead>
            <TableHead
              onClick={() => onSort("avgEntry")}
              className="cursor-pointer px-5"
            >
              <div className="flex items-center justify-end">
                <span className="text-white font-bold text-sm">Avg Entry</span>
                <FaChevronDown className="ml-1.5 size-3 text-purple" />
              </div>
            </TableHead>
            <TableHead
              onClick={() => onSort("avgHold")}
              className="cursor-pointer px-5"
            >
              <div className="flex items-center justify-end">
                <span className="text-white font-bold text-sm">Avg Hold</span>
                <FaChevronDown className="ml-1.5 size-3 text-purple" />
              </div>
            </TableHead>
            <TableHead
              onClick={() => onSort("realizedPnl")}
              className="cursor-pointer px-5"
            >
              <div className="flex items-center justify-end">
                <span className="text-white font-bold text-sm">
                  Realized PNL
                </span>
                <FaChevronDown className="ml-1.5 size-3 text-purple" />
              </div>
            </TableHead>
            <TableHead className="px-5 text-end">
              <span className="text-sm text-white font-bold">Share</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-sidebar">
          {isLoading
            ? Array.from({ length: tradersPerPage }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  <TableCell className="px-5 py-3.5 flex justify-center items-center">
                    <Skeleton className="w-full size-10 bg-background rounded-full" />
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <div className="flex gap-2">
                      <Skeleton className="w-14 h-10 bg-background rounded-full" />
                      <div className="flex flex-col space-y-2 w-full">
                        <Skeleton className="w-3/4 h-4 bg-background rounded-full" />
                        <Skeleton className="w-1/2 h-3 bg-background rounded-full" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-2">
                    <Skeleton className="w-full h-4 bg-background rounded-full" />
                    <Skeleton className="w-full h-3 mt-1 bg-background rounded-full" />
                  </TableCell>
                  <TableCell className="px-5 py-2">
                    <Skeleton className="w-full h-4 bg-background rounded-full" />
                  </TableCell>
                  <TableCell className="px-5 py-2">
                    <Skeleton className="w-full h-4 bg-background rounded-full" />
                  </TableCell>
                  <TableCell className="px-5 py-2">
                    <Skeleton className="w-full h-4 bg-background rounded-full" />
                  </TableCell>
                  <TableCell className="px-5 py-2">
                    <Skeleton className="w-full h-4 bg-background rounded-full" />
                  </TableCell>
                  <TableCell className="px-5 py-2">
                    <Skeleton className="w-full h-4 bg-background rounded-full" />
                  </TableCell>
                  <TableCell className="px-5 py-2">
                    <Skeleton className="w-full h-4 bg-background rounded-full" />
                  </TableCell>
                  <TableCell className="px-5 py-2">
                    <Skeleton className="w-full h-4 bg-background rounded-full" />
                  </TableCell>
                  <TableCell className="px-5 py-2 text-right">
                    <Skeleton className="w-8 h-8 bg-background rounded-full mx-auto" />
                  </TableCell>
                </TableRow>
              ))
            : currentTraders.map((trader) => (
                <TableRow key={`${trader.name}-${trader.rank}`}>
                  <TableCell className="font-medium px-5 py-2">
                    <div className="flex justify-center items-center">
                      <RankingCoins rank={trader.rank} />
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <div className="flex gap-2">
                      <Link href={`trader/${trader.address}`}>
                        <div className="flex items-center gap-2 w-full">
                          <Avatar className="size-11">
                            <AvatarImage src={trader.avatar} />
                            <AvatarFallback>
                              <div className="bg-accent size-12 text-center flex justify-center items-center text-white/80 font-black">
                                {trader.name[0]}
                              </div>
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col w-full">
                            <span className="font-bold text-xs text-white">
                              {trader.name}
                            </span>
                            <div className="min-w-32">
                              <span className="text-sm text-secondary flex">
                                {`${trader.address.slice(
                                  0,
                                  6
                                )}...${trader.address.slice(-6)}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <button onClick={handleCopy(trader)}>
                        {copiedAddress === trader.address ? (
                          <FaCheck size={16} className="text-white/60" />
                        ) : (
                          <FaCopy
                            size={16}
                            className="text-secondary hover:text-secondary-hover"
                          />
                        )}
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-2">
                    <div className="flex items-end gap-1 flex-col">
                      <span className="text-white font-bold text-sm">
                        {formatFollowers(trader.followers)}
                      </span>
                      <span className="text-xs text-secondary">
                        {trader.handle}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-2 text-sm font-bold text-white text-end">
                    {trader.tokens}
                  </TableCell>
                  <TableCell className="px-5 py-2 text-end">
                    <span
                      className={cn(
                        "font-bold text-sm",
                        Number(
                          calculateWinRate(
                            trader.trades.won,
                            trader.trades.loses
                          )
                        ) >= 50
                          ? "text-green"
                          : "text-red"
                      )}
                    >
                      {Number(
                        calculateWinRate(trader.trades.won, trader.trades.loses)
                      )}
                      {"%"}
                    </span>
                  </TableCell>
                  <TableCell className="px-5 py-2 text-end font-bold text-secondary">
                    <span className="text-green">{trader.trades.won}</span> /{" "}
                    <span className="text-red">{trader.trades.loses}</span>
                  </TableCell>
                  <TableCell className="px-5 py-2">
                    <div className="flex flex-col justify-end">
                      <div className="flex flex-row gap-1 justify-end">
                        <span className="font-bold text-sm text-white">
                          {trader.avgBuy.toFixed(2)}
                        </span>
                        <Image
                          src={SolanaIcon}
                          alt="sol-icon"
                          width={12}
                          height={12}
                          loading="lazy"
                        />
                      </div>
                      <span className="text-xs text-secondary text-end">
                        {formatUSDT(trader.avgBuy, 203.22)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-2 text-end font-bold text-white">
                    {formatAvgEntry(trader.avgEntry)}
                  </TableCell>
                  <TableCell className="px-5 py-2 font-bold text-white text-end">
                    {formatAvgHold(trader.avgHold)}
                  </TableCell>
                  <TableCell className="px-5 py-2 text-end">
                    <div className="flex flex-row gap-1 justify-end">
                      <span
                        className={cn(
                          "font-bold",
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
                    <span className="text-xs text-secondary">
                      {formatUSDT(trader.realizedPnl, 203.22)}
                    </span>
                  </TableCell>
                  <TableCell className="px-5 py-2 text-right">
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 w-8">
                      <ExternalLink className="size-5 text-purple" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

      <div className="lg:hidden space-y-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="bg-sidebar rounded-lg p-4 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="size-12 rounded-full bg-background" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-24 mb-2 bg-background" />
                    <Skeleton className="h-4 w-32 bg-background" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-20 rounded-lg bg-background"
                    />
                  ))}
                </div>
                <Skeleton className="h-16 rounded-lg bg-background" />
              </div>
            ))
          : currentTraders?.map((trader) => (
              <TradingCard key={trader.address} trader={trader} />
            ))}
      </div>

      {!isLoading && traders.length > tradersPerPage && (
        <div className="mt-4 flex justify-center md:justify-end">
          <div className="flex space-x-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md max-sm:px-6 max-sm:py-2 ${
                currentPage === 1
                  ? "bg-accent/40 cursor-not-allowed text-white/60"
                  : "bg-accent text-white hover:bg-accent-hover"
              }`}
            >
              <ChevronLeft className="size-4 max-sm:size-5" />
            </button>

            <span
              className={`px-1 text-sm py-1 max-sm:text-lg rounded-md hover:underline${" text-gray-400"}`}
            >
              {currentPage}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md max-sm:px-6 max-sm:py-2 ${
                currentPage === totalPages
                  ? "bg-accent/40 cursor-not-allowed text-white/60"
                  : "bg-accent text-white hover:bg-accent-hover"
              }`}
            >
              <ChevronRight className="size-4 max-sm:size-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
