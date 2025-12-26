"use client";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

type CartItem = {
  id?: string | number;
  title: string;
  price: string | number;
};

type CartSheetProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: (v: boolean) => void;
  cart?: CartItem[];
};

export const CartSheet = ({ children, open, setOpen, cart }: any) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="bg-[#404040] text-white p-4 flex flex-col gap-4">
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

        <div className="flex-1 bg-white text-black rounded-4xl p-4 overflow-auto">
          <p className="text-[20px] font-semibold mb-3 text-[#71717A]">
            My Cart
          </p>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center gap-2 text-center text-gray-500">
              <p className="font-semibold">Your cart is empty</p>
              <p className="text-sm">
                Hungry? 🍔 Add some delicious dishes to your cart!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {cart.map((item: any, i: number) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b pb-2 gap-2"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <div className="flex">
                      <div>
                        <p className="font-bold text-[#EF4444]">{item.title}</p>
                        <p className="text-[12px]">{item.description}</p>
                      </div>
                      <Button
                        className="rounded-full border border-[#EF4444] text-[#EF4444] h-6 w-6 p-0 flex items-center justify-center bg-transparent"
                        variant={"secondary"}
                      >
                        x
                      </Button>
                    </div>
                    <div className="flex flex-col items-between h-full justify-between"></div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1 items-center">
                        <Button
                          onClick={decrement}
                          variant={"secondary"}
                          className="rounded-full  bg-transparent"
                        >
                          -
                        </Button>
                        <p>{quantity}</p>
                        <Button
                          onClick={increment}
                          variant={"secondary"}
                          className="rounded-full  bg-transparent"
                        >
                          +
                        </Button>
                      </div>
                      <p className="font-semibold text-[#EF4444]">
                        $
                        {Number(String(item.price).replace(/[^0-9]/g, "")) *
                          quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <SheetFooter className="bg-white rounded-2xl p-4">
          <Button
            className="w-full rounded-full bg-[#EF4444]"
            disabled={cart.length === 0}
          >
            Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
