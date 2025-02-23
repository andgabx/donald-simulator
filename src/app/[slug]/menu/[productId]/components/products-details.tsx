"use client";

import Image from "next/image";
import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartContext } from "../../contexts/cart";
import CardSheet from "../../components/cart-sheet";

interface ProductsDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

const ProductsDetails = ({ product }: ProductsDetailsProps) => {
  const { toggleCart, addProduct } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);
  const handleDecreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev === 1) return 1;
      return prev - 1;
    });
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    addProduct({
      ...product,
      quantity,
    });
    toggleCart();
  };

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col items-center gap-10 overflow-hidden rounded-t-3xl p-4">
        <div className="flex-auto overflow-hidden">
          <div className="flex items-center gap-1 px-5">
            <Image
              src={product.restaurant.avatarImageUrl}
              alt={product.restaurant.name}
              width={16}
              height={16}
              className="rounded-full"
            />
            <p className="space-x-1 text-xs text-muted-foreground">
              {product.restaurant.name}
            </p>
          </div>
          <h2 className="mt-1 px-5 text-xl font-semibold">{product.name}</h2>

          <div className="mt-3 flex items-center justify-between gap-1 px-5">
            <h3 className="text-xl font-semibold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </h3>
            <div className="flex items-center gap-3 text-center">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecreaseQuantity}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <p className="w-4">{quantity}</p>
              <Button
                variant="destructive"
                size="icon"
                onClick={handleIncreaseQuantity}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="h-screen">
            <div className="mt-6 space-y-3 px-5">
              <h4 className="font-semibold">Sobre</h4>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="mt-6 space-y-3 px-5">
              <div className="flex items-center gap-1">
                <ChefHatIcon size={16} />
                <h4 className="font-semibold">Ingredientes</h4>
              </div>

              <ul className="list-disc px-5 text-sm text-muted-foreground">
                {product.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </ScrollArea>
        </div>
        <Button className="mt-6 w-full rounded-full" onClick={handleAddToCart}>
          Adicionar ao carrinho
        </Button>
      </div>

      <CardSheet />
    </>
  );
};

export default ProductsDetails;
