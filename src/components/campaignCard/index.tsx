"use client"
import * as React from "react";
import { Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const CampaignCard = (campaignData: any) => {
  const router = useRouter();
  return (
    <Card className=" bg-primary-color/85 text-white rounded-[16px]">
      <CardContent className="p-3">
        <div className="relative mb-4">
          <div
            className="bg-gray-800 p-6 rounded-[26px] flex justify-center items-center"
            style={{
              backgroundImage: `url(${campaignData?.campaignData?.img})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "120px",
            }}
          >
            {/* <img src="/assets/googlecampaign.png" /> */}
          </div>
          <RadioGroup
            className="absolute top-3 right-3"
            defaultValue="unselected"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="selected"
                id="selected"
                className="text-white"
              />
            </div>
          </RadioGroup>
        </div>
        <h2 className="text-xl text-black font-semibold mb-2">
          {campaignData?.campaignData?.title}
        </h2>
        <div className=" text-sm">
          <div className="flex justify-between items-center">
            <p className="text-black font-semibold text-[12px] ">URL:</p>
            <p className="text-[#6A6A6A] text-[12px]">
              {campaignData?.campaignData?.url}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-black font-semibold text-[12px] ">
              Campaign name:
            </p>
            <p className="text-[#6A6A6A] text-[12px]">
              {campaignData?.campaignData?.campaignName}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-black font-semibold text-[12px] ">Add:</p>
            <p className="text-[#6A6A6A] text-[12px]">
              {campaignData?.campaignData?.ads}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Badge
          onClick={() => router.push("/adResults")}
          className="bg-[#C0CCFF] cursor-pointer px-4 rounded-[16px] text-[12px] border border-[#738DFE] hover:text-[#fff]  text-[#002EF6]"
        >
          View Details
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default CampaignCard;
