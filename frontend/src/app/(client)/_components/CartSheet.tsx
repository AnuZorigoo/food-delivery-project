import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart } from "lucide-react";

export const CartSheet = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="bg-[#404040]  text-white p-4 gap-1,5">
        <SheetHeader className="flex flex-col gap-5">
          <SheetTitle className="flex text-white gap-2 ">
            {" "}
            <ShoppingCart /> Order Detail{" "}
          </SheetTitle>
          <div className="flex gap-1 w-full rounded-full bg-white p-1">
            <Button className="flex-1 rounded-full bg-[#EF4444]">Cart</Button>
            <Button className="flex-1 rounded-full bg-white text-black">
              Order
            </Button>
          </div>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4 rounded-4xl bg-white h-135 text-black p-4">
          <p className="text-[20px] font-semibold">My Cart</p>
          <div className="flex flex-col items-center gap-1 bg-[#F4F4F5] rounded-4xl p-4">
            <img
              src={"/Screenshot 2024-12-17 at 18.02.18 1 (Traced).png"}
            ></img>
            <p className="text-[16px] font-bold">Your cart is empthy </p>
            <p className="text-[12px] text-[#71717A]">
              Hungry? 🍔 Add some delicious dishes to your cart and satisfy your
              cravings!
            </p>
          </div>
        </div>
        <SheetFooter>
          <div className="h-69 bg-[#FFFFFF]rounded-2xl flex flex-col gap-4 p-4">
            <p className="text-[20px] font-semibold">Payment info</p>
            <div className="flex flex-col gap-2">
              <p className="text-[#71717A] text-[16px]">Items</p>
              <p className="text-[#71717A] text-[16px]">Shipping</p>
            </div>
            <p className="text-[#71717A] text-[16px]">Total</p>
            <Button className=" rounded-full bg-[#EF4444]">Checkout</Button>
          </div>
          {/* <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
