"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Minus, Plus, X } from "lucide-react";
import { FoodItem } from "./FoodCard";

interface FoodDetailDialogProps {
  food: FoodItem | null;
  onClose: () => void;
  onAddToCart: (food: FoodItem, quantity: number) => void;
}

export function FoodDetailDialog({
  food,
  onClose,
  onAddToCart,
}: FoodDetailDialogProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (food) {
      onAddToCart(food, quantity);
      setQuantity(1);
    }
  };

  return (
    <Dialog open={!!food} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125 p-0 gap-0">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 rounded-full bg-white/90 backdrop-blur-sm shadow-md z-10 hover:bg-white h-8 w-8"
          onClick={onClose}
        >
          <X className="h-3.5 w-3.5" />
        </Button>

        {food && (
          <div className="flex flex-col">
            <div className="relative h-56 w-full">
              <img
                src={food.imageUrl}
                alt={food.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5">
              <h2 className="text-xl font-bold text-red-500 mb-2">
                {food.name}
              </h2>
              <p className="text-gray-600 text-xs mb-5 leading-relaxed">
                {food.ingredients}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium text-sm">
                    Price
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 border rounded-full px-1.5 bg-gray-50">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full hover:bg-white"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-base font-semibold min-w-6 text-center">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full hover:bg-white"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="text-xl font-bold">{food.price}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-5 rounded-full text-sm font-semibold shadow-md"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
