"use client";

import Image from "next/image";
import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductsDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true,
                };
            };
        };
    }>;
}

const ProductsDetails = ({ product }: ProductsDetailsProps) => {
    const [quantity, setQuantity] = useState<number>(1);
    const handleDecreaseQuantity = () => {
        setQuantity((prev) => {
            if(prev === 1) return 1;
            return prev - 1;
        });
    }

    const handleIncreaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    }
    return ( 
        <div className="relative z-50 items-center rounded-t-3xl p-4 mt-[-1.5rem] flex flex-auto flex-col gap-10">
           <div className="flex-auto">

           <div className="flex items-center gap-1 px-5">
                <Image src={product.restaurant.avatarImageUrl} alt={product.restaurant.name} width={16} height={16} className="rounded-full" />
                <p className="text-xs text-muted-foreground space-x-1">{product.restaurant.name}</p>
            </div>
        <h2 className="mt-1 text-xl font-semibold px-5">
            {product.name}
        </h2>
       
        
            <div className="flex justify-between items-center gap-1 mt-3 px-5">
                <h3 className="text-xl font-semibold">
                    {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    }).format(product.price)}
                </h3>
                <div className="flex items-center gap-3 text-center">
                    <Button variant="outline" size="icon" onClick={handleDecreaseQuantity}>
                        <ChevronLeftIcon className="w-4 h-4" />
                    </Button>
                    <p className="w-4">{quantity}</p>
                    <Button variant="destructive" size="icon" onClick={handleIncreaseQuantity}>
                        <ChevronRightIcon className="w-4 h-4" />
                    </Button>
                </div>
            </div>

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
                <p className="text-sm text-muted-foreground">
                        {product.ingredients.join(", ")}
                    </p>
            </div>
           </div>
        <Button className="w-full rounded-full mt-6">Adicionar ao carrinho</Button>
        </div>
     );
}
 
export default ProductsDetails;