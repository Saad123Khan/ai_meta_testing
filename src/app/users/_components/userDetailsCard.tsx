"use client";
import { Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UserTable from "./userTable";

const UserDetailsCard = (cardData: any) => {
  return (
    <>
      <Card
        key={cardData.cardData?.id}
        className="bg-primary-color rounded-[26px]"
      >
        <CardContent className="p-4">
          <div className="flex justify-between align-middle">
            <div className="flex">
              <Avatar
                variant="rounded"
                src={cardData?.cardData?.userImg}
                sx={{ width: 40, height: 40 }}
              />
              <div className="ml-2">
                <p className="text-[14px] text-[#0232FF] font-bold">
                  {cardData?.cardData?.name}
                </p>
                <p className="text-[14px] text-[#818181]">
                  {cardData?.cardData?.id}
                </p>
              </div>
            </div>
            <Badge
              className={`rounded-[14px] h-[26px] pl-4 pr-4 bg-[#FDD3D3] border border-[#FF1111] text-[#FF1111]  `}
            >
              {cardData?.cardData?.subscription_package?.name ?? "InActive Subscription"}
            </Badge>
          </div>

          {/* Table */}
          <div className="mt-6">
            <UserTable />
          </div>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={{ xs: 4 }}>
              <Card className="flex justify-center flex-col items-center text-center h-full py-12 bg-primary/50 border-none text-primary-color ">
                <p className="font-semibold text-[28px] ">47.31</p>
                <p className="text-[18px]">AVG Spent</p>
              </Card>
            </Grid>
            <Grid size={{ xs: 8 }}>
              <Card className="px-4 text-left h-full py-12 bg-primary/50 border-none text-primary-color ">
                <p className="text-[26px] ">Goal Conversion</p>
                <p className="text-[16px]">
                  10% of the monthly goal has been achieved
                </p>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default UserDetailsCard;
