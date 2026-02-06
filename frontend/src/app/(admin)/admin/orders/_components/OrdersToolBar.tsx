"use client";

import { useMemo } from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUSES = ["Pending", "Delivered", "Cancelled"] as const;

export function OrdersToolbar(props: {
  total: number;
  filteredCount: number;

  q: string;
  setQ: (v: string) => void;

  statusFilter: string;
  setStatusFilter: (v: string) => void;

  dateRange: { from?: Date; to?: Date };
  setDateRange: (r: { from?: Date; to?: Date }) => void;

  checkedCount: number;

  selectedStatus: string;
  setSelectedStatus: (v: string) => void;

  onBulkSave: () => void;
}) {
  const dateLabel = useMemo(() => {
    const { from, to } = props.dateRange;
    if (!from && !to) return "Select date range";
  }, [props.dateRange]);

  return (
    <div className="p-6 border-b flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl font-bold">Orders</div>
          <div className="text-sm text-gray-500">
            {props.filteredCount} items
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="rounded-full gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span className="text-sm">{dateLabel}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3" align="end">
              <div className="pt-3 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => props.setDateRange({})}
                  className="rounded-full"
                >
                  Clear
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                disabled={props.checkedCount === 0}
                className="rounded-full"
                variant={props.checkedCount === 0 ? "secondary" : "default"}
              >
                Change delivery state
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change delivery state</DialogTitle>
              </DialogHeader>

              <div className="flex gap-2">
                {STATUSES.map((s) => (
                  <Button
                    key={s}
                    type="button"
                    variant="secondary"
                    className="flex-1 rounded-full"
                    onClick={() => props.setSelectedStatus(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    className="w-full rounded-full"
                    onClick={props.onBulkSave}
                  >
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <Input
          placeholder="Search customer / food / address..."
          value={props.q}
          onChange={(e) => props.setQ(e.target.value)}
          className="md:max-w-md"
        />

        <Select
          value={props.statusFilter}
          onValueChange={props.setStatusFilter}
        >
          <SelectTrigger className="w-50 rounded-full">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
