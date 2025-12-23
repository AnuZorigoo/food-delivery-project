import Image from "next/image";
import { FoodCard } from "./_components/FoodCard";
import { FoodSection } from "./_components/FoodSection";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#404040] font-sans dark:bg-black flex-col gap-[54px]">
      <img src={"/BG.png"}></img>
      <FoodSection />
    </div>
  );
}
