"use client"
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const CustomAdvertisementCard = ({cardData}: any) => {
  const { platform_icon, platform_name, name, email, connection_id } = cardData;
  console.log(cardData,"cardDatacardData")
  return (
    <>
      <Card key={cardData.cardData?.name} className="bg-primary-color/80 p-2 rounded-[26px]">
        <CardContent className="p-4">
          <div className="flex justify-between align-middle">
            <div className="flex">
              <Avatar
                variant="rounded"
                src={platform_icon} alt={`${platform_name} icon`}
                sx={{ width: 40, height: 40 }}
              />
              <div className="ml-2">
                <p className="text-[14px] text-[#6A6A6A] font-bold">
                  Media Spend
                </p>
                <p className="text-[12px] text-[#818181]">
                  {platform_name}
                </p>
              </div>
            </div>

            <Button className="rounded-[18px] px-4 py-1 bg-primary text-primary-color">
              {name ? name: "N/A"}
            </Button>
          </div>

          <div
            style={{ alignItems: "center" }}
            className="flex justify-between items-center text-sm mt-4"
          >
            <div>
              <p className="text-xs text-[#818181]">
                USD ${5}
              </p>
            </div>
            <Progress value={(100 / 200) * 100} className="ml-2 mr-2 w-[60%]" />
            <div>
              <p className="text-xs text-[#818181]">
                USD ${5}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CustomAdvertisementCard;
