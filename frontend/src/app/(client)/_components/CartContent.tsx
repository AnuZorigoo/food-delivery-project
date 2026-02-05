"use client";

import { CartItem } from "./CardItem";
import { EmptyCart } from "./EmptyCart";
import { PaymentSummary } from "./PaymentSummary";
import { Button } from "@/components/ui/button";
import type { CartItem as CartItemType } from "../context/cart-context";
import { api } from "@/lib/axios";

interface CartContentProps {
  cartItems: CartItemType[];
  subtotal: number;
  shipping: number;
  total: number;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveFromCart: (id: number) => void;
}

export function CartContent({
  cartItems,
  subtotal,
  shipping,
  total,
  onUpdateQuantity,
  onRemoveFromCart,
}: CartContentProps) {
  const onSubmit = async () => {
    try {
      await api.post(
        "/orders/create",
        {
          items: cartItems.map((item) => ({
            foodId: item._id,
            quantity: item.quantity,
            price: item.price,
          })),
          totalPrice: total,
          subtotal,
          shipping,
          total,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      alert("Order created successfully 🎉");
    } catch (error) {
      console.error(error);
      alert("Order failed ❌");
    }
  };

  return (
    <>
      <div className="flex-1 overflow-auto px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">My cart</h3>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemoveFromCart}
              />
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <PaymentSummary
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-6 border-t">
          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white py-6 rounded-full text-base font-semibold"
            onClick={onSubmit}
          >
            Checkout
          </Button>
        </div>
      )}
    </>
  );
}
