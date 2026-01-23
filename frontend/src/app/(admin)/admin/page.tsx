"use client";

import { useEffect, useState } from "react";
import { FoodEditCard } from "./_components/FoodEditCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/axios";
import { CreateFoodDialog } from "./_components/CreateFood";

type Food = {
  _id: string;
  name: string;
  price: number;
  ingredients: string;
  imageUrl: string;
  categoryId: [
    {
      _id: string;
      name: string;
    },
  ];
};
type Categories = {
  _id: string;
  name: string;
};

export default function Home() {
  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await api.get<Categories[]>("/categories");
      setCategories(data);
    };
    getData();
  }, []);

  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await api.get<Food[]>("/foods");
      setFoods(data);
    };
    getData();
  }, []);

  const onAddToCart = (food: Food) => {
    console.log("Added to cart:", food);
  };

  return (
    <div className="min-h-screen bg-secondary p-8">
      <div className="flex justify-end mb-4">
        <Button variant="ghost" className="rounded-full">
          <img src="/Container (7).png" alt="Logo" />
        </Button>
      </div>

      <div className="w-full h-fit bg-white rounded-2xl p-5 mb-8 gap-4 flex flex-col">
        <p className="text-[20px] font-semibold">Dishes Category</p>
        <div className="flex gap-2">
          {categories.map((category) => (
            <span
              key={category._id}
              className="border border-secondary rounded-full pl-5 pr-5 pt-2 pb-2 text-sm font-medium text-black cursor-pointer hover:bg-black hover:text-white transition"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>

      <div className="border rounded-lg bg-white p-5">
        <p className="text-[20px] font-semibold mb-5">Appetizers</p>

        <div className="grid grid-cols-4 gap-5">
          <CreateFoodDialog />

          {foods.map((food) => (
            <FoodEditCard
              key={food._id}
              food={food}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
