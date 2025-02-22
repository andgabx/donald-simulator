import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ConsumptionMethod } from "@prisma/client";
interface ConsumptionMethodOptionProps {
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: ConsumptionMethod;
  slug: string;
}

const ConsumptionMethodOption = ({
  imageUrl,
  imageAlt,
  buttonText,
  option,   
  slug,
}: ConsumptionMethodOptionProps) => {
  return (
    <>
      <Card>
        <CardContent className="flex flex-col items-center gap-8 py-8">
          <div className="relative h-[80px] w-[80px] text-center">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={78}
              height={80}
              className="object-contain"
            />
          </div>
          <Button variant="secondary" className="rounded-full" asChild>
            <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
              {buttonText}
            </Link>
          </Button>
        </CardContent>
      </Card>
      
    </>
  );
};

export default ConsumptionMethodOption;
