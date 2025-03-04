"use client";

import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface RestaurantMenuHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl" | "slug">;
}

const RestaurantMenuHeader = ({ restaurant }: RestaurantMenuHeaderProps) => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return (
    <div className="relative h-[250px] w-full">
      <Button
        variant="secondary"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <Image
        src="/coverimage.png"
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        variant="secondary"
        className="absolute right-4 top-4 z-50 rounded-full"
      >
        <Link href={`/${restaurant.slug}/orders`}>
          <ScrollTextIcon className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default RestaurantMenuHeader;
