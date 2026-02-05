"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { FoodCard } from "./FoodCard";

type Food = {
  _id: string;
  name: string;
  price: string;
  ingredients: string;
  imageUrl: string;
  categoryId: Array<{ _id: string; name: string }>;
};

type Categories = {
  _id: string;
  name: string;
};

export default function FoodSection({
  addToCart,
}: {
  addToCart: (food: any) => void;
}) {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const [catRes, foodRes] = await Promise.all([
          api.get<Categories[]>("/categories", config),
          api.get<Food[]>("/foods", config),
        ]);

        setCategories(catRes.data);
        const normalizedFoods = foodRes.data.map((f: any) => ({
          ...f,
          categoryId: Array.isArray(f.categoryId)
            ? f.categoryId
            : f.categoryId
              ? [f.categoryId]
              : [],
        }));
        setFoods(normalizedFoods);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const onAddToCart = (food: Food) => {
    console.log("Added to cart:", food);
  };

  return (
    <div className="w-full bg-[#404040] px-20 py-10 flex flex-col gap-10">
      <div className="flex flex-col gap-8">
        {categories.map((category) => {
          const foodsInCategory = foods.filter((food) =>
            food.categoryId.some((cat) => cat._id === category._id),
          );

          if (foodsInCategory.length === 0) return null;

          return (
            <div key={category._id} className="rounded-lg bg-[#404040] p-5">
              <p className="text-[20px] text-white font-semibold mb-5">
                {category.name}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {foodsInCategory.map((food) => (
                  <FoodCard
                    key={food._id}
                    food={food}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
