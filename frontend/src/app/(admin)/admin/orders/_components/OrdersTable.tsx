"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FoodPopoverCell } from "./FoodPopoverCell";

type OrderStatus = "Pending" | "Delivered" | "Cancelled" | string;

interface OrderItem {
  _id: string;
  quantity: number;
  foodId: { _id: string; name: string; imageUrl?: string } | null;
}

export interface OrderRow {
  _id: string;
  totalPrice: number;
  status: OrderStatus;
  orderItems: OrderItem[];
  createdAt: string;
  userId?: { username?: string; email?: string; address?: string };
}

const STATUSES = ["Pending", "Delivered", "Cancelled"] as const;

function statusClass(status: string) {
  switch (status) {
    case "Pending":
      return "border-red-300 text-red-600";
    case "Delivered":
      return "border-green-300 text-green-700";
    case "Cancelled":
      return "border-gray-300 text-gray-700";
    default:
      return "border-gray-300 text-gray-700";
  }
}

function formatDate(iso?: string | null) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleString();
}

export function OrdersTable(props: {
  orders: OrderRow[];
  page: number;
  pageSize: number;
  totalPages: number;
  setPage: (p: number) => void;

  checkAll: boolean;
  toggleCheckAll: () => void;

  checkedOrders: string[];
  toggleCheck: (id: string) => void;

  updateSingleStatus: (orderId: string, status: string) => void;
}) {
  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-10">
              <input
                type="checkbox"
                checked={props.checkAll}
                onChange={props.toggleCheckAll}
              />
            </TableHead>
            <TableHead className="w-17.5">№</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="w-55">Food</TableHead>
            <TableHead className="w-35">Date</TableHead>
            <TableHead className="w-30">Total</TableHead>
            <TableHead>Delivery Address</TableHead>
            <TableHead className="w-47.5 text-right">Delivery state</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {props.orders.map((order, idx) => {
            const customer =
              order.userId?.email ?? order.userId?.username ?? "-";
            const address = order.userId?.address ?? "-";

            return (
              <TableRow key={order._id} className="hover:bg-gray-50">
                <TableCell>
                  <input
                    type="checkbox"
                    checked={props.checkedOrders.includes(order._id)}
                    onChange={() => props.toggleCheck(order._id)}
                  />
                </TableCell>

                <TableCell>
                  {(props.page - 1) * props.pageSize + idx + 1}
                </TableCell>
                <TableCell className="text-gray-700">{customer}</TableCell>

                <TableCell>
                  <FoodPopoverCell items={order.orderItems as any} />
                </TableCell>

                <TableCell className="text-gray-600">
                  {formatDate(order.createdAt)}
                </TableCell>
                <TableCell className="font-semibold">
                  ${order.totalPrice}
                </TableCell>

                <TableCell className="text-gray-600 truncate max-w-[320px]">
                  {address}
                </TableCell>

                <TableCell className="text-right">
                  <Select
                    value={order.status}
                    onValueChange={(value) =>
                      props.updateSingleStatus(order._id, value)
                    }
                  >
                    <SelectTrigger
                      className={`ml-auto w-37.5 rounded-full border bg-white ${statusClass(
                        order.status,
                      )}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            );
          })}

          {props.orders.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={8}
                className="py-10 text-center text-sm text-gray-500"
              >
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="mt-6 flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => props.setPage(Math.max(1, props.page - 1))}
          disabled={props.page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {Array.from({ length: Math.min(props.totalPages, 5) }).map((_, i) => {
          let pageNum = i + 1;
          if (props.totalPages > 5 && i === 4) pageNum = props.totalPages;
          const active = pageNum === props.page;

          return (
            <Button
              key={pageNum}
              variant={active ? "default" : "outline"}
              className="rounded-full"
              onClick={() => props.setPage(pageNum)}
            >
              {pageNum}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() =>
            props.setPage(Math.min(props.totalPages, props.page + 1))
          }
          disabled={props.page === props.totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
