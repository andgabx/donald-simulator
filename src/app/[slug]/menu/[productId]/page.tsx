import { notFound } from "next/navigation";
import { db } from "@/lib/prisma";
import HeaderProducts from "./components/header-products";

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
    });
    if (!product) {
        return notFound();
    }

    return ( 
            <div>
                <HeaderProducts product={product} />
                <p>{slug}</p>
                <p>{productId}</p>

            </div>
     );
}
 
export default ProductPage;