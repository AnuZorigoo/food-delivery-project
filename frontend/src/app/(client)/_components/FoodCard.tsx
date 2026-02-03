"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const FoodCard = ({
  food,
  onAddToCart,
}: {
  food: any;
  onAddToCart: (food: any) => void;
}) => {
  const [checked, setChecked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setChecked(!checked);
    if (!checked) {
      onAddToCart?.({ ...food, quantity: 1 });
      toast.success("Added to cart!");
    }
  };

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Dialog>
      <div className="h-85.5 rounded-[2.5rem] bg-white flex flex-col gap-5 p-4 border border-gray-200">
        <div className="relative">
          <img
            className="w-full h-52.5 rounded-xl object-cover"
            src={food.imageUrl || food.image}
            alt={food.name}
          />
          <Button
            onClick={handleQuickAdd}
            className={`absolute bottom-3 right-3 w-10 h-10 p-0 rounded-full text-[20px] font-semibold flex items-center justify-center transition-all ${
              checked
                ? "bg-[#EF4444] text-white"
                : "bg-white text-[#EF4444] shadow-md"
            }`}
          >
            {checked ? "✓" : "+"}
          </Button>
        </div>

        <DialogTrigger asChild>
          <div className="flex flex-col gap-2 cursor-pointer">
            <div className="flex justify-between items-center">
              <p className="text-[24px] text-[#EF4444] font-semibold truncate pr-2">
                {food.name}
              </p>
              <p className="font-semibold text-[18px] whitespace-nowrap">
                ₮{food.price}
              </p>
            </div>
            <p className="text-[14px] text-gray-600 line-clamp-2">
              {food.ingredients}
            </p>
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-[800px] w-full p-0 rounded-2xl overflow-hidden border-none">
          <DialogHeader className="hidden">
            <DialogTitle>{food.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col md:flex-row gap-6 p-6 bg-white">
            <img
              src={food.imageUrl || food.image}
              alt={food.name}
              className="w-full md:w-75 h-65 object-cover rounded-xl"
            />
            <div className="flex flex-col justify-between w-full">
              <div>
                <Label className="text-[30px] text-[#EF4444] font-semibold block mb-2">
                  {food.name}
                </Label>
                <p className="text-[16px] text-gray-600">{food.ingredients}</p>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-[16px] text-gray-400">Total price</p>
                    <p className="text-[24px] font-semibold">
                      ₮{(food.price * quantity).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Button
                      onClick={decrement}
                      variant="outline"
                      className="rounded-full w-10 h-10 border-black bg-transparent"
                    >
                      -
                    </Button>
                    <span className="text-lg font-medium">{quantity}</span>
                    <Button
                      onClick={increment}
                      variant="outline"
                      className="rounded-full w-10 h-10 border-black bg-transparent"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <DialogClose asChild>
                  <Button
                    className="w-full h-12 rounded-full bg-[#EF4444] hover:bg-[#D93636] text-white font-bold"
                    onClick={() => {
                      onAddToCart?.({ ...food, quantity });
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
