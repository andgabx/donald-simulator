import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantMenuHeader from "./components/header";
import RestaurantCategories from "./components/categories";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    consumptionMethod?: string;
  }>;
};

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

export default async function RestaurantsMenuPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  if (consumptionMethod && !isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug,
    },
    include: {
      menuCategories: {
        include: {
          products: true,
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantMenuHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
}
