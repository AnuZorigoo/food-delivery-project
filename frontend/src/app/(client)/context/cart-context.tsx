"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CartDrawer } from "../_components/CardDrawer";

type Food = {
  _id: number;
  name: string;
  price: string;
  ingredients: string;
  imageUrl: string;
};

export type OrderItem = Food & {
  status: string;
};

export type CartItem = Food & {
  quantity: number;
  // status: string;
};

interface CartContextType {
  cartItems: CartItem[];
  orders: OrderItem[];
  addToCart: (item: Food) => void;
  removeFromCart: (_id: number) => void;
  updateQuantity: (_id: number, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: Food) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i._id === item._id);
      if (existingItem) {
        return prevItems.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, quantity } : item)),
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price =
        typeof item.price === "string"
          ? parseFloat(item.price.replace("$", ""))
          : item.price;

      return total + price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
