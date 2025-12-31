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
import { ComboboxDemo } from "../_components/Combobox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [status, setStatus] = useState("");
  const [orderList, setOrderList] = useState(orders);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleSave = () => {
    setOrderList((prev) =>
      prev.map((order) =>
        checkedOrders.includes(order.id)
          ? { ...order, status: selectedStatus }
          : order
      )
    );
  };

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
    <div className="min-h-screen h-full bg-secondary flex flex-col  p-8">
      <div className="w-full  flex content-end justify-end ">
        <Button variant={"ghost"} className="rounded-full flex-end">
          <img src="/Container (7).png" alt="Logo" className=" mb-4" />
        </Button>
      </div>
      <div className="w-full border rounded-lg bg-white">
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <p className="text-[20px] font-bold">Orders</p>
            <p className="text-[12px] text-[#71717A]">Items</p>
          </div>
          <Dialog>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <DialogTrigger asChild>
                <Button variant="secondary" className="rounded-md">
                  Change delivery state
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change delivery state</DialogTitle>
                </DialogHeader>

                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    className="flex-1 rounded-full"
                    type="button"
                    onClick={() => setSelectedStatus("Delivered")}
                  >
                    Delivered
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1 rounded-full"
                    type="button"
                    onClick={() => setSelectedStatus("Pending")}
                  >
                    Pending
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1 rounded-full"
                    type="button"
                    onClick={() => setSelectedStatus("Cancelled")}
                  >
                    Cancelled
                  </Button>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="submit" className="w-full rounded-full">
                      Save
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
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
            {orderList.map((order, index) => (
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
                  <ComboboxDemo />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
