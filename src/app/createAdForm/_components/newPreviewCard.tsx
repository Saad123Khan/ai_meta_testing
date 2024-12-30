"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import React from "react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { truncateText } from "@/lib/helper";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/useRedux";

interface NewPreviewCardProps {
  status: string;
  carouselAttachmentsData: any;
}

const NewPreviewCard = ({
  status,
  carouselAttachmentsData,
}: NewPreviewCardProps) => {
  const TargetingChipsAi = useAppSelector(
    (state) => state.reduxStore.targetingChipsAi
  );

  const hashtags = TargetingChipsAi.map((item: any) => `#${item}`).join(" ");

  console.log("carouselAttachmentsData", carouselAttachmentsData);

  return (
    <div className="w-full max-w-md mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {carouselAttachmentsData?.length > 0 ? (
            carouselAttachmentsData?.map((file: any, key: any) => {
              return (
                <CarouselItem key={key}>
                  <Card>
                    <div className="p-2">
                      {/* Header main div */}
                      <div className="flex justify-between ">
                        <div className="flex ">
                          <div>
                            <AccountCircleOutlinedIcon />
                          </div>
                          <div className="ml-1">
                            <p className="text-[12px] text-[#3C3C3B]">
                              John Amelia
                            </p>
                            <p className="text-[10px] text-[#9E9D9D]">1 min</p>
                          </div>
                        </div>
                        <div className="cursor-pointer">
                          <MoreVertOutlinedIcon sx={{ fontSize: 14 }} />
                        </div>
                      </div>
                      {/* post status */}
                      <div>
                        <p className="text-black/80 text-[12px] text-left m-1">
                          {/* {truncateText(status , 100, true)} */}
                          {file.description} {hashtags}
                        </p>
                      </div>
                      <div className="w-full h-[300px]">
                        {file?.type === "video" ? (
                          <video
                            controls
                            src={
                              typeof file?.file === "string"
                                ? file.file
                                : file?.file instanceof File
                                ? URL.createObjectURL(file.file)
                                : ""
                            }
                            className="w-[100%] h-[100%]"
                          />
                        ) : (
                          <img
                            src={
                              typeof file?.file === "string"
                                ? file.file
                                : file?.file instanceof File
                                ? URL.createObjectURL(file.file)
                                : ""
                            }
                            alt="Network Image"
                            className="w-[100%] h-[100%]"
                          />
                        )}
                      </div>
                      <Separator orientation="horizontal" className="my-4" />

                      {/* like comment share */}
                      <div className="flex justify-around items-center">
                        <div className="flex items-center cursor-pointer text-[#9E9D9D] text-[12px]">
                          <ThumbUpOutlinedIcon />
                          <p className="ml-1">Like</p>
                        </div>
                        <div className="flex items-center cursor-pointer text-[#9E9D9D] text-[12px]">
                          <ChatBubbleOutlineOutlinedIcon />
                          <p className="ml-1">Comment</p>
                        </div>
                        <div className="flex items-center cursor-pointer text-[#9E9D9D] text-[12px]">
                          <SendOutlinedIcon />
                          <p className="ml-1">Share</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              );
            })
          ) : (
            <CarouselItem>
              <Card>
                <div className="p-2">
                  {/* Default content */}
                  <div className="flex justify-between ">
                    <div className="flex ">
                      <div>
                        <AccountCircleOutlinedIcon />
                      </div>
                      <div className="ml-1">
                        <p className="text-[12px] text-[#3C3C3B]">
                          John Amelia
                        </p>
                        <p className="text-[10px] text-[#9E9D9D]">1 min</p>
                      </div>
                    </div>
                    <div className="cursor-pointer">
                      <MoreVertOutlinedIcon sx={{ fontSize: 14 }} />
                    </div>
                  </div>
                  {/* post status */}
                  <div>
                    <p className="text-black/80 text-[12px] text-left m-1">
                      {/* {truncateText(status , 100, true)} */}
                      {status} {hashtags}
                    </p>
                  </div>
                  <div className="w-full h-[300px]">
                    <img
                      src="/assets/sampleImg.png"
                      className="w-[100%] h-[100%]"
                      alt="Default Image"
                    />
                  </div>
                  <Separator orientation="horizontal" className="my-4" />

                  {/* like comment share */}
                  <div className="flex justify-around items-center">
                    <div className="flex items-center cursor-pointer text-[#9E9D9D] text-[12px]">
                      <ThumbUpOutlinedIcon />
                      <p className="ml-1">Like</p>
                    </div>
                    <div className="flex items-center cursor-pointer text-[#9E9D9D] text-[12px]">
                      <ChatBubbleOutlineOutlinedIcon />
                      <p className="ml-1">Comment</p>
                    </div>
                    <div className="flex items-center cursor-pointer text-[#9E9D9D] text-[12px]">
                      <SendOutlinedIcon />
                      <p className="ml-1">Share</p>
                    </div>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          )}
        </CarouselContent>

        <div className="flex justify-center gap-1 mt-4">
          {carouselAttachmentsData?.file?.map((_: any, index: any) => (
            <div
              key={index}
              className="h-2 w-2 rounded-full bg-gray-300"
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default NewPreviewCard;
