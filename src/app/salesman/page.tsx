"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button } from "@/components/ui/button";
import SalesManCard from "./_components/salesmanCard";
import SalesTable from "./_components/salesmanTable";
import SalesmanModal from "./_components/salesmanModal";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/apiResponse";
import apis from "@/services";
import StartupLoader from "@/components/startupLoader";

const SalesMan = () => {
  const [dialog, setDialog] = useState(false);
  
  const handleCreateAdClick = () => {
    setDialog(true);
  };

  const {
    data: salesmanInfo,
    error: errors,
    isPending,
    refetch:refetchCall,
  }: any = useQuery({
    queryKey: ["getSalesmanData"],
    queryFn: async (): Promise<ApiResponse<any>> => {
      const response = await apis.getSalesmans();
      return response.data;
    },
  });

  return (
    <div>
      <SalesmanModal refetch={refetchCall} open={dialog} onClose={() => setDialog(false)} />
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold text-secondary-foreground">Salesman</p>
        <Button
          onClick={handleCreateAdClick}
          className="bg-secondary text-primary-color "
        >
          Create Salesman
        </Button>
      </div>
      {isPending ? (
        <>
          <StartupLoader onFinish={() => {}} />
        </>
      ) : (
        <>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {salesmanInfo?.data?.data.map((items: any) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <SalesManCard cardData={items} refetch={refetchCall}/>
              </Grid>
            ))}
          </Grid>

          {/* Table */}
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <p className="text-2xl font-bold text-secondary-foreground">
              Total Salesman
            </p>
            <Grid size={{ xs: 12 }}>
              <SalesTable />
            </Grid>
          </Grid>
        </>
      )}{" "}
    </div>
  );
};

export default SalesMan;
