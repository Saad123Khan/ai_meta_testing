import { useQuery } from "@tanstack/react-query";
import apis from "@/services";
import { ApiResponse, PaginatedResponse } from "@/types/apiResponse";

export const useCountry = () => {
  return useQuery({
    queryKey: ["CountryList"],
    queryFn: async (): Promise<PaginatedResponse<any>> => {
      const response = await apis.getCountryLists();
      if (!response.data.success) {
        throw new Error("Failed to fetch brands.");
      }
      return response.data.data;
    },
    enabled:true, // Allow toggling the query
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
};
