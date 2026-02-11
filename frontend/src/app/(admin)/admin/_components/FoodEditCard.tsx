"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import { toast } from "sonner";
import { CategoryCombobox } from "./CategoryCombobox";
import { api } from "@/lib/axios";

const toCategoryId = (cat: any): string => {
  if (!cat) return "";
  if (typeof cat === "string") return cat;
  if (Array.isArray(cat)) return cat?.[0]?._id || cat?.[0] || "";
  return cat?._id || "";
};

export const FoodEditCard = ({
  food,
  onAddToCart,
}: {
  food: any;
  onAddToCart: (food: any) => void;
}) => {
  const [currentFood, setCurrentFood] = useState<any>({
    ...food,
    // ✅ normalize categoryId into string right away
    categoryId: toCategoryId(food.categoryId),
  });

  const [checked, setChecked] = useState(false);
  const [quantity, setQuantity] = useState(0);

  // optional: if parent re-renders with new food, keep state synced
  useEffect(() => {
    setCurrentFood({
      ...food,
      categoryId: toCategoryId(food.categoryId),
    });
  }, [food]);

  const handleClick = () => {
    setChecked((prev) => !prev);

    if (!checked) {
      onAddToCart?.(food);
      toast.success("Added to cart!");
    }
  };

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const handleDelete = async (_id: string) => {
    try {
      const token = localStorage.getItem("accessToken");

      await api.delete(`/foods/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Food deleted successfully");
    } catch (err) {
      console.error("Delete food failed:", err);
      toast.error("Failed to delete food");
    }
  };

  const handleEdit = async (_id: string) => {
    try {
      const token = localStorage.getItem("accessToken");

      // ✅ send only what backend expects
      const payload = {
        name: currentFood.name,
        price: Number(currentFood.price),
        ingredients: currentFood.ingredients,
        imageUrl: currentFood.imageUrl,
        categoryId: toCategoryId(currentFood.categoryId),
      };

      await api.put(`/foods/${_id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Food updated successfully");
    } catch (err) {
      console.error("Update food failed:", err);
      toast.error("Failed to update food");
    }
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
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-6 p-6 bg-white rounded-2xl">
            <div className="flex flex-col justify-between w-full gap-5">
              <div>
                <Label className="text-[18px] font-semibold">Dishes info</Label>
              </div>

              <div className="flex gap-2 items-center">
                <p className="text-[12px] text-[#71717A] flex-1">Dish name</p>
                <Input
                  value={currentFood.name ?? ""}
                  onChange={(e) =>
                    setCurrentFood({ ...currentFood, name: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-2 items-center">
                <p className="text-[12px] text-[#71717A] flex-1">
                  Dish category
                </p>

                <div className="flex-[3]">
                  <CategoryCombobox
                    value={currentFood.categoryId}
                    onChange={(newCategoryId: string) =>
                      setCurrentFood({
                        ...currentFood,
                        categoryId: newCategoryId,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <p className="text-[12px] text-[#71717A] flex-1">Ingredients</p>
                <Input
                  value={currentFood.ingredients ?? ""}
                  onChange={(e) =>
                    setCurrentFood({
                      ...currentFood,
                      ingredients: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex gap-2 items-center">
                <p className="text-[12px] text-[#71717A] flex-1">Price</p>
                <Input
                  type="number"
                  value={currentFood.price ?? 0}
                  onChange={(e) =>
                    setCurrentFood({
                      ...currentFood,
                      price: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="flex gap-2 items-start">
                <p className="text-[12px] text-[#71717A] flex-1">Image</p>
                <img
                  src={currentFood.imageUrl}
                  alt={currentFood.name}
                  className="w-75 h-65 object-cover rounded-xl flex-[3]"
                />
              </div>

              <div className="flex justify-between">
                <Button
                  className="h-10 w-12 border border-red-400"
                  variant={"outline"}
                  onClick={() => handleDelete(food._id)}
                >
                  <Trash className="text-red-400" />
                </Button>

                <Button onClick={() => handleEdit(food._id)}>
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
