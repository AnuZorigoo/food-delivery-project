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
import { MapPin, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export const Header = () => {
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
                {/* Example: City */}
                <div className="grid gap-3">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" placeholder="Enter your city" />
                </div>

                {/* Example: Street / Address */}
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
        <Button className="rounded-full" variant="outline">
          <ShoppingCart />
        </Button>
        <Button
          variant="secondary"
          className="rounded-full bg-[#EF4444] text-white"
        >
          <User />
        </Button>
      </div>
    </div>
  );
};
