"use client";
import { FoodCard } from "@/app/(client)/_components/FoodCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileInput } from "lucide-react";
import { map } from "zod/v4/mini";
import { FoodEditCard } from "./_components/FoodEditCard";

export default function Home() {
  const foods = [
    {
      id: 1,
      image: "/4ff51a14c041fc57196ebf52f07e524b5e4cc98c.png",
      title: "Finger food",
      price: "$12.99",
      description: "Fluffy pancakes stacked with fruits",
    },
    {
      id: 2,
      image: "/4ff51a14c041fc57196ebf52f07e524b5e4cc98c.png",
      title: "Salad",
      price: "$9.99",
      description: "Fresh garden salad with vinaigrette dressing.",
    },
    {
      id: 3,
      image: "/4ff51a14c041fc57196ebf52f07e524b5e4cc98c.png",
      title: "Bruschetta",
      price: "$8.99",
      description: "Toasted bread with tomatoes, basil, and olive oil.",
    },
    {
      id: 4,
      image: "/4ff51a14c041fc57196ebf52f07e524b5e4cc98c.png",
      title: "Spring Rolls",
      price: "$7.99",
      description: "Crispy rolls stuffed with veggies and served with dip.",
    },
  ];

  const onAddToCart = (food: any) => () => {
    console.log("Added to cart:");
  };

  return (
    <div className="min-h-screen h-full bg-secondary flex flex-col  p-8">
      <div className="w-full  flex content-end justify-end ">
        <Button variant={"ghost"} className="rounded-full flex-end">
          <img src="/Container (7).png" alt="Logo" className=" mb-4" />
        </Button>
      </div>
      <div className=" border rounded-lg bg-white p-5">
        <p className="text-[20px] font-semibold pl-5">Appetizers</p>
        <div className="grid grid-cols-4 grid-rows-2 p-5 gap-5">
          <div className="flex flex-col gap-5 items-center justify-center border border-dashed border-red-400 rounded-lg">
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full w-10 h-10 bg-red-400 flex justify-center items-center text-white"
                  >
                    +
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] flex flex-col gap-4">
                  <DialogHeader>
                    <DialogTitle>Add new Dish to Appetizers</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="flex gap-2">
                      <div className="grid gap-3">
                        <Label htmlFor="name-1">Food name</Label>
                        <Input
                          id="name-1"
                          name="name"
                          placeholder="Type food name"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="name-1">Food price</Label>
                        <Input
                          id="name-1"
                          name="name"
                          placeholder="Enter price..."
                        />
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="username-1">Ingredients</Label>
                      <Input
                        id="username-1"
                        name="username"
                        placeholder="List ingredients..."
                      />
                    </div>
                    <Label htmlFor="username-1">Food image</Label>
                    <FileInput />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
            <p>Add new Dish to Salads </p>
          </div>

          {foods.map((food) => (
            <FoodEditCard key={food.id} food={food} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}

<Empty className="border border-dashed flex flex-col justify-center items-center gap-5">
  <EmptyHeader>
    <Button
      variant="outline"
      size="sm"
      className="rounded-full bg-red-400 text-white h-10 w-10 flex items-center justify-center"
    >
      +
    </Button>
  </EmptyHeader>
  <EmptyContent>
    <EmptyTitle>Add new Dish to Appetizers</EmptyTitle>
  </EmptyContent>
</Empty>;
