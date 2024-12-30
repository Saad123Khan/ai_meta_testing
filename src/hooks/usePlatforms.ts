import { useQuery } from "@tanstack/react-query";
import apis from "@/services";
import { ApiResponse } from "@/types/apiResponse";
import { PlatformData } from "@/types/platform";

export const usePlatforms = (brandId:number = 0) => {
  return  useQuery({
    queryKey: ["platformConnections", brandId],
    queryFn: async (): Promise<ApiResponse<PlatformData[]>> => {
      const response = await apis.getPlatformConnections(brandId); 
      return response.data; 
    },
    enabled: brandId > 0,
    select: (response) => {
      // Handle transformation if needed
      if (!response.success) {
        throw new Error("Failed to fetch platform connections");
      }
      return response.data;
    },
  });
};
