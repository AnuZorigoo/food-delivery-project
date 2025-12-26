"use client";
import Image from "next/image";
import { FoodCard } from "./_components/FoodCard";
import { FoodSection } from "./_components/FoodSection";

import { CartSheet } from "./_components/CartSheet";
import { useState } from "react";

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const addToCart = (food: any) => {
    setCart((prev) => [...prev, food]);
    setOpen(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#404040] font-sans dark:bg-black flex-col gap-[54px]">
      <img src={"/BG.png"}></img>
      <FoodSection addToCart={addToCart} />
      <CartSheet open={open} setOpen={setOpen} cart={cart} />
    </div>
  );
}
