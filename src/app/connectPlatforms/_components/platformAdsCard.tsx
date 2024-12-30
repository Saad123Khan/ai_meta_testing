import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageInfoModal from "./pageInfoModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Brand } from "@/types/brand";
import apis from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { swalPopUp } from "@/lib/helper";

const PlatformAdsCard = ({
  cardData,
  onDisconnect,
  onConnect,
  pageInfo,
  selectedBrand,
}: {
  cardData: any;
  onDisconnect: () => void;
  onConnect: () => void;
  pageInfo: any;
  selectedBrand: any;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const { platform_icon, platform_name, name, email, connection_id } = cardData;
  const [selectedPage, setSelectedPage] = useState(
    pageInfo?.length > 0 ? pageInfo[0] : null
  );

  // Mutation for handling update brands
  const { mutate: updatedBrands, isPending: loadingBrands } = useMutation({
    mutationFn: (pageId: number) =>
      apis.updateBrand(selectedBrand?.id, { page_id: pageId }),
    onSuccess: ({
      data,
    }: {
      data: {
        data: any;
        status: boolean;
        message: string;
      };
    }) => {
      console.log("updaetd brand data", data);
      swalPopUp("Success", "Brand updated", "success");
    },
    onError: () => {
      swalPopUp("Error", "Failed to update brand", "error");
    },
  });

  const handleSelectPage = (page: any) => {
    setSelectedPage(page);
    updatedBrands(page.id);
    console.log("Selected page ID:", page.id);
  };
  console.log("platform", cardData);
  return (
    <>
      <PageInfoModal open={openModal} onClose={() => setOpenModal(false)} />
      <Card className="bg-[#ffff] border-none rounded-[26px]">
        <CardContent className="p-4">
          <div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <img src={platform_icon} alt={`${platform_name} icon`} />
                <p className="ml-1 text-[#6A6A6A] text-lg font-semi-bold">
                  {platform_name}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge
                  className={`rounded-[12px] cursor-pointer  min-w-15 h-6 text-[12px] ${
                    connection_id
                      ? "bg-[#D3F7CA] hover:bg-[#D3F7CA] text-[#0A681F] border border-[#26E716]"
                      : "bg-[#FDD3D3] hover:bg-[#FDD3D3] text-[#FF0A0A] border border-[#E71616]"
                  }`}
                >
                  {connection_id ? "Connected" : "Not Connected"}
                </Badge>
                {cardData.platform_key == "facebook" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button disabled={loadingBrands} variant="outline">
                        {loadingBrands ? "Loading..." : selectedPage?.name || "Brand Info"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Select Page</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {pageInfo?.map((page: any) => (
                        <DropdownMenuItem
                          key={page.id}
                          onSelect={() => handleSelectPage(page)}
                        >
                          {page?.name || "N/A"}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                {/* <Badge onClick={()=>setOpenModal(true)} className="rounded-[12px] cursor-pointer hover:bg-[#E0E7FF] min-w-15 h-6 text-[12px] bg-[#E0E7FF] text-[#3730A3] border border-[#6366F1]">
                  Brand Info
                </Badge> */}
              </div>
            </div>

            <div className="mt-2">
              <p className="text-[#6A6A6A] font-semibold text-[12px]">
                Username
              </p>
              <p className="text-[#979797] text-[12px]">{name || "N/A"}</p>
              <p className="text-[#6A6A6A] font-semibold text-[12px]">Email</p>
              <p className="text-[#979797] text-[12px]">{email || "N/A"}</p>
            </div>

            <div className="mt-2 flex justify-between items-center">
              {connection_id ? (
                <Button
                  onClick={onDisconnect}
                  className="bg-primary text-primary-color rounded-2xl"
                >
                  Disconnect
                </Button>
              ) : (
                <Button
                  onClick={onConnect}
                  className="bg-secondary text-primary-color rounded-2xl"
                >
                  Connect
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PlatformAdsCard;
