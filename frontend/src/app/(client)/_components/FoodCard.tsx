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
import { useState } from "react";
import { toast } from "sonner";

export interface FoodItem {
  id: number;
  name: string;

  price: string;

  description: string;

  image: string;
}

interface FoodCardProps {
  item: FoodItem;

  onClick: (item: FoodItem) => void;
}

export const FoodCard = ({
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

          <Button
            onClick={handleClick}
            className={`

absolute bottom-3 right-3 w-10 h-10 p-0 rounded-full text-[20px] font-semibold flex items-center justify-center

transition-all

${checked ? "bg-[#EF4444] text-white" : "bg-white text-[#EF4444] shadow-md"}

`}
          >
            {checked ? "✓" : "+"}
          </Button>
        </div>

        <DialogTrigger asChild>
          <div className="flex flex-col gap-2 cursor-pointer">
            <div className="flex justify-between items-center">
              <p className="text-[24px] text-[#EF4444] font-semibold">
                {food.name}
              </p>

              <p className="font-semibold text-[18px]">{food.price}</p>
            </div>

            <p className="text-[14px] text-gray-600">{food.ingredients}</p>
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-200 w-full p-0 rounded-2xl">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>

          <div className="flex gap-6 p-6 bg-white rounded-2xl">
            <img
              src={food.imageUrl}
              alt={food.name}
              className="w-75 h-65 object-cover rounded-xl"
            />

            <div className="flex flex-col justify-between w-full">
              <div>
                <Label className="text-[30px] text-[#EF4444] font-semibold">
                  {food.name}
                </Label>

                <p className="text-[16px] text-gray-600">{food.ingredients}</p>
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-[16px]">Total price</p>

                    <p className="text-[24px] font-semibold">{food.price}</p>
                  </div>

                  <div className="flex gap-3 items-center">
                    <Button
                      onClick={decrement}
                      variant={"secondary"}
                      className="rounded-full border border-black bg-transparent"
                    >
                      -
                    </Button>

                    <p>{quantity}</p>

                    <Button
                      onClick={increment}
                      variant={"secondary"}
                      className="rounded-full border border-black bg-transparent"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <DialogClose asChild>
                  <Button
                    className="w-full rounded-full"
                    onClick={() => {
                      onAddToCart?.(food);

                      toast.success("Added to cart!");
                    }}
                  >
                    Add to Cart
                  </Button>
                </DialogClose>
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};
