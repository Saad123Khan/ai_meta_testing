"use client";

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import PlatformAdsCard from "./_components/platformAdsCard";
import apis from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { swalConfirmPopUp, swalPopUp } from "@/lib/helper";
import { PlatformData } from "@/types/platform";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setBrands } from "@/store/slices/brandSlice";
import { useBrands } from "@/hooks/useBrands";
import { usePlatforms } from "@/hooks/usePlatforms";
import { selectBrand } from "@/store/slices/selectedBrandSlice";
import StartupLoader from "@/components/startupLoader";
import { ApiResponse } from "@/types/apiResponse";
import { Brand } from "@/types/brand";
import Head from "next/head";

const ConnectPlatforms = () => {
  const [platforms, setPlatforms] = useState<PlatformData[]>([]);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const brands = useAppSelector((state) => state.brand.brands);
  const selectedBrand = useAppSelector((state) => state.selectedBrand.brand);
  const [fetchBrands, setFetchBrands] = useState(false);

  const {
    data: brandsData,
    isLoading: brandsLoading,
    isError: isBrandError,
    error: brandError,
  }:any = useBrands(fetchBrands);

  console.log("brandsData", selectedBrand);
  // Fetch platforms and their connection statuses
  const { data, isLoading, isError, error, refetch } :any= usePlatforms(
    selectedBrand?.id ?? 0
  );

  const {
    data: getPageInfo,
    error: errors,
  } :any= useQuery({
    queryKey: ["getPageInfo"],
    queryFn: async (): Promise<ApiResponse<PlatformData[]>> => {
      const response = await apis.getPageInfo(selectedBrand?.id ?? 0);
      return response.data;
    },
  });

  console.log('getPageInfo', getPageInfo)

  useEffect(() => {
    if (data) {
      setPlatforms(data); // Update state with the transformed data
    }
  }, [data]);

  useEffect(() => {
    if (brandsData) {
      dispatch(setBrands(brandsData));
    }
  }, [brandsData]);

  useEffect(() => {
    if (brands && brands.data.length > 0 && !selectedBrand) {
      dispatch(selectBrand(brands.data[0]));
    }
  }, [brands]);

  useEffect(() => {
    if (!fetchBrands && !selectedBrand && brands.data.length === 0) {
      setFetchBrands(true);
    }
  }, [selectedBrand]);

  // Mutation for handling platform disconnection
  const { mutate: disconnectPlatform, isPending: isDisconnecting }:any =
    useMutation({
      mutationFn: (connectionId: number) =>
        apis.disconnectPlatform(connectionId),
      onSuccess: () => {
        swalPopUp(
          "Disconnected",
          "Platform disconnected successfully",
          "success"
        );
        refetch(); // Refresh platform data after disconnection
      },
      onError: () => {
        swalPopUp("Error", "Failed to disconnect platform", "error");
      },
    });

  // Handle disconnect logic
  const handleDisconnect = (connectionId: number | null) => {
    if (!connectionId) {
      swalPopUp("Error", "No connection to disconnect", "error");
      return;
    }

    swalConfirmPopUp(
      "Are you sure?",
      "Do you really want to disconnect this platform? This action cannot be undone.",
      "warning",
      {
        showCancelButton: true,
        confirmButtonText: "Yes, disconnect",
        cancelButtonText: "Cancel",
        onConfirm: () => disconnectPlatform(connectionId), // Call disconnect on confirm
        onCancel: () =>
          swalPopUp("Cancelled", "Your platform remains connected", "info"), // Optional cancel feedback
      }
    );
  };

  const handleConnect = async (platformKey: string) => {
    if (!selectedBrand) {
      swalPopUp("Error", "Please setup brand first", "error");
    }

    try {
      const response = await apis.connectPlatform({
        brand_id: selectedBrand?.id ?? 0,
        platform: platformKey,
      });
      const redirectUri = response?.data?.data?.redirect_uri;
      if (redirectUri) {
        window.location.href = redirectUri; // Redirect the user to the OAuth URL
      } else {
        swalPopUp("Error", "Failed to initiate connection", "error");
      }
    } catch (error: any) {
      swalPopUp("Error", error.message || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    // Handle query parameters for success/failure messages
    const success = searchParams.get("success");
    const platform = searchParams.get("platform");
    const message = searchParams.get("message");

    if (success && platform && message) {
      swalPopUp(
        success === "true" ? "Success" : "Error",
        `${platform.toUpperCase()}: ${message}`,
        success === "true" ? "success" : "error"
      );
    }
  }, [searchParams]);

  // if (isLoading) {
  //   return <p>Loading platforms...</p>;
  // }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

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
      {isLoading ? (
        <>
          <StartupLoader onFinish={() => {}} />
        </>
      ) : (
        <>
          <p className="text-2xl font-bold text-secondary-foreground">
            Connect Platforms
          </p>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {platforms?.map((platform) => (
              <Grid key={platform.platform_id} size={{ xs: 12, md: 6, lg: 4 }}>
                <PlatformAdsCard
                  cardData={platform}
                  pageInfo={getPageInfo?.data?.data}
                  selectedBrand={selectedBrand}
                  onConnect={() => handleConnect(platform.platform_key)}
                  onDisconnect={() => handleDisconnect(platform.connection_id)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
    </>
  );
};

export default ConnectPlatforms;
