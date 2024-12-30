import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatTextWithSpaces, truncateText } from "@/lib/helper";

const AdCombinationCard = ({ data, callAction }: any) => {
  console.log('datamedia', data)
  return (
    <div>
      <Card>
        <div className="">
          {/* Header main div */}
          <div className="flex justify-between p-2 ">
            <div className="flex ">
              <div>
                <AccountCircleOutlinedIcon />
              </div>
              <div className="ml-1 flex items-center">
                <p className="text-[10px] mr-2 text-[#9E9D9D]">Sponsor -</p>
                <Globe size={15} className="text-[#9E9D9D]" />
              </div>
            </div>
            <div className="cursor-pointer">
              <MoreVertOutlinedIcon sx={{ fontSize: 14 }} />
            </div>
          </div>
          {/* post status */}
          <div className=" px-2">
            <p dangerouslySetInnerHTML={{ __html: formatTextWithSpaces(data.status) }} className="text-black/80 text-[12px] text-left m-1 line-clamp-custom">
            </p>
          </div>
          <div className="w-full h-[200px]">
            {/* <img src={data.media} className="w-[100%] h-[100%] " /> */}
            {data.media?.label === "video" ? (
              <video
                controls
                src={
                  data.media?.type == "url"
                    ? data.media?.file
                    : data.media?.type == "base64"
                    ? `data:video/mp4;base64,${data.media?.file}`
                    : URL.createObjectURL(data.media?.file)
                }
                className="w-[100%] h-[200px]"
              />
            ) : (
              <img
                src={
                  data.media?.type == "url"
                    ? data.media?.file
                    : data.media?.type == "base64"
                    ? `data:image/png;base64,${data.media?.file}`
                    : URL.createObjectURL(data.media?.file)
                }
                alt="Network Image"
                className="w-[100%] h-[200px]"
              />
            )}
          </div>

          {/* Watch more*/}
          <div className="p-2">
            <p className="text-[11px] text-[#6a6a6a] ">EXAMPLE.COM</p>
            <div className="flex justify-between mt-2 ">
              <p className="text-[12px] w-[190px]" dangerouslySetInnerHTML={{ __html: formatTextWithSpaces(data.example) }}>
                {/* {truncateText(data.example, 100, true)} */} 
              </p>
              <Badge className="h-[40px] cursor-pointer text-primary-color">
                {callAction || "Shop now"}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdCombinationCard;
