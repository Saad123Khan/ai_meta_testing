"use client";
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const UserInfoCards = (cardData: any) => {
  return (
    <>
      <Card
        key={cardData.cardData?.id}
        className="bg-primary-color rounded-[28px]"
      >
        <CardContent className="p-4">
          <div className="flex justify-between align-middle">
            <div className="flex">
              <Avatar
                variant="rounded"
                src={cardData.cardData?.userImg}
                sx={{ width: 40, height: 40 }}
              />
              <div className="ml-2">
                <p className="text-[14px] text-[#818181]">
                  {cardData.cardData?.id}
                </p>
                <p className="text-[16px] text-[#0232FF] font-bold">
                  {cardData.cardData?.name}
                </p>
              </div>
            </div>
            <Badge
              className={`rounded-[14px] h-[26px] pl-4 pr-4  ${
                cardData.cardData?.active_subscription
                  ? "bg-[#DBFEDB] border border-[#24FF00] text-[#24FF00]"
                  : "bg-[#FDD3D3] border border-[#FF1111] text-[#FF1111]"
              }`}
            >
              {cardData.cardData?.active_subscription
                ? "Active Subscription"
                : "InActive Subscription"}
            </Badge>
            <Badge
              className={`rounded-[14px] h-[26px] pl-4 pr-4  ${
                cardData.cardData?.is_active == 1
                  ? "bg-[#DBFEDB] border border-[#24FF00] text-[#24FF00]"
                  : "bg-[#FDD3D3] border border-[#FF1111] text-[#FF1111]"
              }`}
            >
              {cardData.cardData?.is_active == 1 ? "Active" : "InActive"}
            </Badge>
          </div>

          <div
            style={{ alignItems: "center" }}
            className="flex justify-evenly items-center text-sm mt-4"
          >
            <p className=" text-primary  cursor-pointer ">View</p>
            <p className=" text-[#24FF00] cursor-pointer  ">Edit</p>
            <p className=" text-[#FF1111] cursor-pointer  ">Delete</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UserInfoCards;
