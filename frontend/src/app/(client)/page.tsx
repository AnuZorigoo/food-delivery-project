"use client";
import Image from "next/image";
import { FoodCard, FoodItem } from "./_components/FoodCard";

import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "./context/cart-context";
import { Header } from "./_components/Header";
import FoodSection from "./_components/FoodSection";

export default function Home() {
  const { addToCart, setIsCartOpen, getTotalItems } = useCart();
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  const handleAddToCart = (food: FoodItem, quantity: number) => {
    for (let i = 0; i < quantity; i++) addToCart(food as any);
    setSelectedFood(null);
    toast.success("Food is being added to the cart!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#404040] font-sans dark:bg-black flex-col gap-13.5">
      <img src={"/BG.png"}></img>

      <FoodSection addToCart={addToCart} />
    </div>
  );
}
