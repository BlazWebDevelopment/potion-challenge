import type React from "react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: React.ReactNode;
  subValue?: React.ReactNode;
  className?: string;
  valueClassName?: string;
  borderL?: boolean;
  borderR?: boolean;
  borderT?: boolean;
  borderB?: boolean;
};

export function StatCard({
  label,
  value,
  subValue,
  className,
  valueClassName,
  borderL,
  borderR,
  borderT,
  borderB,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-sidebar border-accent-border flex items-center justify-between h-[58px] px-4",
        className,
        {
          "border-l": borderL,
          "border-r max-md:border-r-0": borderR,
          "border-t": borderT,
          "border-b": borderB,
        }
      )}
    >
      <span className="text-white font-bold text-base">{label}</span>
      <div className="flex flex-col items-end">
        <span
          className={cn("font-normal text-base text-white", valueClassName)}
        >
          {value}
        </span>
        {subValue && <span className="text-xs text-secondary">{subValue}</span>}
      </div>
    </div>
  );
}
