"use client";

import CustomChart from "@/components/customChart";
import CustomSelectField from "@/components/customSelectField";
import CustomStepper from "@/components/customStepper";
import CustomTable from "@/components/customTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Pencil,
  Goal,
  Book,
  TrendingUp,
  Wallet,
  MousePointer,
  FolderGit2,
  Orbit,
  FolderPen,
  CalendarFold,
  Play,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import {
  assetColumns,
  campaignColumns,
  targetColumns,
} from "./columns/columns";
import { useAppSelector } from "@/hooks/useRedux";
import { useAdDetails, useCurrency } from "@/hooks/facebook/useAllAds";
import { useSearchParams } from "next/navigation";
import StartupLoader from "@/components/startupLoader";
import EditTargetModal from "./_components/editTargetModal";
import Head from "next/head";

const campaignRowData = [
  {
    id: "1",
    assets: "Facebook ad",
    adGroupName: "Search Ad Group",
    type: "Headline",
    impressions: 2,
    status: "Enabled",
  },
  {
    id: "2",
    assets: "Facebook ad",
    adGroupName: "Search Ad Group",
    type: "Headline",
    impressions: 0,
    status: "Enabled",
  },
  {
    id: "3",
    assets: "Facebook ad",
    adGroupName: "Search Ad Group",
    type: "Headline",
    impressions: 5,
    status: "Enabled",
  },
];

const assetRowData = [
  {
    assets: "Facebook ad",
    adGroupName: "Search Ad Group",
    type: "Headline",
    impressions: 1,
    status: "Enabled",
  },
  {
    assets: "Facebook ad",
    adGroupName: "Search Ad Group",
    type: "Headline",
    impressions: 2,
    status: "Enabled",
  },
  {
    assets: "Facebook ad",
    adGroupName: "Search Ad Group",
    type: "Headline",
    impressions: 0,
    status: "Enabled",
  },
  {
    assets: "Facebook ad",
    adGroupName: "Search Ad Group",
    type: "Headline",
    impressions: 1,
    status: "Enabled",
  },
  {
    assets: "Facebook ad",
    adGroupName: "Search Ad Group",
    type: "Headline",
    impressions: 0,
    status: "Enabled",
  },
];

const targetRowData = [
  {
    location: "US",
    status: "Enabled",
    spend: 1,
    clicks: 0,
    conversions: 2,
    impressions: 0,
  },
  {
    location: "US",
    status: "Pending",
    spend: 2,
    clicks: 0,
    conversions: 1,
    impressions: 1,
  },
  {
    location: "US",
    status: "Disabled",
    spend: 12,
    clicks: "Esther 0",
    conversions: 0,
    impressions: 2,
  },
];

const objectives = [
  {
    title: "Target Interests",
    description: "Reach people who don't know you yet",
  },
];

const AdResults = () => {
  const searchParams = useSearchParams();
  const ad_id = searchParams.get("id");
  const selectedBrand = useAppSelector((state) => state.selectedBrand.brand);
  const [selectedTarget, setSelectedTarget] = useState<any>(
    objectives[0].title
  );
  const [targetDialogOpen, setTargetDialogOpen] = useState(false);

  const {
    data: adDetails,
    isLoading: isDetailsLoading,
    isError,
    error,
  } = useAdDetails(
    ad_id as string,
    Number(selectedBrand?.id),
    !!ad_id && !!selectedBrand?.id // Enable fetching only if IDs are available
  );
  console.log('adDetails from result', adDetails)
  const {
    data: currency,
    isLoading: currencyLoading,
    isError: currencyError,
  } = useCurrency(Number(selectedBrand?.id), !!selectedBrand?.id);
  const adImageUrl =
    adDetails?.creative?.image_url || "/assets/post background.png";
  return (
    <>
    <Head>
          <title>AI</title>
          <meta property="og:title" content="Majai" />
          <meta
            property="og:description"
            content="AI marketing"
          />
           <meta
            property="og:image:secure"
            content="https://app.majai.se/assets/logo.webp"
          />
          <meta property="og:image" content="https://app.majai.se/assets/logo.webp"/>
          <meta property="og:url" content="https://majai.se" />
          <meta property="og:type" content="website" />
        </Head>
 
    <div>
      <EditTargetModal
        open={targetDialogOpen}
        onOpenChange={setTargetDialogOpen}
        selectedTarget={selectedTarget}
        objectives={objectives}
        setSelectedTarget={setSelectedTarget}
        adDetails={adDetails}
        ad_id={ad_id}
      />
      {isDetailsLoading || currencyLoading ? (
        <>
          <StartupLoader onFinish={() => { }} />
        </>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <p className="text-[20px] font-semibold ">Results</p>
            <Button className="bg-secondary text-primary-color">
              <Play fill="#fff" className="mr-2 rounded-lg" />
              Watch Video
            </Button>
          </div>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <Card className="bg-primary-color/50">
                <CustomStepper />
              </Card>
            </Grid>

            <div className="w-full flex gap-3 lg:flex-row flex-col flex-col-reverse ">
              <Grid size={{ xs: 12, lg: 8 }}>
                <CustomChart />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Card className="bg-primary-color/50 rounded-sm p-1 ">
                  Charts
                </Card>
              </Grid>
            </div>

            {/* table */}
            <Grid size={{ xs: 12 }}>
              <Card className="bg-primary-color/60 rounded-[16px] p-5">
                <div className="flex flex-col sm:gap-[0px] gap-[10px] sm:flex-row sm:justify-between sm:items-center mb-4">
                  <div className="w-full q sm:w-[300px]">
                    <CustomSelectField
                      placeholder={"Choose any option"}
                      css={
                        "bg-[#ffff] text-[#6B7280] w-full rounded-[22px] p-6"
                      }
                      options={[
                        { value: "apple", label: "Apple" },
                        { value: "banana", label: "Banana" },
                        { value: "blueberry", label: "Blueberry" },
                        { value: "grapes", label: "Grapes" },
                        { value: "pineapple", label: "Pineapple" },
                      ]}
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button className="bg-transparent text-primary border border-primary">
                      Chrome
                    </Button>
                    <Button className="bg-primary text-primary-color ml-2">
                      Landing Page
                    </Button>
                  </div>
                </div>
                <CustomTable data={campaignRowData} columns={campaignColumns} />
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <p className="text-[24px] mb-3 text-primary-color font-semibold ">
                Asset Performance
              </p>
              <CustomTable data={assetRowData} columns={assetColumns} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <p className="text-[24px] mb-3 text-primary-color font-semibold ">
                Target Locations
              </p>
              <CustomTable data={targetRowData} columns={targetColumns} />
            </Grid>

            {/* settings */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card className="bg-primary-color/80 rounded-md p-5">
                <div>
                  {/* heading */}
                  <div className="flex justify-between items-center ">
                    <p className="text-[22px] text-black font-semibold">
                      Settings
                    </p>

                    <div className="flex items-center gap-2">
                      <Pencil
                        size={20}
                        className="cursor-pointer text-end"
                        onClick={() => setTargetDialogOpen(true)}
                      />
                      <Badge className="text-[#155E03] py-2 px-6 rounded-[15px] border border-[#155E03] bg-[#D2FFCE] ">
                        Approved
                      </Badge>
                    </div>

                  </div>

                  <div className="mt-2">
                    <p className="text-[16px] text-[#959BA5]">
                      Ad group settings
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between grid grid-cols-2 items-center mt-2">
                      <div className="flex items-center ">
                        <Goal className="text-primary" />
                        <p className="ml-2">Targeting</p>
                      </div>
                      <div className="flex items-center  text-[#9E9D9D]">
                        <p className="mr-2">New User</p>
                        {/* <Pencil
                          size={16}
                          className="cursor-pointer"
                          onClick={() => setTargetDialogOpen(true)}
                        /> */}
                      </div>
                    </div>
                    <div className="flex justify-between grid grid-cols-2 items-center mt-2">
                      <div className="flex items-center ">
                        <Book className="text-primary" />
                        <p className="ml-2">Content</p>
                      </div>
                      <div className="flex items-center  text-[#9E9D9D]">
                        <p className="mr-2">Ad text</p>
                        {/* <Pencil size={16} className="cursor-pointer" /> */}
                      </div>
                    </div>
                    <div className="flex justify-between grid grid-cols-2 items-center mt-2">
                      <div className="flex items-center ">
                        <TrendingUp className="text-primary" />
                        <p className="ml-2">Destination</p>
                      </div>
                      <div className="flex items-center  text-[#9E9D9D]">
                        <p className="mr-2">https://</p>
                        {/* <Pencil size={16} className="cursor-pointer" /> */}
                      </div>
                    </div>

                    <Separator orientation="horizontal" className="my-4" />
                    <div className="mt-2">
                      <p className="text-[16px] text-[#959BA5]">
                        Campaign Settings
                      </p>
                    </div>
                    <div className="flex justify-between grid grid-cols-2 items-center mt-2">
                      <div className="flex items-center ">
                        <Wallet className="text-primary" />
                        <p className="ml-2">Budget</p>
                      </div>
                      <div className="flex items-center  text-[#9E9D9D]">
                        <p className="mr-2">
                          {" "}
                          {currency?.currency}{" "}
                          {(adDetails?.adset?.daily_budget || 1) / 100} /day
                        </p>
                        {/* <Pencil size={16} className="cursor-pointer" /> */}
                      </div>
                    </div>
                    <div className="flex justify-between grid grid-cols-2 items-center mt-2">
                      <div className="flex items-center ">
                        <MousePointer className="text-primary" />
                        <p className="ml-2">Location</p>
                      </div>
                      <div className="flex items-center  text-[#9E9D9D]">
                        <p className="mr-2">
                          {adDetails?.adset?.targeting?.geo_locations?.countries?.join(
                            ", "
                          )}
                        </p>
                        {/* <Pencil size={16} className="cursor-pointer" /> */}
                      </div>
                    </div>
                    <div className="flex justify-between grid grid-cols-2 items-center mt-2">
                      <div className="flex items-center ">
                        <FolderGit2 className="text-primary" />
                        <p className="ml-2">Assets</p>
                      </div>
                      <div className="flex items-center  text-[#9E9D9D]">
                        <p className="mr-2">Assets</p>
                        {/* <Pencil size={16} className="cursor-pointer" /> */}
                      </div>
                    </div>
                    <div className="flex justify-between grid grid-cols-2 items-center mt-2">
                      <div className="flex items-center ">
                        <Orbit className="text-primary" />
                        <p className="ml-2">Platform</p>
                      </div>
                      <div className="flex items-center  text-[#9E9D9D]">
                        <p className="mr-2">Facebook</p>
                        {/* <Pencil size={16} className="cursor-pointer" /> */}
                      </div>
                    </div>
                    <div className="flex justify-between grid grid-cols-2 items-center mt-2">
                      <div className="flex items-center ">
                        <FolderPen className="text-primary" />
                        <p className="ml-2">Name</p>
                      </div>
                      <div className="flex items-center  text-[#9E9D9D]">
                        <p className="mr-2">{adDetails?.campaign?.name}</p>
                        {/* <Pencil size={16} className="cursor-pointer" /> */}
                      </div>
                    </div>
                    <div className="flex justify-between grid grid-cols-2 items-center mt-2">
                      <div className="flex items-center ">
                        <CalendarFold className="text-primary" />
                        <p className="ml-2">Start date</p>
                      </div>
                      <div className="flex items-center text-[#9E9D9D] ">
                        <p className="mr-2">24-10-24</p>
                        {/* <Pencil size={16} className="cursor-pointer" /> */}
                      </div>
                    </div>
                    <div className="flex justify-between grid grid-cols-2 items-center mt-2">
                      <div className="flex items-center ">
                        <Goal className="text-primary" />
                        <p className="ml-2">Goal</p>
                      </div>
                      <div className="flex items-center  text-[#9E9D9D]">
                        <p className="mr-2">
                          {adDetails?.adset?.optimization_goal || ""}
                        </p>
                        {/* <Pencil size={16} className="cursor-pointer" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Grid>

            <Grid
              size={{ xs: 12, md: 4 }}
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Card className="bg-primary/80 w-full rounded-[16px] p-8">
                <div>
                  <p className="text-black text-[20px] font-semibold">
                    Creative
                  </p>
                </div>
                <div>
                  <div className="mt-2 text-center">
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
                              <p className="text-[10px] text-[#9E9D9D]">
                                1 min
                              </p>
                            </div>
                          </div>
                          <div>
                            <MoreVertOutlinedIcon sx={{ fontSize: 14 }} />
                          </div>
                        </div>
                        {/* post status */}
                        <div>
                          <p className="text-black/80 text-[12px] text-left m-1">
                            The Joy of Marketing, The Joy of Marketing, The Joy
                            of Marketing, The Joy of Marketing,{" "}
                          </p>
                        </div>
                        <div>
                          <img width="100%" src={adImageUrl} />
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
                    {/*  */}
                    <div className="mt-2 text-center">
                      <Badge
                        className={`rounded-[12px] p-2 border border-black/60 text-black/60 bg-transparent `}
                      >
                        Ad Combinations
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </Grid>

            <Grid
              size={{ xs: 12 }}
              sx={{ display: "flex", justifyContent: "end" }}
            >
              <Button className="bg-transparent text-secondary border border-secondary">
                New Ad Group
              </Button>
              <Button className="bg-secondary text-primary-color ml-2">
                Search Ad Group
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
    </>
  );
};

export default AdResults;
