"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { LayoutDashboard, Truck } from "lucide-react";

const items = [
  {
    title: "Food menu",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: Truck,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="none" className="h-full bg-white border-r">
      <SidebarHeader>
        <Link href="/">
          <div className="flex gap-4 justify-center items-center py-5">
            <img src="/Logo.png" className="w-10 h-10" />
            <div>
              <p className="text-[18px] font-semibold">NomNom</p>
              <p className="text-[12px] text-[#71717A]">Swift delivery</p>
            </div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-2 rounded-lg p-2 transition
                          ${
                            active
                              ? "bg-black text-white"
                              : "hover:bg-gray-100 text-gray-800"
                          }`}
                      >
                        <item.icon
                          className={`w-5 h-5 ${
                            active ? "text-white" : "text-gray-700"
                          }`}
                        />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 text-sm text-gray-500"></SidebarFooter>
    </Sidebar>
  );
}
