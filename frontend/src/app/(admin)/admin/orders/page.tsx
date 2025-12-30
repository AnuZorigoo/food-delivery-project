"use client";

import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orders = [
  {
    id: 1,
    customer: "John Doe",
    food: "Burger",
    date: "2025-01-10",
    total: "$12",
    address: "Ulaanbaatar, Mongolia",
    status: "Pending",
  },
  {
    id: 2,
    customer: "Sarah Smith",
    food: "Pizza",
    date: "2025-01-09",
    total: "$22",
    address: "Bayanzurkh District",
    status: "Delivered",
  },
];

export default function Page() {
  const [checkAll, setCheckAll] = useState(false);
  const [checkedOrders, setCheckedOrders] = useState<number[]>([]);

  const toggleCheckAll = () => {
    if (checkAll) {
      setCheckedOrders([]);
    } else {
      setCheckedOrders(orders.map((o) => o.id));
    }
    setCheckAll(!checkAll);
  };

  const toggleCheck = (id: number) => {
    if (checkedOrders.includes(id)) {
      setCheckedOrders(checkedOrders.filter((i) => i !== id));
    } else {
      setCheckedOrders([...checkedOrders, id]);
    }
  };

  return (
    <div className="min-h-screen h-full bg-secondary flex flex-col items-center p-8 justify-center">
      <Button variant={"ghost"} className="rounded-full">
        <img src="/Container (7).png" alt="Logo" className=" mb-4" />
      </Button>
      <div className="w-full border rounded-lg bg-white">
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <p className="text-[20px] font-bold">Orders</p>
            <p className="text-[12px] text-[#71717A]">Items</p>
          </div>

          <Button variant="secondary" className="rounded-md">
            Change delivery state
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <input
                  type="checkbox"
                  checked={checkAll}
                  onChange={toggleCheckAll}
                />
              </TableHead>
              <TableHead>№</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Food</TableHead>
              <TableHead className="flex items-center gap-1">
                Date <ArrowUpDown size={14} className="cursor-pointer" />
              </TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Delivery Address</TableHead>
              <TableHead className="flex items-center gap-1">
                Delivery state{" "}
                <ArrowUpDown size={14} className="cursor-pointer" />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.id} className="hover:bg-gray-50">
                <TableCell>
                  <input
                    type="checkbox"
                    checked={checkedOrders.includes(order.id)}
                    onChange={() => toggleCheck(order.id)}
                  />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{order.customer}</TableCell>
                <TableCell>{order.food}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="font-semibold">{order.total}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
