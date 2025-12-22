"use client";

import { Facebook, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <div className="flex bg-black h-[500px] pt-10 justify-center items-center flex-col gap-10">
      <div className="flex bg-[#EF4444]  t-[60px] h-20 w-full z-10 gap-[34px] items-center justify-center">
        <p className="text-white text-[30px] font-semibold">
          Fresh fast delivered{" "}
        </p>
        <p className="text-white text-[30px] font-semibold">
          Fresh fast delivered{" "}
        </p>
        <p className="text-white text-[30px] font-semibold">
          Fresh fast delivered{" "}
        </p>
        <p className="text-white text-[30px] font-semibold">
          Fresh fast delivered{" "}
        </p>
      </div>
      <div className="flex t-50 gap-55">
        <img src={"/Logo Container copy.png"} className="w-22 h-[94px]"></img>
        <div className="flex gap-28">
          <div className="flex flex-col text-white gap-4">
            <p className="text-[#71717A] text-[16px]">NOMNOM</p>
            <p>Home </p>
            <p>Contact us</p>
            <p>Delivery zone</p>
          </div>
          <div className="flex flex-col text-white gap-4">
            <p className="text-[#71717A] text-[16px]">MENU</p>
            <p>Appetizers</p>
            <p>Salads</p>
            <p>Pizzas</p>
            <p>Main dishes</p>
            <p>Desserts</p>
          </div>
          <div className="flex flex-col text-white gap-4">
            <p className="text-black text-[16px]">.</p>
            <p>Side dish </p>
            <p>Brunch</p>
            <p>Desserts</p>
            <p>Beverages</p>
            <p>Fish & Sea foods</p>
          </div>
          <div className="flex flex-col text-white gap-4">
            <p className="text-[#71717A] text-[16px]">FOLLOW US</p>
            <div className="flex gap-4">
              <Facebook />
              <Instagram />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white h-[1px] w-full px-10"></div>
      <div className="flex gap-12 text-[#71717A] text-[14px]">
        <p>Copy right 2024 © Nomnom LLC</p>
        <p>Privacy policy </p>
        <p>Terms and condition</p>
        <p>Cookie policy</p>
      </div>
    </div>
  );
};
