"use client";

import { useState } from "react";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Header open={open} setOpen={setOpen} cart={cart} setCart={setCart} />

      {children}

      <Footer />
    </div>
  );
}
