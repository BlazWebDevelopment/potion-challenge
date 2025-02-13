"use client";

import type React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "default",
  ...props
}) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium transition-colors",
        variant === "default" && "bg-purple-500 text-white hover:bg-purple-600",
        variant === "outline" &&
          "border border-accent-border text-secondary hover:bg-accent hover:text-secondary-hover",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
