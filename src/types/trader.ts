export type Trader = {
  rank: number;
  name: string;
  address: string;
  avatar?: string;
  followers: number;
  handle: string;
  tokens: number;
  winRate: number;
  trades: {
    won: number;
    loses: number;
  };
  avgBuy: number;
  avgEntry: number;
  avgHold: number;
  realizedPnl: number;
  share?: number;
  totalInvestment: number;
};

export type Filters = {
  minFollowers: number;
  maxFollowers: number;
  winRate: [number, number];
  minTokens: number;
  maxTokens: number;
  realizedPnl: [number, number];
  avgBuy: [number, number];
  minAvgHold: number;
  maxAvgHold: number;
};
