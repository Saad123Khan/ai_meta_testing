import * as React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const AdCard = ({ adData }: { adData: any }) => {
  const router = useRouter();

  const handleViewDetail = () => {
    if (adData?.id) {
      router.push(`/adResults?id=${adData.id}`);
    } else {
      console.error("Ad ID is not available.");
    }
  };
  
  // Function to get the correct thumbnail URL based on ad type
  const getThumbnailUrl = () => {
    // Carousel ads
    if (adData?.creative?.object_story_spec?.link_data?.child_attachments) {
      return (
        adData.creative.object_story_spec.link_data.child_attachments[0]
          ?.image_url || "/assets/placeholder.png"
      );
    }

    // Video ads
    if (adData?.creative?.object_story_spec?.video_data) {
      return (
        adData.creative.object_story_spec.video_data.image_url ||
        "/assets/video-placeholder.png"
      );
    }

    // Image ads
    if (adData?.creative?.image_url) {
      return adData.creative.image_url;
    }

    // Default fallback image
    return "/assets/placeholder.png";
  };

  // Function to determine the type of ad
  const getAdType = () => {
    if (adData?.creative?.object_story_spec?.link_data?.child_attachments) {
      return "Carousel";
    }
    if (adData?.creative?.object_story_spec?.video_data) {
      return "Video";
    }
    if (adData?.creative?.image_url) {
      return "Image";
    }
    return "Unknown";
  };

  // Extracting other details from adData
  const campaignName = adData?.campaign?.name || "Unnamed Campaign";
  const adTitle = adData?.name || "Untitled Ad";
  const adUrl = adData?.preview_shareable_link || "N/A";

  return (
    <Card className="bg-primary-color/85 text-white rounded-[16px]">
      <CardContent className="p-3">
        <div className="relative mb-4">
          {/* Display Thumbnail */}
          <div
            className="bg-gray-800 p-6 rounded-[26px] flex justify-center items-center"
            style={{
              backgroundImage: `url(${getThumbnailUrl()})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "120px",
            }}
          />
          <RadioGroup
            className="absolute top-3 right-3"
            defaultValue="unselected"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="selected"
                id="selected"
                className="text-white"
              />
            </div>
          </RadioGroup>
        </div>
        <h2 className="text-xl text-black font-semibold mb-2">{adTitle}</h2>
        <div className="text-sm">
          <div className="flex justify-between items-center">
            <p className="text-black font-semibold text-[12px]">URL:</p>
            <p className="text-[#6A6A6A] text-[12px]">{adUrl}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-black font-semibold text-[12px]">
              Campaign Name:
            </p>
            <p className="text-[#6A6A6A] text-[12px]">{campaignName}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-black font-semibold text-[12px]">Ad Type:</p>
            <p className="text-[#6A6A6A] text-[12px]">{getAdType()}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Badge onClick={handleViewDetail} className="bg-[#C0CCFF] cursor-pointer px-4 rounded-[16px] text-[12px] border border-[#738DFE] hover:bg-blue-700 hover:text-primary-color text-[#002EF6]">
          View Details
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default AdCard;
