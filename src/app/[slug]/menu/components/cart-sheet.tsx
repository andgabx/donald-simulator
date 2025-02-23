"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartContext } from "../contexts/cart";
import { useContext, useState } from "react";
import CartItem from "./cart-product-item";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FinishOrderDialog from "./finish-order-dialog";

const CartSheet = () => {
  const [finishDialogIsOpen, setFinishDialogIsOpen] = useState(false);
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="pb-4 text-left">Sacola</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col py-5">
          <div className="flex-auto space-y-5">
              {products.length > 0 ? (
                products.map((product) => (
                  <CartItem key={product.id} item={product} />
              ))
            ) : (
              <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-gray-400">
                Nenhum produto adicionado
                </p>
              )}
          </div>
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex pt-2 justify-between">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-sm font-semibold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(total)}
                </p>
                <br />

              </div>
            </CardContent>
          </Card>
          <Button onClick={() => setFinishDialogIsOpen(true)} className="my-[1.5rem] w-full rounded-full">
          Finalizar pedido
        </Button>
        <FinishOrderDialog open={finishDialogIsOpen} onOpenChange={setFinishDialogIsOpen} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
