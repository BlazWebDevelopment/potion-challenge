import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcn-avatar";
import { FaCheck, FaCopy } from "react-icons/fa6";
import { ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import SolanaIcon from "@/assets/sol-icon.svg";
import Link from "next/link";
import { copyToClipboard } from "@/utils/functions";
import type { Trader } from "@/types/trader";
import {
  formatUSDT,
  formatFollowers,
  formatAvgHold,
  formatAvgEntry,
  calculateWinRate,
} from "@/utils/fomatters";

interface TradingCardProps {
  trader: Trader;
}

const RankingBadge: React.FC<{ rank: number }> = ({ rank }) => {
  const getBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-[#CCAD59]";
      case 2:
        return "bg-[#BFBFBF]";
      case 3:
        return "bg-[#B2835F]";
      default:
        return "bg-accent border border-purple/20";
    }
  };

  return (
    <div
      className={cn(
        "absolute -top-2 -left-2 size-7 rounded-full flex items-center justify-center",
        getBadgeColor(rank)
      )}
    >
      <span className="font-bold text-sm text-white">{rank}</span>
    </div>
  );
};

export function TradingCard({ trader }: TradingCardProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    copyToClipboard(trader.address);
    setCopied(true);
    toast({ description: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 7500);
  };

  return (
    <Card className="relative bg-sidebar border-accent">
      <RankingBadge rank={trader.rank} />
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <Link href={`trader/${trader.address}`} className="flex-1">
            <div className="flex items-center gap-3">
              <Avatar className="size-12">
                <AvatarImage src={trader.avatar} />
                <AvatarFallback>
                  <div className="bg-accent size-12 text-center flex justify-center items-center text-white/80 font-black">
                    {trader.name[0]}
                  </div>
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-white">{trader.name}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-secondary">
                    {`${trader.address.slice(0, 6)}...${trader.address.slice(
                      -6
                    )}`}
                  </p>
                  <button onClick={handleCopy}>
                    {copied ? (
                      <FaCheck
                        size={16}
                        className="text-white/60 hover:text-secondary-hover"
                      />
                    ) : (
                      <FaCopy
                        size={16}
                        className="text-secondary hover:text-secondary-hover"
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Link>
          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <ExternalLink className="size-5 text-purple" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-accent/30 p-3 rounded-lg">
            <p className="text-secondary text-sm mb-1">Followers</p>
            <p className="text-white font-bold">
              {formatFollowers(trader.followers)}
            </p>
            <p className="text-xs text-secondary">{trader.handle}</p>
          </div>

          <div className="bg-accent/30 p-3 rounded-lg">
            <p className="text-secondary text-sm mb-1">Win Rate</p>
            <p
              className={cn(
                "font-bold",
                trader.winRate >= 50 ? "text-green" : "text-red"
              )}
            >
              {calculateWinRate(trader.trades.won, trader.trades.loses)}%
            </p>
            <p className="text-xs text-secondary">
              <span className="text-green">{trader.trades.won}</span> /{" "}
              <span className="text-red">{trader.trades.loses}</span> trades
            </p>
          </div>

          <div className="bg-accent/30 p-3 rounded-lg">
            <p className="text-secondary text-sm mb-1">Avg Buy</p>
            <div className="flex items-center gap-1">
              <p className="text-white font-bold">{trader.avgBuy.toFixed(2)}</p>
              <Image src={SolanaIcon} alt="sol" width={12} height={12} />
            </div>
            <p className="text-xs text-secondary">
              {formatUSDT(trader.avgBuy, 203.22)}
            </p>
          </div>

          <div className="bg-accent/30 p-3 rounded-lg">
            <p className="text-secondary text-sm mb-1">Realized PNL</p>
            <div className="flex items-center gap-1">
              <p
                className={cn(
                  "font-bold",
                  trader.realizedPnl >= 0 ? "text-green" : "text-red"
                )}
              >
                {trader.realizedPnl >= 0 ? "+" : ""}
                {trader.realizedPnl.toFixed(2)}
              </p>
              <Image src={SolanaIcon} alt="sol" width={12} height={12} />
            </div>
            <p className="text-xs text-secondary">
              {formatUSDT(trader.realizedPnl, 203.22)}
            </p>
          </div>
        </div>

        <div className="mt-3  flex flex-row px-3 justify-between gap-2 bg-accent/30 p-3 rounded-lg">
          <div>
            <p className="text-secondary text-sm mb-1">Tokens</p>
            <p className="text-white font-bold">{trader.tokens}</p>
          </div>
          <div>
            <p className="text-secondary text-sm mb-1">Avg Entry</p>
            <p className="text-white font-bold">
              {formatAvgEntry(trader.avgEntry)}
            </p>
          </div>
          <div>
            <p className="text-secondary text-sm mb-1">Avg Hold</p>
            <p className="text-white font-bold">
              {formatAvgHold(trader.avgHold)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
