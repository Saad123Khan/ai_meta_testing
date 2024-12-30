import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import apis from "@/services";

export const useAllAds = (
  brand_id: number,
  initialData: object = { page: 1 },
  enabled: boolean = true
) => {
  return useInfiniteQuery({
    queryKey: ["adsList", brand_id],
    queryFn: async ({ pageParam = null }) => {
      const params = {
        brand_id,
        ...initialData,
        ...(pageParam ? { after: pageParam } : {}),
      };

      const response = await apis.fetchAllAds(params);

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch ads.");
      }

      const adsData = response.data.data.data || [];
      return {
        data: adsData.map((ad: any) => ({
          id: ad.id,
          name: ad.name,
          status: ad.status,
          preview_shareable_link: ad.preview_shareable_link,
          campaign: ad.campaign,
          adset_id: ad.adset_id,
          creative: ad.creative,
          adset: ad.adset,
        })),
        nextCursor: response.data.data.paging?.cursors?.after || null,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null, // Initial pageParam for the first query
    enabled, // Allow toggling the query
  });
};


export const useAdDetails = (ad_id: string, brand_id: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["adDetails", ad_id],
    queryFn: async () => {
      const response = await apis.facebookProxy("GET", ad_id, {
        brand_id,
        fields: "id,name,status,adset_id,preview_shareable_link,campaign{id,name},creative{id,name,status,image_url,object_story_spec},adset{id,name,daily_budget,targeting,billing_event,bid_amount,optimization_goal,effective_status,configured_status}",
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch ad details.");
      }

      return response.data.data;
    },
    enabled,
  });
};
export const useProxyAPI = (endpoint: string, params: object, queryKey: string[], enabled: boolean = true) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await apis.facebookProxy("GET", endpoint, params);

      if (!response.data || !response.data.success) {
        throw new Error(response.data.message || "Failed to fetch data.");
      }

      return response.data.data;
    },
    enabled,
  });
};

// Example usage for fetching currency
export const useCurrency = (brand_id: any, enabled: boolean = true) => {
  return useProxyAPI(
    "ad-account",
    { brand_id, fields: "currency" },
    ["currency", brand_id],
    enabled
  );
};
