"use client";

import { Button } from "@/components/ui/button";

export const FoodCard = ({
  food,
  onAddToCart,
}: {
  food: any;
  onAddToCart: (food: any) => void;
}) => {
  return (
    <div className="h-85.5 rounded-4xl bg-white flex flex-col gap-5 p-4">
      <div className="relative">
        <img
          className="w-full h-[210px] rounded-xl object-cover"
          src={food.image}
          alt={food.title}
        />

        <Button
          onClick={() => onAddToCart?.(food)}
          className="
            absolute bottom-3 right-3
            w-10 h-10 p-0
            rounded-full bg-white
            text-[#EF4444] shadow-md
            text-[20px] font-semibold
            flex items-center justify-center
          "
        >
          +
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-[24px] text-[#EF4444] font-semibold">
            {food.title}
          </p>
          <p className="font-semibold text-[18px]">{food.price}</p>
        </div>

        <p className="text-[14px] text-gray-600">{food.description}</p>
      </div>
    </div>
  );
};
