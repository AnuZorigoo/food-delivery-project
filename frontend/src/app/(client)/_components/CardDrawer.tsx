"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CartHeader } from "./CartHeader";
import { CartContent } from "./CartContent";
import { useCart } from "../context/cart-context";
import { use, useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { GetOrder } from "./GetOrder";

export function CartDrawer() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const subtotal = getTotalPrice();
  const shipping = 0.99;
  const total = subtotal + shipping;

  const [foods, setfoods] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await api.get("/orders", config);
        console.log(response.data, "agadg");
        setfoods(response.data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };

    fetchOrder();
  }, []);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle></SheetTitle>
          <CartHeader onClose={() => setIsCartOpen(false)} />
        </SheetHeader>

        <Tabs defaultValue="cart" className="flex-1 flex flex-col">
          <TabsList className="w-full rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="cart"
              className="flex-1 rounded-none data-[state=active]:bg-red-500 data-[state=active]:text-white py-3"
            >
              Cart
            </TabsTrigger>
            <TabsTrigger
              value="order"
              className="flex-1 rounded-none data-[state=active]:bg-red-500 data-[state=active]:text-white py-3"
            >
              Order
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cart" className="flex-1 flex flex-col mt-0">
            <CartContent
              cartItems={cartItems}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              onUpdateQuantity={updateQuantity}
              onRemoveFromCart={removeFromCart}
            />
          </TabsContent>
          <TabsContent value="order" className="flex-1 flex flex-col mt-0">
            <GetOrder />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
