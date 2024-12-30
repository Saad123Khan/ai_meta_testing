import { useQuery } from "@tanstack/react-query";
import apis from "@/services";
import { Brand } from "@/types/brand";
import { ApiResponse, PaginatedResponse } from "@/types/apiResponse";

export const useBrands = (enabled: boolean = true, data: object = {page:1}) => {
  return useQuery({
    queryKey: ["BrandsList"],
    queryFn: async (): Promise<PaginatedResponse<Brand>> => {
      const response = await apis.getBrandLists(data);
      if (!response.data.success) {
        throw new Error("Failed to fetch brands.");
      }
      return response.data.data;
    },
    enabled, // Allow toggling the query
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
};
