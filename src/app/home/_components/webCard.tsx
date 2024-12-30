"use client";
import { Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowDownNarrowWide } from "lucide-react";

const WebCard = (cardData: any) => {
  return (
    <>
      <Card
        key={cardData.cardData?.name}
        className="bg-primary-color/80 rounded-[26px]"
      >
        <CardContent className="p-4">
          {/* <div className="flex justify-between align-middle"> */}
          <div className="flex">
            <Avatar
              variant="rounded"
              src={cardData.cardData.icon}
              sx={{ width: 30, height: 30, background:'#dbdbdb' }}
            />
            <div className="ml-2">
              <p className="text-[14px] text-[#6A6A6A] font-bold">
                {cardData.cardData.label}
              </p>
              <p className="text-[12px] text-[#818181]">
                {cardData.cardData.name}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <p className="text-[18px] text-[#818181] ">{cardData.cardData.spend}</p>
                <div className="flex items-center ">
                  <ArrowDownNarrowWide size={16} className="text-[#B63131]" />
                  <p className="text-[#FF0A0A] text-[9px] ">50</p>
                </div>
              </div>
              <div>
                <p className="text-[#818181] text-[12px]">25 aug to sep</p>
              </div>
            </div>
            <div>
              <p className="text-[#818181] text-[16px]">{cardData.cardData.total}</p>
              <p className="text-[#818181] text-[12px]">This Month</p>
            </div>
          </div>

          {/* <div
            style={{ alignItems: "center" }}
            className="flex justify-between align-middle text-sm mt-2"
          >
            <div>
              <p className="text-xs text-[#818181]">
                USD ${5}
              </p>
            </div>
            <Progress value={(cardData.cardData.spend / cardData.cardData.total) * 100} className="ml-2 mr-2 w-[70%]" />
            <div>
              <p className="text-xs text-[#818181]">
                USD ${5}
              </p>
            </div>
          </div> */}
        </CardContent>
      </Card>
    </>
  );
};

export default WebCard;
