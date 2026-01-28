"use client";

import { Toaster } from "sonner";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { CartProvider, useCart } from "./context/cart-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <LayoutInner>{children}</LayoutInner>
    </CartProvider>
  );
}

function LayoutInner({ children }: { children: React.ReactNode }) {
  const { getTotalItems, setIsCartOpen } = useCart();

  return (
    <>
      <Header
        totalItems={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
      />
      {children}
      <Toaster />
      <Footer />
    </>
  );
}
