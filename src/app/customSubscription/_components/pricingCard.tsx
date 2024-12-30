"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

function PricingCard({ data,index }:any) {
  return (
    <div>
      <div key={index} className="w-full ">
        <Card className="w-full bg-primary-color border-none hover:bg-[#231D4F] hover:text-primary-color ">
          <CardContent className="p-6">
          <p className="text-[20px] text-secondary-foreground font-semibold hover:text-primary-color ">
              {data.name}
            </p>
            <h3 className="text-3xl font-bold mb-4 text-[#231D4F] hover:text-primary-color ">
              ${data.price}
              <span className="text-[14px]  ml-2">/{data?.period}</span>
            </h3>
            <p className="text-[20px] text-secondary-foreground font-semibold hover:text-primary-color ">
              {data.period}
            </p>
            <p className=" mb-2 text-[12px] text-[#959BA5] ">{data.details}</p>
            {/* <ul className="space-y-2">
              {data.features.map((feature: any, idx: any) => (
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
            </ul> */}
          </CardContent>
          <CardFooter>
            <Button
              //   onClick={() => handleChoosePlan(data)}
              className="w-full bg-primary text-primary-color rounded-2xl"
            >
              Choose this plan
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default PricingCard;
