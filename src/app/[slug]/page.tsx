import { getRestaurantsBySlug } from "@/data/get-restaurants-by-slug";
import Image from "next/image";
import ConsumptionMethodOption from "./components/consuption-method-option";

interface RestaurantsPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantsPage = async ({ params }: RestaurantsPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantsBySlug(slug);

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-2">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={String(restaurant?.avatarImageUrl)}
          alt={String(restaurant?.name)}
          width={82}
          height={82}
        />
        <h2 className="font-semibold">{restaurant?.name}</h2>
      </div>
      <div className="space-y-2 py-24 text-center">
        <h3 className="text-2xl font-semibold"> Seja bem vindo! </h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estaremos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionMethodOption
          imageUrl="/dine_in.png"
          imageAlt="Dine In"
          buttonText="Para comer aqui"
          option="DINE_IN"
          slug={slug}
        />
        <ConsumptionMethodOption
          imageUrl="/takeaway.png"
          imageAlt="Take Away"
          buttonText="Para levar"
          option="TAKEAWAY"
          slug={slug}
        />
      </div>
    </div>
  );
};

export default RestaurantsPage;
