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
import { formatTextWithSpaces, hasKeys, truncateText } from "@/lib/helper";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/useRedux";

import { Badge } from "@/components/ui/badge";
interface PreviewAdCardProps {
  status: string;
  posts: any;
  callAction: string;
  headline: string;
  websiteUrl:string;
}

const PreviewAdCard = ({
  status,
  posts,
  callAction,
  headline,
  websiteUrl
}: PreviewAdCardProps) => {
  const TargetingChipsAi = useAppSelector(
    (state) => state.reduxStore.targetingChipsAi
  );

  const hashtags = TargetingChipsAi.map((item: any) => `#${item}`).join(" ");

  console.log("addsData?.primaryText", status);
  return (
    <div className="w-full max-w-md mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {posts?.files?.length > 0 ? (
            posts?.files?.map((file: any, key: any) => {
              console.log("fffabcd==", file);
              return (
                <CarouselItem key={key}>
                  <Card>
                    <div className="">
                      {/* Header main div */}
                      <div className="flex justify-between p-2">
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
                      <div className="p-2">
                        <p dangerouslySetInnerHTML={{ __html: formatTextWithSpaces(status + hashtags)}} className="text-black/80 text-[12px] text-left m-1">
                          {/* {truncateText(status , 100, true)} */}
                          {/* {hashtags} */}
                        </p>
                      </div>
                      <div className="w-full h-[300px]">
                        {file?.label === "video" ? (
                          <video
                            controls
                            src={
                              file?.type == "url"
                                ? file?.file
                                : file?.type == "base64"
                                ? `data:video/mp4;base64,${file?.file}`
                                : URL.createObjectURL(file?.file)
                            }
                            className="w-[100%] h-[100%]"
                          />
                        ) : (
                          <img
                            src={
                              file?.type == "url"
                                ? file?.file
                                : file?.type == "base64"
                                ? `data:image/png;base64,${file?.file}`
                                : URL.createObjectURL(file?.file)
                            }
                            alt="Network Image"
                            className="w-[100%] h-[100%]"
                          />
                        )}
                      </div>

                      {/* Watch more*/}
                      <div className="p-2 flex flex-col ">
                        <p className="px-2 text-left text-[11px] text-[#6a6a6a]">
                          {websiteUrl}
                        </p>
                        <div className="flex justify-between mt-2 ">
                          <p dangerouslySetInnerHTML={{ __html: formatTextWithSpaces(headline)}} className="text-[12px] w-[230px]">
                            {/* {truncateText(data.example, 100, true)} */}
                          </p>
                          <Badge className="h-[40px] cursor-pointer text-primary-color">
                            {callAction}
                          </Badge>
                        </div>
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
                <div className="">
                  {/* Default content */}
                  <div className="flex justify-between p-2">
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
                  <div className="p-2">
                    <p dangerouslySetInnerHTML={{ __html: formatTextWithSpaces(status + hashtags)}} className="text-black/80 text-[12px] text-left m-1">
                      {/* {truncateText(status , 100, true)} */}
                       </p>
                  </div>
                  <div className="w-full h-[300px]">
                    <img
                      src="/assets/sampleImg.png"
                      className="w-[100%] h-[100%]"
                      alt="Default Image"
                    />
                  </div>

                      {/* Watch more*/}
                      <div className="p-2 flex flex-col ">
                        <p className="px-2 text-left text-[11px] text-[#6a6a6a]">
                          {websiteUrl}
                        </p>
                        <div className="flex justify-between mt-2 ">
                          <p dangerouslySetInnerHTML={{ __html: formatTextWithSpaces(headline)}} className="text-[12px] w-[230px]">
                            {/* {truncateText(data.example, 100, true)} */}
                          </p>
                          <Badge className="h-[40px] cursor-pointer text-primary-color">
                            {callAction}
                          </Badge>
                        </div>
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
          {posts?.files?.map((_: any, index: any) => (
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

export default PreviewAdCard;
