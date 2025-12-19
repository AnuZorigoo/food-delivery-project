"use client";

export const FoodCard = ({ food }: { food: any }) => {
  return (
    <div className="w-100 h-85.5 rounded-4xl bg-white flex flex-col gap-5 p-4">
      <img
        className="w-92.5 h-{210px] rounded "
        src={food.image}
        alt={food.title}
      />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-[24px] text-[#EF4444] font-semibold">
            {food.title}
          </p>
          <p className="font-semibold text-[18px]">{food.price}</p>
        </div>
        <p className="text-[14px]">{food.description}</p>
      </div>
    </div>
  );
};
