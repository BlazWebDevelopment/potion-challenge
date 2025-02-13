"use client";

import type React from "react";
import { cn } from "@/lib/utils";

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  className,
  ...props
}) => {
  return (
    <label
      className={cn("block text-sm font-medium text-secondary mb-1", className)}
      {...props}
    />
  );
};
