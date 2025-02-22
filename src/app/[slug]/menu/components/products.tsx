import { Product } from "@prisma/client";   
import Image from "next/image";
import Link from "next/link";

interface ProductsProps {
    products: Product[];
}

const Products = ({ products }: ProductsProps) => {
    return ( 
        <div className="space-y-3 px-4">
            {products.map((product) => (
                <div key={product.id}>
                    <Link key={product.id} className="flex items-center justify-between gap-10 py-3" href={`/menu/${product.id}`}>
                        <div>
                            <h3 className="text-sm font-medium">
                                {product.name}
                            </h3>
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                                {product.description}
                            </p>
                            <p className="font-semibold text-sm pt-3">{Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                                minimumFractionDigits: 2,
                            }).format(product.price)}</p>
                        </div>
                            <div className="relative min-h-[82px] min-w-[120px]">
                                <Image src={product.imageUrl} alt={product.name} fill className="object-contain rounded-lg" />
                            </div>
                    </Link>
                </div>
            ))}
        </div>
     );
}
 
export default Products;