"use client";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CustomSelectField from "@/components/customSelectField";
import CustomTable from "@/components/customTable";
import { columnsnew } from "./columns/columns";
import WebCard from "./_components/webCard";
import CustomAdvertisementCard from "@/components/customAdvertisementCard";
import CustomInputField from "@/components/customInputField";
import CustomDateRangePicker from "@/components/customDateRangePicker";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Campaign, useAdsByCampaigns, useCampaign, useFetchAdImages } from "@/hooks/facebook/useCampaign";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useBrands } from "@/hooks/useBrands";
import { setBrands } from "@/store/slices/brandSlice";
import { selectBrand } from "@/store/slices/selectedBrandSlice";
import { campaigns } from "@/lib/constant";
import { usePlatforms } from "@/hooks/usePlatforms";
import Head from "next/head";

const platform = [
  {
    name: "Google Ads",
    icon: "/assets/Ellipse 1698.png",
    spend: 25,
    total: 100,
  },
  {
    name: "Facebook Ads",
    icon: "/assets/Ellipse 1699.png",
    spend: 55,
    total: 100,
  },
  {
    name: "Instagram Ads",
    icon: "/assets/Ellipse 1697.png",
    spend: 85,
    total: 100,
  },
];

const websiteCards = [
  {
    name: "Google Ads",
    label: 'Users',
    icon: "/assets/growth.png",
    spend: 25,
    total: 100,
  },
  {
    name: "Facebook Ads",
    label: 'Revenue',
    icon: "/assets/growth.png",
    spend: 15,
    total: 100,
  },
  {
    name: "Instagram Ads",
    label: 'Conversion Rate',
    icon: "/assets/growth.png",
    spend: 85,
    total: 100,
  },
  {
    name: "Facebook Ads",
    label: 'Session',
    icon: "/assets/growth.png",
    spend: 45,
    total: 100,
  },
];

const Home = () => {

  const dispatch = useAppDispatch();
  const [statusValue, setStatusValue] = useState<any>([]);
  const [campaignValue, setCampaignValue] = useState<Campaign[]>([]);
  const brands = useAppSelector((state) => state.brand.brands);
  const selectedBrand = useAppSelector((state) => state.selectedBrand.brand);
  const [fetchBrands, setFetchBrands] = useState(false);
  const { data: facebookCampaigns, isLoading: facebookCampaignsLoading } = useCampaign(!!selectedBrand, selectedBrand?.id ?? 0);
  const { data: brandsData, isLoading: brandsLoading, isError: isBrandError, error: brandError } = useBrands(fetchBrands);
  const { data: adsData, isLoading: adsLoading } = useAdsByCampaigns(
    campaignValue.length > 0,
    selectedBrand?.id ?? 0,
    campaignValue.map((campaign => campaign.id))
  );
  const [adsWithImages, setAdsWithImages] = useState<any[]>([]);
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = usePlatforms(selectedBrand?.id ?? 0)



  const fetchAdImages = useFetchAdImages({
    onSuccess: (images) => {
      if (images && adsData) {
        const updatedAds = Object.values(adsData || {}).flat().map((ad: any) => {
          if (ad.creative?.image_url) {
            return { ...ad, imageUrl: ad.creative?.image_url };
          }
          else if (ad.creative?.object_story_spec?.video_data?.image_url) {
            return { ...ad, imageUrl: ad.creative?.object_story_spec?.video_data?.image_url };
          }
          const imageHash = ad.creative?.object_story_spec?.link_data?.image_hash;
          const image = images.find((img: any) => img.hash === imageHash);
          if (ad && ad?.id) {
            return { ...ad, imageUrl: image?.url_128 };
          }
          return null
        });
        setAdsWithImages(updatedAds.filter(x => !!x));
      }
    },
    onError: (error) => {
      console.error("Error fetching ad images:", error);
    },
  });

  const columns = [
    {
      accessorKey: "id",
      header: "Ad ID",
    },
    {
      accessorKey: "name",
      header: "Ad Name",
    },
    {
      accessorKey: "imageUrl",
      header: "Thumbnail",
      cell: ({ row }: any) => {
        const imageUrl = row.original.imageUrl;
        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Ad Thumbnail"
            className="w-20 h-20 object-cover"
            style={{ display: "block", margin: "0 auto" }}
          />
        ) : (
          <span>Loading...</span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => (
        <Badge
          className={`${row.original.status === "PAUSED"
            ? "bg-[#FCE7F3] text-[#9D174D]"
            : row.original.status === "ACTIVE"
              ? "bg-[#D1FAE5] text-[#1E40AF]"
              : "bg-[#F3F4F6] text-[#1F2937]"
            }`}
        >
          {row.getValue("status")}
        </Badge>
      ),
    },
    {
      accessorKey: "adset.name",
      header: "Ad Set Name",
    },
    {
      accessorKey: "adset.daily_budget",
      header: "Daily Budget",
    },
    {
      accessorKey: "adset.optimization_goal",
      header: "Optimization Goal",
    },
    {
      accessorKey: "adset.bid_amount",
      header: "Bid Amount",
    },
    {
      accessorKey: "creative.name",
      header: "Creative Name",
    },
  ];


  console.log("statusValue", statusValue);
  const handleRemoveItem = (id: number) => {
    setStatusValue((prev: any) => prev.filter((_: any, index: any) => index !== id));
  };

  const makeChips = (value: any) => {
    setStatusValue((prev: any) => [...prev, value]);
  };

  const handleRemoveCampaign = (id: string) => {
    setCampaignValue((prev) => [...prev.filter(x => x.id != id)])
  }

  const addCampaignInSelection = (campaignId: string) => {
    const campaign = facebookCampaigns?.data.find((c) => c.id === campaignId);
    if (campaign && !campaignValue.some((c) => c.id === campaignId)) {
      setCampaignValue([...campaignValue, campaign]);
    }
  };

  useEffect(() => {
    if (brandsData) {
      dispatch(setBrands(brandsData));
    }
  }, [brandsData])

  useEffect(() => {
    if (brands && brands.data.length > 0 && !selectedBrand) {
      dispatch(selectBrand(brands.data[0]))
    }
  }, [brands])

  useEffect(() => {
    if (!fetchBrands && !selectedBrand && brands.data.length === 0) {
      setFetchBrands(true);
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (adsData) {
      const updatedAds = Object.values(adsData || {}).flat().map((ad: any) => {
        if (ad.creative?.image_url) {
          return { ...ad, imageUrl: ad.creative?.image_url };
        }
        else if (ad.creative?.object_story_spec?.video_data?.image_url) {
          return { ...ad, imageUrl: ad.creative?.object_story_spec?.video_data?.image_url };
        }
        if (ad && ad?.id) {
          return ad
        }
        return null;
      });
      setAdsWithImages(updatedAds.filter(x => !!x));



    }
  }, [adsData]);

  useEffect(() => {
    if (adsWithImages) {
      const imageHashes = Object.values(adsWithImages || {})
        .flat()
        .filter(ad => !ad?.imageUrl)
        .map((ad: any) => ad.creative?.object_story_spec?.link_data?.image_hash)
        .filter((hash: string) => hash);
      if (imageHashes.length > 0 && selectedBrand) {
        fetchAdImages.mutate({ brand_id: selectedBrand.id, hashes: imageHashes });
      }
    }

  }, [adsWithImages])

  const ads = Object.values(adsData || {}).flat();

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
      <p className="text-2xl font-bold text-secondary-foreground">Dashboard</p>
      <Tabs defaultValue="Advertising">
        <TabsList className="flex justify-start p-0 mb-8 mt-2 bg-transparent ">
          <TabsTrigger
            value="Advertising"
            className="relative text-[16px] leading-none !shadow-none data-[state=active]:font-bold data-[state=active]:text-[#0F51A7] data-[state=active]:bg-transparent data-[state=active]:underline  data-[state=active]:underline-offset-8  data-[state=inactive]:text-[#636060]"
          >
            Advertising
          </TabsTrigger>
          <TabsTrigger
            value="Website"
            className="relative text-[16px] leading-none !shadow-none data-[state=active]:font-bold data-[state=active]:text-[#0F51A7] data-[state=active]:bg-transparent data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=inactive]:text-[#636060]"
          >
            Website
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Advertising">
          <Grid container spacing={2}>
            {/* {platform.map((item: any) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <CustomAdvertisementCard cardData={item} />
              </Grid>
            ))} */}

            {data?.map((platform) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <CustomAdvertisementCard cardData={platform} />
              </Grid>

            ))}


          </Grid>
        </TabsContent>
        <TabsContent value="Website">
          <Grid container spacing={2}>
            {websiteCards.map((item: any) => (
              <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <WebCard cardData={item} />
              </Grid>
            ))}
          </Grid>
        </TabsContent>
      </Tabs>
      {/* </div> */}
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <p className="text-[22px] text-secondary-foreground font-bold">
            Facebook Campaigns
          </p>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent className="p-4">
              {/* <div className="flex justify-between">
                <div className="w-[300px]">
                  <CustomSelectField
                    onValueChange={(value: any) => makeChips(value)}
                    placeholder={"Choose any option"}
                    options={[
                      { value: "All", label: "All" },
                      { value: "Enabled", label: "Enabled" },
                      { value: "Paused", label: "Paused" },
                      {
                        value: "All Ads Campaigns",
                        label: "All Ads Campaigns",
                      },
                      { value: "Disabled", label: "Disabled" },
                    ]}
                    css={"bg-[#ffff] text-[#6B7280] rounded-[22px] p-4"}
                  />
                </div>
                <div className="flex">
                  {statusValue?.map((items: any, key: any) => (
                    <Badge
                      key={key}
                      className="m-1 rounded-[18px] pt-2 pb-2 pr-4 pl-4 text-[14px] font-normal bg-secondary text-primary-color flex justify-between items-center"
                    >
                      <span>{items}</span>
                      <span
                        onClick={() => handleRemoveItem(key)}
                        className="ml-2 cursor-pointer text-primary-color hover:text-red-500"
                      >
                        <X size={14} />
                      </span>
                    </Badge>
                  ))}
                 <Button className="bg-transparent rounded-[22px] px-6 text-secondary border border-secondary">
                    Disabled
                  </Button>
                  <Button className="bg-secondary rounded-[22px] px-6 text-primary-color ml-2">
                    Enabled
                  </Button> 
                </div>
              </div> */}

              <div className="mt-3 flex justify-between">
                <div className="w-[400px] ">
                  <CustomSelectField
                    onValueChange={(value: any) => addCampaignInSelection(value)}
                    placeholder={"Choose any option"}
                    options={facebookCampaigns?.data?.map((d => ({ value: d.id, label: d.name })))}
                    css={"bg-[#ffff] text-[#6B7280] rounded-[22px] p-4"}
                  />
                </div>
                <div className="flex">
                  {campaignValue?.map((item: Campaign, key: any) => (
                    <Badge
                      key={item.id}
                      className="m-1 rounded-[18px] pt-2 pb-2 pr-4 pl-4 text-[14px] font-normal bg-secondary text-primary-color flex justify-between items-center"
                    >
                      <span>{item.name}</span>
                      <span
                        onClick={() => handleRemoveCampaign(item.id)}
                        className="ml-2 cursor-pointer text-primary-color hover:text-red-500"
                      >
                        <X size={14} />
                      </span>
                    </Badge>
                  ))}
                </div>
                <div>
                  {/* <CustomDateRangePicker /> */}
                </div>
              </div>

              <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid size={{ xs: 12 }}>
                  <CustomTable data={adsWithImages} columns={columns} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
    </>
  );
};

export default Home;
