"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartContext } from "../contexts/cart";
import { useContext } from "react";
import CartItem from "./cart-product-item";


const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left pb-4">Sacola</SheetTitle>
        </SheetHeader>
        {products.length > 0 ? (
          products.map((product) => (
            <CartItem key={product.id} item={product} />
          ))
        ) : (
          <p className="text-center mt-10 flex items-center justify-center gap-2 text-sm text-gray-400">
            Nenhum produto adicionado
          </p>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
