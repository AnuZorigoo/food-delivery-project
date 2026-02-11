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
import { useEffect, useState } from "react";
import { GetOrder } from "./GetOrder";

export function CartDrawer() {
  const [tab, setTab] = useState<"cart" | "order">("cart");

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    isCartOpen,
    setIsCartOpen,
    clearCart, // ✅ make sure you added this in cart-context
  } = useCart();

  const subtotal = getTotalPrice();
  const shipping = 0.99;
  const total = subtotal + shipping;

  const handleCheckoutSuccess = () => {
    clearCart(); // ✅ empty cart
    setTab("order"); // ✅ go to order tab
  };

  // ✅ optional: when drawer opens, show cart tab
  useEffect(() => {
    if (isCartOpen) setTab("cart");
  }, [isCartOpen]);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle></SheetTitle>
          <CartHeader onClose={() => setIsCartOpen(false)} />
        </SheetHeader>

        {/* ✅ controlled tabs */}
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as "cart" | "order")}
          className="flex-1 flex flex-col"
        >
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
              onCheckoutSuccess={handleCheckoutSuccess} // ✅
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
