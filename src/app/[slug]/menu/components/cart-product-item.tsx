import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { CartProduct, CartContext } from "../contexts/cart";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useContext } from "react";

interface CartProductItemProps {
  item: CartProduct;
}

const CartProductItem = ({ item }: CartProductItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
    useContext(CartContext);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-xl bg-gray-200">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium truncate max-w-[90%] text-ellipsis">
            {item.name}
          </p>
          <p className="text-sm font-semibold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(item.price)}
          </p>
          <div className="flex items-center gap-1 text-center">
            <Button
              variant="outline"
              className="h-7 w-7 rounded-lg"
              onClick={() => decreaseProductQuantity(item.id)}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-8 text-xs">{item.quantity}</p>
            <Button
              variant="destructive"
              className="h-7 w-7 rounded-lg"
              onClick={() => increaseProductQuantity(item.id)}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="h-7 w-7 rounded-lg"
        onClick={() => removeProduct(item.id)}
      >
        <TrashIcon />
      </Button>
    </div>
  );
};
export default CartProductItem;
