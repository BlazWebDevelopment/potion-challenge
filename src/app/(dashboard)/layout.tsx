"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}

export default PagesLayout;
