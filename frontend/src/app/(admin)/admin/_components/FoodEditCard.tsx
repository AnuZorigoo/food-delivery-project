"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";

import { toast } from "sonner";
import { CategoryCombobox } from "./CategoryCombobox";

export const FoodEditCard = ({
  food,
  onAddToCart,
}: {
  food: any;
  onAddToCart: (food: any) => void;
}) => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked(!checked);

    if (!checked) {
      onAddToCart?.(food);
      toast.success("Added to cart!");
    }
  };
  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <Dialog>
      <div className="h-85.5 rounded-4xl bg-white flex flex-col gap-5 p-4 border border-gray-200">
        <div className="relative">
          <img
            className="w-full h-52.5 rounded-xl object-cover"
            src={food.imageUrl}
            alt={food.name}
          />
          <DialogTrigger asChild>
            <Button
              onClick={handleClick}
              className={`
        absolute bottom-3 right-3 w-10 h-10 p-0 rounded-full text-[20px] font-semibold flex items-center justify-center
        transition-all
        ${
          checked
            ? "bg-[#EF4444] text-white"
            : "bg-white text-[#EF4444] shadow-md"
        }
      `}
            >
              <Pencil />
            </Button>
          </DialogTrigger>
        </div>
        <div className="flex flex-col gap-2 cursor-pointer">
          <div className="flex justify-between items-center">
            <p className="text-[24px] text-[#EF4444] font-semibold">
              {food.name}
            </p>
            <p className="font-semibold text-[18px]">{food.price}</p>
          </div>

          <p className="text-[14px] text-gray-600">{food.ingredients}</p>
        </div>

        <DialogContent className="max-w-200 w-full p-0 rounded-2xl">
          <div className="flex flex-col gap-6 p-6 bg-white rounded-2xl">
            <div className="flex flex-col justify-between w-full gap-5">
              <div>
                <Label className="text-[18px] font-semibold">Dishes info</Label>
              </div>
              <div className="flex gap-2">
                <p className="text-[12px] text-[#71717A] flex-1">Dish name</p>
                <Input
                  id="dish-name"
                  name="dish-name"
                  defaultValue={food.name}
                  className="flex-3"
                />
              </div>
              <div className="flex gap-2">
                <p className="text-[12px] text-[#71717A] flex-1">
                  Dish category
                </p>
                <div className="flex-3">
                  <CategoryCombobox />
                </div>
              </div>
              <div className="flex gap-2">
                <p className="text-[12px] text-[#71717A] flex-1">Ingredients</p>
                <Input
                  id="dish-name"
                  name="dish-name"
                  defaultValue={food.ingredients}
                  className="flex-3"
                />
              </div>
              <div className="flex gap-2">
                <p className="text-[12px] text-[#71717A] flex-1">Price</p>
                <Input
                  id="dish-name"
                  name="dish-name"
                  defaultValue={food.price}
                  className="flex-3"
                />
              </div>
              <div className="flex gap-2">
                <p className="text-[12px] text-[#71717A] flex-1">Image</p>
                <img
                  src={food.imageUrl}
                  alt={food.name}
                  className="w-75 h-65 object-cover rounded-xl flex-3"
                />
              </div>

              <div className="flex justify-between">
                <Button
                  className="h-10 w-12 border border-red-400"
                  variant={"outline"}
                >
                  <Trash className="text-red-400" />
                </Button>
                <Button onClick={() => onAddToCart?.(food)}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};
