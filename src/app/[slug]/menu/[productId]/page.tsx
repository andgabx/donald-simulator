import { notFound } from "next/navigation";
import { db } from "@/lib/prisma";
import HeaderProducts from "./components/header-products";
import ProductsDetails from "./components/products-details";
interface ProductPageProps {
    params: Promise<{
        slug: string;
        productId: string;
    }>
}

const ProductPage = async ({ params }: ProductPageProps) => {
    const { slug, productId } = await params;
    const product = await db.product.findUnique({
        where: {
            id: productId,
        }, 
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true,
                    slug: true,
                },
            },
        },
    });
    
    if (!product) {
        return notFound();
    }

    if (product.restaurant.slug !== slug) {
        return notFound();
    }

    return ( 
            <div className="flex h-full flex-col gap-10">
                <HeaderProducts product={product} />
                <ProductsDetails product={product} />

            </div>
     );
}
 
export default ProductPage;