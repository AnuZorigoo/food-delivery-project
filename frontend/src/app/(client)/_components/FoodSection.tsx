"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { FoodCard } from "./FoodCard";

type Food = {
  _id: string;
  name: string;
  price: number;
  ingredients: string;
  imageUrl: string;
  categoryId: Array<{ _id: string; name: string }>;
};

type Category = {
  _id: string;
  name: string;
};

export const FoodSection = ({
  addToCart,
}: {
  addToCart: (food: any) => void;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const [catRes, foodRes] = await Promise.all([
          api.get<Category[]>("/categories", config),
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
};

// "use client";

// import { useEffect, useState } from "react";
// import { FoodEditCard } from "./_components/FoodEditCard";
// import { Button } from "@/components/ui/button";
// import { api } from "@/lib/axios";
// import { CreateFoodDialog } from "./_components/CreateFood";
// import { CreateCategoryDialog } from "./_components/CreateCategoryDialog";

// type Food = {
//   _id: string;
//   name: string;
//   price: number;
//   ingredients: string;
//   imageUrl: string;
//   categoryId: Array<{
//     _id: string;
//     name: string;
//   }>;
// };

// type Categories = {
//   _id: string;
//   name: string;
// };

// export default function Home() {
//   const [categories, setCategories] = useState<Categories[]>([]);
//   const [foods, setFoods] = useState<Food[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [catRes, foodRes] = await Promise.all([
//           api.get<Categories[]>("/categories"),
//           api.get<Food[]>("/foods", {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             },
//           }),
//         ]);

//         setCategories(catRes.data);

//         const normalizedFoods = foodRes.data.map((f: any) => ({
//           ...f,
//           categoryId: Array.isArray(f.categoryId)
//             ? f.categoryId
//             : f.categoryId
//               ? [f.categoryId]
//               : [],
//         }));
//         setFoods(normalizedFoods);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const onAddToCart = (food: Food) => {
//     console.log("Added to cart:", food);
//   };

//   const filteredCategories = selectedCategory
//     ? categories.filter((cat) => cat._id === selectedCategory)
//     : categories;

//   return (
//     <div className="min-h-screen bg-secondary p-8">
//       <div className="flex justify-end mb-4">
//         <Button variant="ghost" className="rounded-full">
//           <img src="/Container (7).png" alt="Logo" />
//         </Button>
//       </div>

//       <div className="w-full h-fit bg-white rounded-2xl p-5 mb-8 gap-4 flex flex-col">
//         <p className="text-[20px] font-semibold">Dishes Category</p>
//         <div className="flex gap-2 flex-wrap">
//           <span
//             onClick={() => setSelectedCategory(null)}
//             className={`border rounded-full px-5 py-2 text-sm font-medium cursor-pointer transition ${
//               selectedCategory === null
//                 ? "bg-black text-white"
//                 : "border-secondary hover:bg-black hover:text-white"
//             }`}
//           >
//             All
//           </span>

//           {categories.map((category) => (
//             <span
//               key={category._id}
//               onClick={() => setSelectedCategory(category._id)}
//               className={`border rounded-full px-5 py-2 text-sm font-medium cursor-pointer transition ${
//                 selectedCategory === category._id
//                   ? "bg-black text-white"
//                   : "border-secondary hover:bg-black hover:text-white"
//               }`}
//             >
//               {category.name}
//             </span>
//           ))}
//           <CreateCategoryDialog />
//         </div>
//       </div>

//       <div className="flex flex-col gap-8">
//         {filteredCategories.map((category) => {
//           const foodsInCategory = foods.filter((food) =>
//             food.categoryId.some((cat) => cat._id === category._id),
//           );

//           return (
//             <div key={category._id} className="border rounded-lg bg-white p-5">
//               <p className="text-[20px] font-semibold mb-5">{category.name}</p>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
//                 {foodsInCategory.map((food) => (
//                   <FoodEditCard
//                     key={food._id}
//                     food={food}
//                     onAddToCart={onAddToCart}
//                   />
//                 ))}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";

// import { toast } from "sonner";
// export interface FoodItem {
//   id: number;
//   name: string;
//   price: string;
//   description: string;
//   image: string;
// }

// interface FoodCardProps {
//   item: FoodItem;
//   onClick: (item: FoodItem) => void;
// }

// export const FoodCard = ({
//   food,
//   onAddToCart,
// }: {
//   food: any;
//   onAddToCart: (food: any) => void;
// }) => {
//   const [checked, setChecked] = useState(false);

//   const handleClick = () => {
//     setChecked(!checked);

//     if (!checked) {
//       onAddToCart?.(food);
//       toast.success("Added to cart!");
//     }
//   };
//   const [quantity, setQuantity] = useState(0);

//   const increment = () => {
//     setQuantity((prev) => prev + 1);
//   };
//   const decrement = () => {
//     setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
//   };

//   return (
//     <Dialog>
//       <div className="h-85.5 rounded-4xl bg-white flex flex-col gap-5 p-4 border border-gray-200">
//         <div className="relative">
//           <img
//             className="w-full h-52.5 rounded-xl object-cover"
//             src={food.image}
//             alt={food.title}
//           />

//           <Button
//             onClick={handleClick}
//             className={`
//         absolute bottom-3 right-3 w-10 h-10 p-0 rounded-full text-[20px] font-semibold flex items-center justify-center
//         transition-all
//         ${
//           checked
//             ? "bg-[#EF4444] text-white"
//             : "bg-white text-[#EF4444] shadow-md"
//         }
//       `}
//           >
//             {checked ? "✓" : "+"}
//           </Button>
//         </div>

//         <DialogTrigger asChild>
//           <div className="flex flex-col gap-2 cursor-pointer">
//             <div className="flex justify-between items-center">
//               <p className="text-[24px] text-[#EF4444] font-semibold">
//                 {food.title}
//               </p>
//               <p className="font-semibold text-[18px]">{food.price}</p>
//             </div>

//             <p className="text-[14px] text-gray-600">{food.description}</p>
//           </div>
//         </DialogTrigger>

//         <DialogContent className="max-w-200 w-full p-0 rounded-2xl">
//           <DialogHeader>
//             <DialogTitle></DialogTitle>
//           </DialogHeader>
//           <div className="flex gap-6 p-6 bg-white rounded-2xl">
//             <img
//               src={food.image}
//               alt={food.title}
//               className="w-75 h-65 object-cover rounded-xl"
//             />
//             <div className="flex flex-col justify-between w-full">
//               <div>
//                 <Label className="text-[30px] text-[#EF4444] font-semibold">
//                   {food.title}
//                 </Label>
//                 <p className="text-[16px] text-gray-600">{food.description}</p>
//               </div>

//               <div>
//                 <div className="flex justify-between mb-4">
//                   <div>
//                     <p className="text-[16px]">Total price</p>
//                     <p className="text-[24px] font-semibold">{food.price}</p>
//                   </div>
//                   <div className="flex gap-3 items-center">
//                     <Button
//                       onClick={decrement}
//                       variant={"secondary"}
//                       className="rounded-full border border-black bg-transparent"
//                     >
//                       -
//                     </Button>
//                     <p>{quantity}</p>
//                     <Button
//                       onClick={increment}
//                       variant={"secondary"}
//                       className="rounded-full border border-black bg-transparent"
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </div>
//                 <DialogClose asChild>
//                   <Button
//                     className="w-full rounded-full"
//                     onClick={() => {
//                       onAddToCart?.(food);
//                       toast.success("Added to cart!");
//                     }}
//                   >
//                     Add to Cart
//                   </Button>
//                 </DialogClose>
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </div>
//     </Dialog>
//   );
// }; ene 2 codiig holbood aytaihn bolgood uguuch
