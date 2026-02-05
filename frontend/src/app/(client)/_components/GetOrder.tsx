"use client";

import { TabsContent } from "@/components/ui/tabs";
import { api } from "@/lib/axios";
import { Map, Soup, Timer } from "lucide-react";
import { useEffect, useState } from "react";

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

export const GetOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) return;

        const response = await api.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data, "orderdata");

        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrder();
  }, []);

  return (
    <div className="space-y-4">
      {orders.map((order: any) => (
        <div key={order._id} className="border rounded p-4 space-y-2">
          <div className="flex gap-4 text-sm text-gray-600 justify-between">
            <p className="font-bold text-black"> ${order.totalPrice}</p>
            <p className="rounded-full pl-4 pr-4 border">{order.status}</p>
          </div>

          <div className="space-y-1">
            {order?.orderItems?.map((item: any) => (
              <div key={item._id} className="text-[#71717A] text-[12px]">
                <p key={item._id} className="flex gap-1 items-center">
                  <Soup />
                  {item.foodId?.name} x {item.quantity}
                </p>
                <p className="flex gap-2 items-center">
                  <Timer />
                  {order.createdAt}
                </p>
                <p>
                  <Map />
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
