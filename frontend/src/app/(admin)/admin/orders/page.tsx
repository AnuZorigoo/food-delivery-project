"use client";

import { useEffect, useState } from "react";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/lib/axios";

interface OrderItem {
  _id: string;
  quantity: number;
  price: number;
  foodId: {
    _id: string;
    name: string;
    price: number;
    imageUrl?: string;
  };
}

interface Order {
  _id: string;
  totalPrice: number;
  status: string;
  orderItems: OrderItem[];
}

export default function Page() {
  const [checkAll, setCheckAll] = useState(false);
  const [checkedOrders, setCheckedOrders] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const response = await api.get("/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(response.data.orders ?? []);
        console.log(response.data.orders, "ordersdata");
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrder();
  }, []);

  const toggleCheckAll = () => {
    if (checkAll) {
      setCheckedOrders([]);
    } else {
      setCheckedOrders(orders.map((o) => o._id));
    }
    setCheckAll(!checkAll);
  };

  const toggleCheck = (id: string) => {
    setCheckedOrders((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSave = () => {
    if (!selectedStatus) return;

    setOrders((prev) =>
      prev.map((o) =>
        checkedOrders.includes(o._id) ? { ...o, status: selectedStatus } : o,
      ),
    );

    setCheckedOrders([]);
    setCheckAll(false);
    setSelectedStatus("");
  };

  return (
    <div className="min-h-screen h-full bg-secondary flex flex-col p-8">
      <div className="w-full flex justify-end">
        <Button variant={"ghost"} className="rounded-full">
          <img src="/Container (7).png" alt="Logo" className="mb-4" />
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
            {orders.map((order, index) => {
              const foodNames =
                order.orderItems?.map((i) => i.foodId?.name).join(", ") || "-";

              return (
                <TableRow key={order._id} className="hover:bg-gray-50">
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={checkedOrders.includes(order._id)}
                      onChange={() => toggleCheck(order._id)}
                    />
                  </TableCell>

                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">-</TableCell>
                  <TableCell>{foodNames}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell className="font-semibold">
                    ${order.totalPrice}
                  </TableCell>
                  <TableCell>-</TableCell>

                  <TableCell>
                    <ComboboxDemo />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
