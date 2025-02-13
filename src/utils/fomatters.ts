export const formatSOL = (amount: number): string => {
  if (amount < 1) {
    return amount.toFixed(2);
  } else if (amount < 100) {
    return amount
      .toFixed(2)
      .replace(/\.00$/, "")
      .replace(/(\.\d)0$/, "$1");
  } else {
    return amount.toFixed(0);
  }
};

export const formatUSDT = (
  solAmount: number,
  solPriceInUSD: number
): string => {
  const usdtAmount = solAmount * solPriceInUSD;
  return `$${usdtAmount.toFixed(2)}`;
};

export const formatAvgEntry = (amount: number): string => {
  if (amount < 1_000) {
    return "< S1K";
  } else if (amount < 2_000) {
    return "S2K";
  } else if (amount < 1_000_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  } else if (amount < 1_000_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  } else {
    return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  }
};

export const formatFollowers = (count: number): string => {
  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (count >= 1_000) {
    return (count / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return count.toString();
};

export const formatAvgHold = (minutes: number): string => {
  if (minutes < 240) {
    return `${minutes} m`;
  }
  const hours = (minutes / 60).toFixed(0);
  return `${hours} h`;
};

export const calculateROI = (
  profit: number,
  initialInvestment: number
): string => {
  if (initialInvestment === 0) {
    return "Infinity";
  }
  const roi = (profit / initialInvestment) * 100;

  return roi.toFixed(0);
};

export const calculateWinRate = (wins: number, loses: number): string => {
  const totalGames = wins + loses;
  if (totalGames === 0) {
    return "0";
  }
  const winRate = (wins / totalGames) * 100;
  return winRate.toFixed(0);
};
