import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { useRouter } from "next/navigation";
import { CircleAlert } from "lucide-react";
import { useAppDispatch } from "@/hooks/useRedux";
import { setPlatformName } from "@/store/slices/storeSlice";
import { swalPopUp } from "@/lib/helper";

const AdvertisementCard = ({adsInfo}:any) => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  console.log(adsInfo,"cardDatacardDatacardData")
  const { platform_icon, platform_name, name, email, connection_id } = adsInfo;
  
  const handleOpenCard = () => {
    if(name &&  email)
    {
      router.push("/createAdForm");
      dispatch(setPlatformName(adsInfo))
    
    }else{
        swalPopUp("Error", `Please connect your ${platform_name} account first`, "error");
    }
  };



  return (
    <>
      <Card className="relative overflow-hidden group cursor-pointer "  onClick={handleOpenCard}>
        <div className="bg-gradient-to-b from-white to-gray-200 aspect-[1.91/1] flex flex-col items-center justify-center p-6">
          <div className="size-12 flex items-center justify-center">
            <Image
              src={platform_icon} alt={`${platform_name} icon`}
              width={200}
              height={200}
              objectFit="contain"
            />
          </div>
          <div className="absolute bottom-2 flex items-center left-2 text-sm font-medium text-gray-600">
            <p className="text-sm font-semibold mr-2">{platform_name}</p>
            <CircleAlert size={16} />
          </div>
        </div>
      </Card>
    </>
    //   <Card className="overflow-hidden  bg-gray-200 " onClick={handleOpenCard}>
    //   <CardContent className="p-0">
    //     <div className="relative h-[130px] flex items-center justify-center">
    //       <Image
    //         src={adsInfo.img}
    //         alt="Card image"
    //         width={100}
    //         height={100}
    //         objectFit="contain"
    //       />
    //     </div>
    //   </CardContent>
    //   <CardFooter className="bg-transparent items-center h-[50px] p-2">
    //     <h2 className="text-sm font-semibold mr-2">{adsInfo.title}</h2>
    //     <CircleAlert />
    //   </CardFooter>
    // </Card>
  );
};

export default AdvertisementCard;
