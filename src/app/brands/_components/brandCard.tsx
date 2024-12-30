"use client";
import React, { useState } from "react";
import { Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface BrandCardProps {
  data?: any;
  isNew?: boolean;
}

const BrandCard = ({ data, isNew }: BrandCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleCreateBrand = () => {
    router.push("/createBrand");
  };

  return (
    <>
      {!isNew ? (
        <Card className="bg-gray-50 h-full rounded-[28px]">
          <CardContent className="p-4" >
            <div className="flex items-center justify-center w-full h-42 rounded-[26px]">
              <img
                src={data?.img}
                alt={data?.name}
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div>
              <div className="mt-2">
                <p className="text-black text-[16px] font-semibold text-center  ">
                  {data.name}
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <p className="text-[12px] text-[#9E9D9D] ">Description</p>
                  <p className="text-[12px] text-[#9E9D9D] ">
                    {data.description}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[12px] text-[#9E9D9D] ">Color</p>
                  <p className="text-[12px] text-[#9E9D9D] ">{data.color}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[12px] text-[#9E9D9D] ">Font</p>
                  <p className="text-[12px] text-[#9E9D9D] ">{data.font}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card onClick={handleCreateBrand} className="bg-primary-color rounded-[28px] h-full cursor-pointer">
            <CardContent className="p-4">
          <div className="flex justify-center items-center  border-2 border-dashed border-primary rounded-[26px] h-[244px] w-full text-center">
            <span className="flex flex-col items-center justify-center">
              <Plus className="h-6 w-6 text-primary font-bold" />
              <p className="text-primary mt-2">Create Brand</p>
            </span>
          </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default BrandCard;
