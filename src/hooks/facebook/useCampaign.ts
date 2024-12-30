import { useMutation, useQuery } from "@tanstack/react-query";
import apis from "@/services";
import { Brand } from "@/types/brand";
import { ApiResponse, PaginatedResponse } from "@/types/apiResponse";

export interface Campaign {
  id: string,
  name: string,
  status: string,
  objective: string,
  special_ad_categories: any[],
}

export const useCampaign = (enabled: boolean = true, brand_id: number,data: object = {page:1}) => {
  return useQuery({
    queryKey: ["campaignList"],
    queryFn: async (): Promise<{data:Campaign[], paging:any}> => {
      const response = await apis.getCampaignList(brand_id,data);
      if (!response.data.success) {
        throw new Error("Failed to fetch brands.");
      }
      if(response?.data?.data?.data[0]?.campaigns) {
        return response?.data?.data?.data[0]?.campaigns;
      }
      return response.data.data;
    },
    enabled, // Allow toggling the query
  });
};


export const useAdsByCampaigns = (
  enabled: boolean = true,
  brand_id: number,
  campaign_ids: string[] = []
) => {
  return useQuery({
    queryKey: ["adsByCampaigns", campaign_ids],
    queryFn: async (): Promise<any> => {
      const response = await apis.getCampaignAds(brand_id, { campaign_ids });
      if (!response.data.success) {
        throw new Error("Failed to fetch ads.");
      }
      return response.data.data.ads; // Adjust based on your API structure
    },
    enabled: enabled && campaign_ids.length > 0, // Fetch only if campaigns are selected
  });
};



export interface FetchAdImagesParams {
  brand_id: number;
  hashes: string[];
}

export const useFetchAdImages = (options?: {
  onSuccess: (data: any) => void;
  onError?: (error: Error) => void;
  onSettled?: (data?: any, error?: Error) => void;
}) => {
  return useMutation({
    mutationFn: async (params: FetchAdImagesParams) => {
      const response = await apis.fetchAdImages(params);
      if (!response.data.success) {
        throw new Error("Failed to fetch ad images.");
      }
      console.log("🚀 ~ mutationFn: ~ response.data.data:", response.data.data.data)

      return response.data.data.data; // Adjust based on your API structure
    },
    onSuccess: (data) => options?.onSuccess(data), // Handle success
    onError: options?.onError, // Handle errors
  });
};