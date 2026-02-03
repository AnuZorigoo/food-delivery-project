"use client";

import { useEffect, useState } from "react";
import { FoodEditCard } from "./_components/FoodEditCard";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { CreateFoodDialog } from "./_components/CreateFood";
import { CreateCategoryDialog } from "./_components/CreateCategoryDialog";

type Food = {
  _id: string;
  name: string;
  price: number;
  ingredients: string;
  imageUrl: string;
  categoryId: Array<{
    _id: string;
    name: string;
  }>;
};

type Categories = {
  _id: string;
  name: string;
};

export default function Home() {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, foodRes] = await Promise.all([
          api.get<Categories[]>("/categories"),
          api.get<Food[]>("/foods", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }),
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

  // Шүүлтүүрийн логик
  const filteredCategories = selectedCategory
    ? categories.filter((cat) => cat._id === selectedCategory)
    : categories;

  return (
    <div className="min-h-screen bg-secondary p-8">
      <div className="flex justify-end mb-4">
        <Button variant="ghost" className="rounded-full">
          <img src="/Container (7).png" alt="Logo" />
        </Button>
      </div>

      {/* Category Selection Tab */}
      <div className="w-full h-fit bg-white rounded-2xl p-5 mb-8 gap-4 flex flex-col">
        <p className="text-[20px] font-semibold">Dishes Category</p>
        <div className="flex gap-2 flex-wrap">
          <span
            onClick={() => setSelectedCategory(null)}
            className={`border rounded-full px-5 py-2 text-sm font-medium cursor-pointer transition ${
              selectedCategory === null
                ? "bg-black text-white"
                : "border-secondary hover:bg-black hover:text-white"
            }`}
          >
            All
          </span>

          {categories.map((category) => (
            <span
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              className={`border rounded-full px-5 py-2 text-sm font-medium cursor-pointer transition ${
                selectedCategory === category._id
                  ? "bg-black text-white"
                  : "border-secondary hover:bg-black hover:text-white"
              }`}
            >
              {category.name}
            </span>
          ))}
          <CreateCategoryDialog />
        </div>
      </div>

      {/* Food Display Sections */}
      <div className="flex flex-col gap-8">
        {filteredCategories.map((category) => {
          // Тухайн ангилалд хамаарах хоолнуудыг шүүнэ
          const foodsInCategory = foods.filter((food) =>
            food.categoryId.some((cat) => cat._id === category._id),
          );

          return (
            <div key={category._id} className="border rounded-lg bg-white p-5">
              <p className="text-[20px] font-semibold mb-5">{category.name}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Ангилал бүрийн эхэнд Add New Dish товчийг байрлууллаа */}
                <CreateFoodDialog />

                {foodsInCategory.map((food) => (
                  <FoodEditCard
                    key={food._id}
                    food={food}
                    onAddToCart={onAddToCart}
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
