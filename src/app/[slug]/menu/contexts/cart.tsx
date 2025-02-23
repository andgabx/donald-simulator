"use client";

import { Product } from "@prisma/client";
import { createContext, useState } from "react";

interface CartProduct extends Product {
  quantity: number;
}

export interface ICardContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
}

export const CartContext = createContext<ICardContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products] = useState<CartProduct[]>([]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CartContext.Provider
      value={{ isOpen, products, toggleCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
