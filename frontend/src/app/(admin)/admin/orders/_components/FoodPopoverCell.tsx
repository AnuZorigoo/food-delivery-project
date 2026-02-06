"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

interface FoodItem {
  _id: string;
  quantity: number;
  foodId: {
    _id: string;
    name: string;
    imageUrl?: string;
  } | null;
}

export function FoodPopoverCell({ items }: { items: FoodItem[] }) {
  const safeItems = (items ?? []).filter((i) => i.foodId);
  const count = safeItems.length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="inline-flex items-center gap-2 text-gray-700 hover:underline"
          type="button"
        >
          <span>{count > 0 ? `${count} foods` : "-"}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-[320px] p-3" align="start">
        <div className="space-y-2">
          {count === 0 ? (
            <div className="text-sm text-gray-500">No items</div>
          ) : (
            safeItems.map((it) => (
              <div
                key={it._id}
                className="flex items-center justify-between gap-3 rounded-lg border p-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={it.foodId?.imageUrl || "/placeholder.png"}
                    alt={it.foodId?.name || "food"}
                    className="h-10 w-10 rounded-md object-cover border"
                  />
                  <div className="text-sm font-medium">{it.foodId?.name}</div>
                </div>
                <div className="text-sm text-gray-600">x {it.quantity}</div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
