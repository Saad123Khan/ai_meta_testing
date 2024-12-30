"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface pricingCarouselProps {
  data: any[]; // Ensure it's an array, or default to an empty array
  setChoosePlan: (choosePlan: boolean) => void;
  setPlanData: (data: any) => void;
}

const PricingCarousel = ({
  data = [], // Default to an empty array in case packages is undefined
  setChoosePlan,
  setPlanData,
}: pricingCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Guard against undefined or empty packages
  const isPackagesLoaded = Array.isArray(data) && data.length > 0;

  

  const handleChoosePlan = (data: any) => {
    setPlanData(data);
    setChoosePlan(true);
  };

  const nextSlide = () => {
    if (isPackagesLoaded) {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= data.length ? prevIndex : prevIndex + 1
      );
    }
  };

  const prevSlide = () => {
    if (isPackagesLoaded) {
      setCurrentIndex((prevIndex) =>
        prevIndex - 1 < 0 ? prevIndex : prevIndex - 1
      );
    }
  };

  return (
    <div className="w-full p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">Packages</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex + 3 >= data.length}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {data?.map((pkg: any, index: any) => (
            <div key={index} className="w-full md:w-1/3 flex-shrink-0 px-2">
              <Card className="w-full bg-transparent border border-[#9E9D9D] ">
                <CardContent className="p-6">
                  <h3 className="text-3xl font-bold mb-4 text-[#231D4F]">
                    ${pkg?.price}
                    <span className="text-[14px] ml-2">/month</span>
                  </h3>
                  <p className="text-[20px] text-secondary-foreground font-semibold ">
                    {pkg?.period}
                  </p>
                  <p className="mb-2 text-[12px] text-[#959BA5]">
                    {pkg?.details}
                  </p>
                  <ul className="space-y-2">
                    {/* Assuming pkg.features exists, map through it if it's available */}
                    {pkg?.features?.map((feature: any, idx: any) => (
                      <li key={idx} className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleChoosePlan(pkg)}
                    className="w-full bg-primary text-primary-color rounded-2xl"
                  >
                    Choose this plan
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingCarousel;
