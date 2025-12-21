"use client";

import { FoodCard } from "@/app/(client)/_components/FoodCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const FoodSection = () => {
  const foods = [
    {
      id: 1,
      image: "/Product Image (1).png",
      title: "Finger food",
      price: "$12.99",
      description:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    },
    {
      id: 2,
      image: "/Product Image (1).png",
      title: "Salad",
      price: "$9.99",
      description: "Fresh garden salad with vinaigrette dressing.",
    },
    {
      id: 3,
      image: "/Product Image (1).png",
      title: "Bruschetta",
      price: "$8.99",
      description: "Toasted bread with tomatoes, basil, and olive oil.",
    },
    {
      id: 4,
      image: "/Product Image (1).png",
      title: "Spring Rolls",
      price: "$7.99",
      description: "Crispy rolls stuffed with veggies and served with dip.",
    },
    
  ];

  return (
    <div className="flex flex-col pb-10">
    <div className="w-full pt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">Appetizers</h2>
        <Link href="/foods">
          <Button variant="secondary" className="flex items-center gap-2">
            See more <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
    <div className="w-full pt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">Salads</h2>
        <Link href="/foods">
          <Button variant="secondary" className="flex items-center gap-2">
            See more <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
    <div className="w-full pt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">Lunch favorites</h2>
        <Link href="/foods">
          <Button variant="secondary" className="flex items-center gap-2">
            See more <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
    </div>
  );
};
