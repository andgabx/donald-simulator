"use client";

import { ScrollTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";

interface HeaderProductsProps {
    product: Pick<Product, "name" | "imageUrl">;
}

const HeaderProducts = ({ product }: HeaderProductsProps) => {
    const router = useRouter();
    const handleBackClick = () => {
        router.back();
    };
    return (
        <div className="relative w-full h-[300px]">
        <Button
        variant="secondary"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        className="absolute right-4 top-4 z-50 rounded-full"
      >
        <ScrollTextIcon className="h-4 w-4" />
            </Button>
            <Image src={product.imageUrl} alt={product.name} fill className="object-contain" />
        </div>
    );
}

export default HeaderProducts;