"use client";
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import SalesmanModal from "./salesmanModal";
import SalesmanDeleteModal from "./salesmanDeleteModal";

const SalesManCard = (cardData: any, refetch: any) => {
  const [dialog, setDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Card
        key={cardData.cardData?.name}
        className="bg-primary-color rounded-[26px]"
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
                <p className="text-[14px] text-[#0232FF] font-bold">
                  {cardData.cardData?.name}
                </p>
              </div>
            </div>
            <Badge
              className={`rounded-[14px] h-[26px] pl-4 pr-4  ${cardData.cardData?.status == "Active"
                ? "bg-[#DBFEDB] border border-[#24FF00] text-[#24FF00]"
                : "bg-[#FDD3D3] border border-[#FF1111] text-[#FF1111]"
                }`}
            >
              {cardData.cardData?.status ?? "Active"}
            </Badge>
          </div>

          <div
            style={{ alignItems: "center" }}
            className="flex justify-between items-center text-sm mt-4"
          >
            <div>
              <p className="text-[12px] text-[#6A6A6A] font-semibold ">
                Target
              </p>
              <p className="text-[12px] text-[#979797] ">{cardData.cardData?.target}</p>
            </div>
            <div>
              <p className="text-[12px] text-[#6A6A6A] font-semibold ">
                Close leads
              </p>
              <p className="text-[12px] text-[#979797] ">{cardData.cardData?.close}</p>
            </div>
          </div>
          {/* progress */}
          <div className="flex items-center">
            <Progress value={(cardData.cardData?.close / cardData.cardData?.target) * 100} className="w-[100%]" />
            <p className="text-[12px] text-[#979797] font-semibold ml-2">30%</p>
          </div>
          <div className="text-right mt-3 flex justify-end gap-2">
            <p onClick={() => setDialog(true)} className=" text-[#FF1111] cursor-pointer text-[11px]  ">Edit</p>
            <p onClick={() => setOpenModal(true)} className=" text-[#FF1111] cursor-pointer text-[11px]  ">Delete</p>
          </div>
        </CardContent>
      </Card>
      <SalesmanModal type={"Edit"} refetch={refetch} open={dialog} salesmanData={cardData?.cardData} onClose={() => setDialog(false)} />
      <SalesmanDeleteModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        refetch={refetch}
        connectionId={cardData?.cardData?.id} />
    </>
  );
};

export default SalesManCard;
