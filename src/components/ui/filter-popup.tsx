"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { Filters } from "@/types/trader";

interface FilterPopupProps {
  onApplyFilters: (filters: Filters) => void;
  onResetFilters: () => void;
}

const initialFilters: Filters = {
  minFollowers: 0,
  maxFollowers: 1000000,
  winRate: [0, 100],
  minTokens: 0,
  maxTokens: 1000,
  realizedPnl: [-1000, 1000],
};

export function FilterPopup({
  onApplyFilters,
  onResetFilters,
}: FilterPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [appliedFiltersCount, setAppliedFiltersCount] = useState(0);

  const handleFilterChange = (name: string, value: number | number[]) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    onResetFilters();
    setIsOpen(false);
  };

  useEffect(() => {
    let count = 0;
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const initialValue = initialFilters[
          key as keyof typeof initialFilters
        ] as number[];
        if (value[0] !== initialValue[0] || value[1] !== initialValue[1]) {
          count++;
        }
      } else {
        if (value !== initialFilters[key as keyof typeof initialFilters]) {
          count++;
        }
      }
    });
    setAppliedFiltersCount(count);
  }, [filters]);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="relative flex-shrink-0 cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen(true);
          }
        }}
      >
        <motion.button
          type="button"
          className="rounded-full bg-accent py-2 px-4 transition-colors hover:bg-accent border border-accent-border"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SlidersHorizontal className="size-5 text-white" />
        </motion.button>
        {appliedFiltersCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -top-1 font-semibold flex bg-purple border border-accent h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-xs text-white"
          >
            {appliedFiltersCount}
          </motion.span>
        )}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Filter Traders"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minFollowers">Min Followers</Label>
              <Input
                id="minFollowers"
                type="number"
                value={filters.minFollowers}
                onChange={(e) =>
                  handleFilterChange("minFollowers", Number(e.target.value))
                }
                min={0}
                max={filters.maxFollowers}
              />
            </div>
            <div>
              <Label htmlFor="maxFollowers">Max Followers</Label>
              <Input
                id="maxFollowers"
                type="number"
                value={filters.maxFollowers}
                onChange={(e) =>
                  handleFilterChange("maxFollowers", Number(e.target.value))
                }
                min={filters.minFollowers}
                max={1000000}
              />
            </div>
          </div>
          <div>
            <Label>Win Rate Range (%)</Label>
            <Slider
              min={0}
              max={100}
              step={1}
              value={filters.winRate}
              onValueChange={(value) => handleFilterChange("winRate", value)}
              className="mt-2"
            />
            <div className="flex justify-between text-sm mt-2 text-white/60">
              <span>{filters.winRate[0]}%</span>
              <span>{filters.winRate[1]}%</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minTokens">Min Tokens</Label>
              <Input
                id="minTokens"
                type="number"
                value={filters.minTokens}
                onChange={(e) =>
                  handleFilterChange("minTokens", Number(e.target.value))
                }
                min={0}
                max={filters.maxTokens}
              />
            </div>
            <div>
              <Label htmlFor="maxTokens">Max Tokens</Label>
              <Input
                id="maxTokens"
                type="number"
                value={filters.maxTokens}
                onChange={(e) =>
                  handleFilterChange("maxTokens", Number(e.target.value))
                }
                min={filters.minTokens}
                max={1000}
              />
            </div>
          </div>
          <div>
            <Label>Realized PNL Range</Label>
            <Slider
              min={-1000}
              max={1000}
              step={10}
              value={filters.realizedPnl}
              onValueChange={(value) =>
                handleFilterChange("realizedPnl", value)
              }
              className="mt-2"
            />
            <div className="flex justify-between text-sm mt-2 text-white/60">
              <span>{filters.realizedPnl[0]}</span>
              <span>{filters.realizedPnl[1]}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={handleResetFilters}
              variant="outline"
              className="flex-1"
            >
              Reset Filters
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="flex-1 bg-accent hover:bg-accent-border"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
