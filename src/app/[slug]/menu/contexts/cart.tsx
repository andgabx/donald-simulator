"use client";

import { Product } from "@prisma/client";
import { createContext, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICardContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  total: number;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
}

export const CartContext = createContext<ICardContext>({
  isOpen: false,
  products: [],
  total: 0,
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  const total = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const addProduct = (product: CartProduct) => {
    const productIsAlreadyInCart = products.some(
      (prevProduct) => prevProduct.id === product.id,
    );

    if (!productIsAlreadyInCart) {
      return setProducts((prev) => [...prev, product]);
    }

    setProducts((prevProducts) =>
      prevProducts.map((prevProduct) =>
        prevProduct.id === product.id
          ? {
              ...prevProduct,
              quantity: prevProduct.quantity + product.quantity,
            }
          : prevProduct,
      ),
    );
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        if (prevProduct.quantity === 1) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity - 1 };
      });
    });
  };
  const increaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity + 1 };
      });
    });
  };

  const removeProduct = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.filter((prevProduct) => prevProduct.id !== productId);
    });
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        total,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
