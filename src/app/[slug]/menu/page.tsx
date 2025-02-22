import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantMenuHeader from "./components/header";
import RestaurantCategories from "./components/categories";
interface RestaurantsMenuPageProps {
  params: {
    slug: string;
  };
  searchParams: { consumptionMethod: string };
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantsMenuPage = async ({
  params,
  searchParams,
}: RestaurantsMenuPageProps) => {
  const { slug } = params;
  const { consumptionMethod } = searchParams;
  if (!isConsumptionMethodValid(consumptionMethod)) {
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
};

export default RestaurantsMenuPage;
