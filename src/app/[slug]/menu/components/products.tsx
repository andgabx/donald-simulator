import { ConsumptionMethod, Product } from "@prisma/client";   
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

interface ProductsProps {
    products: Product[];
}

const Products = ({ products }: ProductsProps) => {
    const {slug} = useParams<{slug: string}>();
    const searchParams = useSearchParams();
    const consumptionMethod = searchParams.get("consumptionMethod") as ConsumptionMethod;

    return ( 
        
        <div className="space-y-3 px-4">
            {products.map((product) => (
                    <Link key={product.id} className="flex items-center justify-between gap-10 py-3" href={`/${slug}/menu/${product.id}?consumptionMethod=${consumptionMethod}`}>
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
            ))}
        </div>
     );
}
 
export default Products;