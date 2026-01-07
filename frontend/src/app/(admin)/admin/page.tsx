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
    }
  ];
};

export default function Home() {
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

      <div className="border rounded-lg bg-white p-5">
        <p className="text-lg font-semibold mb-5">Appetizers</p>

        <div className="grid grid-cols-4 gap-5">
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex flex-col gap-3 items-center justify-center border border-dashed border-red-400 rounded-lg cursor-pointer h-full">
                <Button className="rounded-full w-10 h-10 bg-red-400 text-white">
                  +
                </Button>
                <p>Add new Dish</p>
              </div>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new Dish</DialogTitle>
              </DialogHeader>

              <form className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Label>Food name</Label>
                    <Input placeholder="Type food name" />
                  </div>
                  <div className="flex-1">
                    <Label>Price</Label>
                    <Input type="number" placeholder="Enter price" />
                  </div>
                </div>

                <div>
                  <Label>Ingredients</Label>
                  <Input placeholder="List ingredients" />
                </div>

                <div>
                  <Label>Food image</Label>
                  <Input type="file" />
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {foods.map((food) => (
            <FoodEditCard
              key={food._id}
              food={food}
              name={food.name}
              price={food.price}
              ingredients={food.ingredients}
              imageUrl={food.imageUrl}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
