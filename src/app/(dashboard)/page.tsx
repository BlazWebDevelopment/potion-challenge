"use client";

import TradingDashboard from "@/components/TradingDashboard";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mt-20 max-sm:mt-10 max-md:mt-14 max-lg:mt-16">
        <TradingDashboard />
      </div>
    </QueryClientProvider>
  );
}
