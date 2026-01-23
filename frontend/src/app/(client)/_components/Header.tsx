"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, MapPin, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { email } from "zod/v4/mini";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

interface HeaderProps {
  totalItems: number;
  onCartClick: () => void;
}

export const Header = ({ totalItems, onCartClick }: HeaderProps) => {
  const { user } = useAuth();
  return (
    <div className="bg-black flex pr-44 pl-44 pt-3 pb-3 justify-between">
      <Link href="/">
        <img src="/Logo Container.png" className="w-36.5 h-11" />
      </Link>
      <div className="flex gap-3 items-center">
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-full text-[12px]">
                <p className="flex gap-1 text-[#EF4444]">
                  {" "}
                  <MapPin /> Delivery Address:{" "}
                </p>
                Add Location
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
              <DialogHeader>
                <DialogTitle>Add Your Location</DialogTitle>
                <DialogDescription>
                  Enter your location below. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" placeholder="Enter your city" />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="street">Street / Address</Label>
                  <Input
                    id="street"
                    name="street"
                    placeholder="Enter your street"
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save Location</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>

        <Button
          size="icon"
          className="w-9 h-9 bg-red-500 rounded-full hover:bg-red-600 relative transition-all shadow-md"
          onClick={onCartClick}
        >
          <ShoppingCart className="h-4 w-4 text-white" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-red-500 text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
              {totalItems}
            </span>
          )}
        </Button>
        {user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="secondary"
                className="rounded-full bg-[#EF4444] text-white"
              >
                <User />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <div className="flex flex-col items-center gap-2 ">
                <p>email</p>
                <Button className="rounded-xl" variant={"secondary"}>
                  Sign out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Button>Login</Button>
        )}
      </div>
    </div>
  );
};
