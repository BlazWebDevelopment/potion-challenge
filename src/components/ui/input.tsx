"use client";

import type React from "react";
import { cn } from "@/lib/utils";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <input
      className={cn(
        "w-full px-3 py-2 rounded-md border border-accent-border bg-background text-secondary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
        className
      )}
      {...props}
    />
  );
};
