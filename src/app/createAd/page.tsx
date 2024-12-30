"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import AdvertisementCard from "./_components/advertismentCards";
import { Badge } from "@/components/ui/badge";
import FolderCard from "./_components/folderCard";
import { campaigns } from "@/lib/constant";
import AdCard from "@/components/adCard";
import SelectFolder from "./_components/selectFolder";
import AdvertiseCarousel from "@/components/advertisingCarousel";
import NewFolder from "./_components/test";
import CustomSelectField from "@/components/customSelectField";
import { useBrands } from "@/hooks/useBrands";
import { useAllAds } from "@/hooks/facebook/useAllAds";
import { setBrands } from "@/store/slices/brandSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { selectBrand } from "@/store/slices/selectedBrandSlice";
import { useFetchAdImages } from "@/hooks/facebook/useCampaign";
import StartupLoader from "@/components/startupLoader";
import { usePlatforms } from "@/hooks/usePlatforms";
import Head from "next/head";

const ads = [
  {
    title: "Google Search",
    value: "googlesearch",
    img: "/assets/googleIcon.png",
  },
  {
    title: "Facebook",
    value: "facebook",
    img: "/assets/facebook1.png",
  },
  {
    title: "TikTok",
    value: "tiktok",
    img: "/assets/tiktokIcon.png",
  },
  {
    title: "LinkedIn",
    value: "linkedin",
    img: "/assets/linkedinIcon.png",
  },
  {
    title: "Youtube",
    value: "youtube",
    img: "/assets/youtubeIcon.png",
  },
  {
    title: "Whatsapp",
    value: "whatsapp",
    img: "/assets/whatsappIcon.png",
  },
  {
    title: "Snapchat",
    value: "snapchat",
    img: "/assets/snapchatIcon.png",
  },
  {
    title: "Instagram",
    value: "instagram",
    img: "/assets/instagram1.png",
  },
  {
    title: "Meta",
    value: "meta",
    img: "/assets/meta.png",
  },
  {
    title: "TikTok",
    value: "tiktok",
    img: "/assets/tiktokIcon.png",
  },
  {
    title: "LinkedIn",
    value: "linkedin",
    img: "/assets/linkedinIcon.png",
  },
  {
    title: "Youtube",
    value: "youtube",
    img: "/assets/youtubeIcon.png",
  },
  {
    title: "Whatsapp",
    value: "whatsapp",
    img: "/assets/whatsappIcon.png",
  },
  {
    title: "Snapchat",
    value: "snapchat",
    img: "/assets/snapchatIcon.png",
  },
  {
    title: "Youtube",
    value: "youtube",
    img: "/assets/youtubeIcon.png",
  },
];

const folders = [
  {
    title: "Folder 1",
    img: "/assets/googlecampaign.png",
    info: "Edited 8 min ago",
  },
  {
    title: "Folder 2",
    img: "/assets/googlecampaign.png",
    info: "Edited 8 min ago",
  },
  {
    title: "Folder 3",
    img: "/assets/googlecampaign.png",
    info: "Edited 10 min ago",
  },
];

const CreateAd = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const selectedBrand = useAppSelector((state) => state.selectedBrand.brand);
  const brands = useAppSelector((state) => state.brand.brands);
  const [fetchBrands, setFetchBrands] = useState(false);
  const dispatch = useAppDispatch();

  const [adsData, setAdsData] = useState<any[]>([]);
  const {
    data: brandsData,
    isLoading: brandsLoading,
    isError: isBrandError,
    error: brandError,
  } = useBrands(fetchBrands);
  console.log(brandsData, "brandsDatabrandsDatabrandsData");

  const {
    data: platforms,
    isLoading: isLoadingPlatforms,
    isError,
    error,
    refetch,
  } = usePlatforms(selectedBrand?.id ?? 0);
  // Fetch ads using useAllAds
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useAllAds(selectedBrand?.id ?? 0); // Pass the brand_id

  // Hook to fetch ad images
  const { mutate: fetchAdImages } = useFetchAdImages({
    onSuccess: (imagesData) => {
      // Map fetched images to the corresponding ads using the hash
      const enrichedAds = adsData.map((ad) => {
        if (ad.creative?.object_story_spec?.link_data?.child_attachments) {
          ad.creative.object_story_spec.link_data.child_attachments =
            ad.creative.object_story_spec.link_data.child_attachments.map(
              (attachment: any) => {
                const matchedImage = imagesData.find(
                  (img: any) => img.hash === attachment.image_hash
                );
                return {
                  ...attachment,
                  image_url: matchedImage
                    ? matchedImage.url_128
                    : attachment.image_url,
                };
              }
            );
        }
        return ad;
      });
      setAdsData(enrichedAds);
    },
  });

  // Flatten all pages of ads and save to local state
  useEffect(() => {
    if (data) {
      const allAds = data.pages.flatMap((page:any) => page.data) || [];
      setAdsData(allAds);

      // Extract image hashes for fetching ad images
      const hashes = allAds
        .filter(
          (ad) => ad.creative?.object_story_spec?.link_data?.child_attachments
        )
        .flatMap((ad) =>
          ad.creative.object_story_spec.link_data.child_attachments.map(
            (attachment: any) => attachment.image_hash
          )
        );

      // Fetch ad images if there are hashes available
      if (hashes.length > 0) {
        fetchAdImages({ brand_id: selectedBrand?.id ?? 0, hashes: hashes });
      }
    }
  }, [data, fetchAdImages]);

  useEffect(() => {
    if (brandsData) {
      dispatch(setBrands(brandsData));
    }
  }, [brandsData]);

  useEffect(() => {
    if (brands && brands?.data?.length > 0 && !selectedBrand) {
      dispatch(selectBrand(brands.data[0]));
    }
  }, [brands]);

  useEffect(() => {
    if (!fetchBrands && !selectedBrand && brands?.data?.length === 0) {
      setFetchBrands(true);
    }
  }, [selectedBrand]);

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
      {isLoadingPlatforms || isLoading ? (
        <>
          <StartupLoader onFinish={() => {}} />
        </>
      ) : (
        <>
          <p className="text-2xl font-bold text-secondary-foreground">
            Advertise
          </p>

          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid size={{ xs: 12 }}>
              <AdvertiseCarousel />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{ mt: 4, display: "flex", justifyContent: "end" }}
          >
            <Grid size={{ xs: 4, md: 2 }} sx={{}}>
              <CustomSelectField
                placeholder={"Ad Goal"}
                label={"Ad Goal"}
                labelCss="text-[13px] mb-1 text--[#6A6A6A]"
                css={"text-[#6B7280] border-[#6A6A6A] "}
                options={[
                  { value: "all", label: "All" },
                  { value: "banana", label: "Banana" },
                  { value: "blueberry", label: "Blueberry" },
                  { value: "grapes", label: "Grapes" },
                  { value: "pineapple", label: "Pineapple" },
                ]}
              />
            </Grid>
            <Grid size={{ xs: 4, md: 2 }} sx={{}}>
              <CustomSelectField
                placeholder={"Ad Format"}
                label={"Ad Format"}
                labelCss="text-[13px] mb-1 text--[#6A6A6A]"
                css={"text-[#6B7280] border-[#6A6A6A] "}
                options={[
                  { value: "all", label: "All" },
                  { value: "banana", label: "Banana" },
                  { value: "blueberry", label: "Blueberry" },
                  { value: "grapes", label: "Grapes" },
                  { value: "pineapple", label: "Pineapple" },
                ]}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 4 }}>
            {platforms?.map((items: any) => (
              <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                <AdvertisementCard adsInfo={items} />
              </Grid>
            ))}
          </Grid>

          {/* <NewFolder/> */}
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid size={{ xs: 12 }}>
              <p className="text-2xl font-bold text-secondary-foreground">
                Folders
              </p>
            </Grid>
            {folders.map((folder, index) => (
              <Grid size={{ xs: 12, md: 4, lg: 3 }} key={index}>
                <FolderCard folder={folder} />
              </Grid>
            ))}

            {/* Add New Folder card */}
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FolderCard isNew />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid
              size={{ xs: 12 }}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <p className="text-2xl font-bold text-secondary-foreground">
                All Ad Campaign
              </p>
              <Badge
                onClick={() => setIsDialogOpen(true)}
                className="bg-primary border border-primary cursor-pointer hover:bg-blue-700 text-primary-color"
              >
                Add to Folder
              </Badge>
            </Grid>
            {adsData?.map((ad: any, index: number) => (
              <Grid key={index} size={{ xs: 12, md: 4, lg: 3 }}>
                <AdCard adData={ad} />
              </Grid>
            ))}
          </Grid>
          {/* Select Folder Modal */}
          <SelectFolder open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </>
      )}
    </div>
    </>
  );
};

export default CreateAd;
